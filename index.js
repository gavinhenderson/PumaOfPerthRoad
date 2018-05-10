const express = require('express');
const app     = express();
const debugPort    = 80;
const fs      = require('fs');
const https   = require('https');
const http    = require('http')

const debug = false;

//Serve src statically
app.use(express.static('public'))

//Root
app.get('/', function (req, res) {
  res.sendFile('/index.html', { root : __dirname})
})

app.get('/leaderboard', function(req, res) {
  res.sendFile('/leaderboard.html', { root : __dirname })
});


if (debug) {
  //Listen on port 80
  app.listen(debugPort, () => {
    console.log('Running on port:'+port+'!')
  });
} else {
  const opts = {
    key: fs.readFileSync('/etc/letsencrypt/live/pumaofperthroad.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/pumaofperthroad.com/fullchain.pem')
  };
  https.createServer(opts, app).listen(443, () => {
    console.log('Running on 443');
  });
  // Secondary http app
  var httpApp = express();
  var httpRouter = express.Router();
  httpApp.use('*', httpRouter);
  httpRouter.get('*', function(req, res){
      var host = req.get('Host');
      // replace the port in the host
      host = host.replace(/:\d+$/, ":"+app.get('port'));
      // determine the redirect destination
      var destination = ['https://', host, req.url].join('');
      return res.redirect(destination);
  });
  var httpServer = http.createServer(httpApp);
  httpServer.listen(80);
}


//watchify static/index.js -o public/bundle.js
