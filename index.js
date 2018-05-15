const express     = require('express');
const app         = express();
const debugPort   = 80;
const fs          = require('fs');
const https       = require('https');
const http        = require('http')
const bodyParser  = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let debug = false;

if(process.argv[2] == "--debug"){ debug = true; }

//Serve src statically
app.use(express.static('public'))

let leaderboard = [
  {
    name: "Gavin Henderson",
    id: "1606071342761788",
    score: 10
  },
  {
    name: "Adam Hirst",
    id: "615671272107140",
    score: 8
  },
  {
    name: "Connor Haining",
    id: "1815005076",
    score: 2
  },
  {
    name: "Karen Elizabeth Jefferson Petrie",
    id: "10156445677894359",
    score: 8
  }
]

//Root
app.get('/', function (req, res) {
  res.sendFile('/index.html', { root : __dirname})
})

app.get('/leaderboard', function(req, res) {
  res.sendFile('/leaderboard.html', { root : __dirname })
});

app.get('/leaderboard/scores', function(req, res) {
  console.log(leaderboard)
  res.send( leaderboard.sort((a,b)=>{return a.score<b.score}) )
})

app.post('/leaderboard/newScore', function(req, res) {
  console.log(req.body)
  let body = req.body;
  body.score = parseInt(body.score)

  for(let i=0 ; i< leaderboard.length; i++){
    let current = leaderboard[i];
    if(current.id == body.id){
      if(body.score > current.score){
        current.score = body.score;
      }
      res.send(leaderboard.sort((a,b)=>{return a.score<b.score}));
      return;
    }
  };

  leaderboard.push(body);
  res.send(leaderboard.sort((a,b)=>{return a.score<b.score}));

})

if (debug) {
  //Listen on port 80
  app.listen(debugPort, () => {
    console.log('Running on port:'+debugPort+'!')
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
      // host = host.replace(/:\d+$/, ":"+app.get('port'));
      // determine the redirect destination
      var destination = ['https://', host, req.url].join('');
      return res.redirect(destination);
  });
  var httpServer = http.createServer(httpApp);
  httpServer.listen(80);
}


//watchify static/index.js -o public/bundle.js
