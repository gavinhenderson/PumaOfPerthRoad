console.message("Welcome to Puma of Perth Road");

var loop = new GameLoop(100);

var market = new Market();
var manualTrading = new StockViewer(market);
loop.addItem(manualTrading);

market.addStock(new Stock("ABC", 2));
market.addStock(new Stock("ZSA", 2));
market.addStock(new Stock("XAS", 2));
market.addStock(new Stock("GDS", 2));
market.addStock(new Stock("GSY", 2));
market.addStock(new Stock("ABC", 2));
market.addStock(new Stock("ZSA", 2));
market.addStock(new Stock("XAS", 2));
market.addStock(new Stock("GDS", 2));
market.addStock(new Stock("GSY", 2));
market.addStock(new Stock("ABC", 2));
market.addStock(new Stock("ZSA", 2));
market.addStock(new Stock("XAS", 2));
market.addStock(new Stock("GDS", 2));
market.addStock(new Stock("GSY", 2));
market.addStock(new Stock("ABC", 2));
market.addStock(new Stock("ZSA", 2));
market.addStock(new Stock("XAS", 2));
market.addStock(new Stock("GDS", 2));
market.addStock(new Stock("GSY", 2));
market.addStock(new Stock("ABC", 2));
market.addStock(new Stock("ZSA", 2));
market.addStock(new Stock("XAS", 2));
market.addStock(new Stock("GDS", 2));
market.addStock(new Stock("GSY", 2));

setInterval(function(){
  market.update();
},500)
