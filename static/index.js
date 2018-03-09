var GameConsole = require('./view/console.js');
var Market      = require('./model/market.js');
var Portfolio   = require('./model/portfolio.js');
var GameLoop    = require('./model/gameLoop.js');
var StockViewer = require('./view/stock-viewer.js');
var GameSave    = require('./model/gameSave.js');

var PortfolioViewer     = require('./view/portfolio-viewer.js');
var BuySellInterface    = require('./view/buysell-interface.js');

var gameConsole = new GameConsole();
gameConsole.message("Welcome to Puma of Perth Road");
gameConsole.message("Keep an eye out on this console, you will recieve all your missions here");

//Load variables
var market = new Market();
var portfolio = new Portfolio(1000, market);

var gameSave = new GameSave();
gameSave.addItem(market);
gameSave.addItem(portfolio);

if(gameSave.doesExist()){
  gameSave.load();
} else {
  //Populate stock market
  market.addStock(new Stock("ESNT", 478,2));
  market.addStock(new Stock("OXIG", 788, 2));
  market.addStock(new Stock("ACA", 141, 2));
  market.addStock(new Stock("HWDN", 501, 2));
  market.addStock(new Stock("DRX", 264, 2));
  market.addStock(new Stock("MNDI", 1911, 2));
  market.addStock(new Stock("SRE", 55, 2));
  market.addStock(new Stock("RTO", 272, 2));
  market.addStock(new Stock("GYM", 250, 2));
  market.addStock(new Stock("RRS", 5940,2));
  market.addStock(new Stock("MTC", 21, 2));
  market.addStock(new Stock("ARW", 350, 2));
  market.addStock(new Stock("IMI", 1124, 2));
  market.addStock(new Stock("SGC", 129, 2));
  market.addStock(new Stock("FAN", 196, 2));
}

//initiate game loop that runs all functions every 100ms;
//this should only be used to update UI
var loop = new GameLoop();

//create views and add them to loop
var buysell = new BuySellInterface(market, portfolio);
loop.addViewItem(buysell);
var manualTrading = new StockViewer(market, buysell);
loop.addViewItem(manualTrading);
var portfolioView = new PortfolioViewer(portfolio, buysell);
loop.addViewItem(portfolioView);

//Update stock market valuess
loop.addRepeating(()=>{market.update()},500);

//Save game every 10 seconds
loop.addRepeating(()=>{
  gameSave.save();
},10000);
