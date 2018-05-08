$(document).ready(function() {
  let GameConsole     = require('./view/Console.js')();
  let Loop            = require('./model/Loop.js')();

  let GameSave        = store.get('GameSave');

  let Market          = require('./controller/Market.js')(Loop, GameSave);
  let Portfolio       = require('./controller/Portfolio.js')(Loop, Market, GameConsole, GameSave);
  let Broker          = require('./controller/Broker.js')(Loop, Market, Portfolio);
  let BotShop         = require('./controller/BotShop.js')(Loop, Portfolio, Market, GameSave);
  let Calendar        = require('./controller/Calendar.js')(Loop, Portfolio, GameConsole, GameSave);

  Loop.addRepeating(() => {
    GameConsole.message('Auto-Saver: Your game was saved')
    let saveGame = {};
    saveGame.Market     = Market.getSaveInfo();
    saveGame.Portfolio  = Portfolio.getSaveInfo();
    saveGame.BotShop    = BotShop.getSaveInfo();
    saveGame.Calendar   = Calendar.getSaveInfo();
    store.set('GameSave', saveGame);
  }, 60000);
});
