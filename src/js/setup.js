console.message("Welcome to Puma of Perth Road");
console.message("Keep an eye out on this console, you will recieve all your missions here");

//Load variables
//if(localStorage.getItem('saved')){
if(false){
  var market = localStorage.getItem('market');
  var portfolio = localStorage.getItem('portfolio');
}else{ //Init variables
  var market = new Market();
  var portfolio = new Portfolio(1000);

  //Populate stock market
  market.addStock(new Stock("ESNT", 477,2));
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
var manualTrading = new StockViewer(market);
loop.addViewItem(manualTrading);
var buysell = new BuySellInterface(market, portfolio);
loop.addViewItem(buysell);
var portfolioView = new PortfolioViewer(portfolio);
loop.addViewItem(portfolioView);

//Update stock market valuess
loop.addRepeating(()=>{market.update()},500);

//Save game every 10 seconds
loop.addRepeating(()=>{
  localStorage.setItem('market', market);
  localStorage.setItem('portfolio', portfolio);
  localStorage.setItem('saved',true);
},10000);
