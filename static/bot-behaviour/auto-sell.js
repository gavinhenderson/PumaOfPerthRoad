module.exports = {
  name: "Auto-Sell",
  description: "This bot will automatically sell stocks when they are crashing or when they are thriving",
  costs: [100,200,1000,3000],
  behaviour: function(bot, market, portfolio) {
    console.log(bot.name);
  }
}
