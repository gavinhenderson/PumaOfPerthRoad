$(document).ready(function() {
  const GameConsole     = require('./view/Console.js')();
  const Loop            = require('./model/Loop.js')();
  const Market          = require('./controller/Market.js')(Loop);
})


/*$(document).ready(function() {
  localStorage.clear();
  //var FB          = require('./model/fb.js')();

  var GameConsole = require('./view/console.js');
  var Portfolio   = require('./model/portfolio.js');
  var GameLoop    = require('./model/gameLoop.js');
  var loop = new GameLoop();
  //var StockViewer = require('./view/stock-viewer.js');
  var GameSave    = require('./model/gameSave.js');
  //var Stock       = require('./model/Stock.js');

  var PortfolioViewer     = require('./view/portfolio-viewer.js');
  var BuySellInterface    = require('./view/buysell-interface.js');

  var gameConsole = new GameConsole();
  gameConsole.message("Welcome to Puma of Perth Road!");
  gameConsole.message("Keep an eye out on this console, you will recieve all your missions here");


  //Load variables
  //var market = new Market();

  //var gameSave = new GameSave();
  //gameSave.addItem(market);
  //gameSave.addItem(portfolio);
  //if(gameSave.doesExist()){
    //gameSave.load();
  //} else {
    //Populate stock market

  //}

  //initiate game loop that runs all functions every 100ms;
  //this should only be used to update UI

  //create views and add them to loop
  let market    = require('./controller/Market.js')(loop);
  var portfolio = new Portfolio(1000, market.getModel());


  var buysell = new BuySellInterface(market.getModel(), portfolio);
  loop.addViewItem(buysell);

  market.createViewer(buysell)



  var portfolioView = new PortfolioViewer(portfolio, buysell);
  loop.addViewItem(portfolioView);

  //Update stock market valuess
  //loop.addRepeating(()=>{market.update()},500);

  //Save game every 10 seconds
  //loop.addRepeating(()=>{
    //gameSave.save();
  //},10000);

});*/
