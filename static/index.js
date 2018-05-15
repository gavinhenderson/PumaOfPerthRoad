$(document).ready(function() {
  let GameConsole     = require('./view/Console.js')();
  let Loop            = require('./model/Loop.js')();
  let WelcomeWindow   = require('./controller/WelcomeWindow.js')(Loop);

  //let GameSave        = store.get('GameSave');
  let GameSave = undefined // Deprecate game saves

  let Market          = require('./controller/Market.js')(Loop, GameSave);
  let Portfolio       = require('./controller/Portfolio.js')(Loop, Market, GameConsole, GameSave);
  let Calendar        = require('./controller/Calendar.js')(Loop, Portfolio, GameConsole, GameSave);
  let OddJobs         = require('./controller/OddJobs.js')(Loop, Portfolio, Calendar);
  let Broker          = require('./controller/Broker.js')(Loop, Market, Portfolio, Calendar);
  let BotShop         = require('./controller/BotShop.js')(Loop, Portfolio, Market, Calendar, GameSave);

  Market.setCalendar(Calendar);

  let backgroundSound = new Audio("sounds/office.mp3");
  backgroundSound.loop = true;
  backgroundSound.play();
  
  /*
  Loop.addRepeating(() => {
    GameConsole.message('Auto-Saver: Your game was saved')
    let saveGame = {};
    saveGame.Market     = Market.getSaveInfo();
    saveGame.Portfolio  = Portfolio.getSaveInfo();
    saveGame.BotShop    = BotShop.getSaveInfo();
    saveGame.Calendar   = Calendar.getSaveInfo();
    store.set('GameSave', saveGame);
  }, 60000);
  */
});
