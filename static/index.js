$(document).ready(function() {
  let GameConsole     = require('./view/Console.js')();
  let Loop            = require('./model/Loop.js')();

  let GameSave        = store.get('GameSave');

  let Market          = require('./controller/Market.js')(Loop, GameSave);
  let Portfolio       = require('./controller/Portfolio.js')(Loop, Market, GameConsole);
  let Broker          = require('./controller/Broker.js')(Loop, Market, Portfolio);
  let BotShop         = require('./controller/BotShop.js')(Loop, Portfolio, Market);
  let Calender        = require('./controller/Calendar.js')(Loop);

  Loop.addRepeating(() => {
    let saveGame = {};
    saveGame.Market     = Market.getSaveInfo();
    //saveGame.Portfolio  = Portfolio.getSaveInfo();
    //saveGame.BotShop    = BotShop.getSaveInfo();
    //saveGame.Calender   = Calendar.getSaveInfo();
    store.set('GameSave', saveGame);
  }, 10000);
});
