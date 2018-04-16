$(document).ready(function() {
  const GameConsole     = require('./view/Console.js')();
  const Loop            = require('./model/Loop.js')();
  const Market          = require('./controller/Market.js')(Loop);
  const Portfolio       = require('./controller/Portfolio.js')(Loop, Market);
  const Broker          = require('./controller/Broker.js')(Loop, Market, Portfolio);
});
