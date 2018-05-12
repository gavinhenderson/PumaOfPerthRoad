module.exports = {
  name: "Auto-Buy",
  description: "This bot will automatically buy stocks when they are about to make a lot of money",
  costs: [100,200,500,3000],
  behaviour: function(bot, market, portfolio) {
    const buyingCaps    = [10, 20, 30, 40, 50]; // Given in percentage of cash
    let currentCap      = (portfolio.cash/100) * buyingCaps[bot.level]; // Get the cash value
    const momentumCaps  = [0.1, 0.2, 0.3, 0.4, 0.5]


    // Loop through all the stocks
    market.iterate((current)=>{
      if(current.price < currentCap && current.momentum > momentumCaps[bot.level]){
        // Calculate how many stocks to buy
        let quant = Math.floor(currentCap / current.price)

        // Buy stocks
        currentCap -= current.price * quant;
        portfolio.buy(current, quant);
      }
    });
  }
}
