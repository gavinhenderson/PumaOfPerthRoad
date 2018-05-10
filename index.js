const express = require('express');
const app     = express();
const debugPort    = 80;
const fs      = require('fs');
const opts = {
  key: fs.readFileSync('/etc/letsencrypt/live/pumaofperthroad.com/fullchain.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/pumaofperthroad.com/privkey.pem')
};
const https   = require('https');

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
  https.createServer(opts, app).listen(443, () => {
    console.log('Running on 443');
  });
}


//watchify static/index.js -o public/bundle.js
