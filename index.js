const express = require('express');
const app     = express();
const port    = 80;

//Serve src statically
app.use(express.static('public'))

//Root
app.get('/', function (req, res) {
  res.sendFile('/index.html', { root : __dirname})
})

//Listen on port 80
app.listen(port, () => {
  console.log('Running on port:'+port+'!')
});

//watchify static/index.js -o public/bundle.js
