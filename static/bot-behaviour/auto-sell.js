module.exports = {
  name: "Auto-Sell",
  description: "This bot will automatically sell stocks when they are crashing or when they are thriving",
  costs: [100, 200, 1000, 3000],
  behaviour: function(bot, market, portfolio) {
    // Calculate the stock value
    const StockValue  = portfolio.value();
    const SellCaps    = [40, 50, 60, 70];
    let   SellCap     = (StockValue/100) * SellCaps[bot.level];

    portfolio.stocks.forEach(current => {
      //if(current.stock.momentum < 0){
        //portfolio.sell(current.stock, current.quantity);
      //}
      if(current.stock.price < SellCap && current.stock.momentum < 0){
        // Calculate how many stocks to buy
        let quant = Math.floor(SellCap / current.stock.price)

        // Buy stocks
        SellCap -= current.stock.price * quant;
        portfolio.sell(current.stock, quant);
      }
    });
  }
}
