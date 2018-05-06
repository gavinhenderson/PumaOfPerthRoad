module.exports = {
  name: "Auto-Buy",
  description: "This bot will automatically buy stocks when they are about to make a lot of money",
  costs: [100,200,500,3000],
  behaviour: function(bot, market, portfolio) {
    const buyingCaps = [10, 20, 30, 40, 50]; // Given in percentage of crash
    let currentCap = (portfolio.cash/100) * buyingCaps[bot.level];
    market.iterate((current)=>{
      if(current.price < currentCap && current.momentum > 0.6){
        currentCap -= current.price;
        portfolio.buy(current, 1);
        console.log(current.name + " was just bought by the auto buying bot")
      }
    })
  }
}
