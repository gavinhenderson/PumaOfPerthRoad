console.message("Welcome to Puma of Perth Road");

//initiate game loop that runs all functions every 100ms;
//this should only be used to update UI
var loop = new GameLoop(100);

//Create market
var market = new Market();

//create views and add them to loop
var manualTrading = new StockViewer(market);
loop.addItem(manualTrading);
var buysell = new BuySellInterface(market);
loop.addItem(buysell);

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

//Update stock market valuess
setInterval(function(){
  market.update();
  localStorage.setItem('game',this);
},500);
