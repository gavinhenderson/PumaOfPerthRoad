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
  market.addStock(new Stock("A", 2));
  market.addStock(new Stock("B", 2));
  market.addStock(new Stock("C", 2));
  market.addStock(new Stock("D", 2));
  market.addStock(new Stock("E", 2));
  market.addStock(new Stock("F", 2));
  market.addStock(new Stock("G", 2));
  market.addStock(new Stock("H", 2));
  market.addStock(new Stock("I", 2));
  market.addStock(new Stock("J", 2));
  market.addStock(new Stock("K", 2));
  market.addStock(new Stock("L", 2));
  market.addStock(new Stock("M", 2));
  market.addStock(new Stock("N", 2));
  market.addStock(new Stock("O", 2));
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
