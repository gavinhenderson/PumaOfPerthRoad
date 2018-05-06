$(document).ready(function() {
  let GameConsole     = require('./view/Console.js')();

  let Loop            = require('./model/Loop.js')();

  let Market          = require('./controller/Market.js')(Loop);
  let Portfolio       = require('./controller/Portfolio.js')(Loop, Market, GameConsole);
  let Broker          = require('./controller/Broker.js')(Loop, Market, Portfolio);
  let BotShop         = require('./controller/BotShop.js')(Loop, Portfolio, Market);
});
