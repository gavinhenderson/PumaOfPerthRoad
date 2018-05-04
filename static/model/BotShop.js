const Bot = require('./Bot.js');

module.exports = class {
  constructor ( market, portfolio ) {
    this.portfolio = portfolio.model;
    this.market    = market.model;
    this.bots = [];
  }

  addBot(ops){
    this.bots.push(new Bot(ops));
  }

  update () {
    this.bots.forEach(current => {
      current.action(this.market, this.portfolio);
    })
  }

  upgrade(bot){
    if(this.portfolio.cash >= bot.costs[bot.level]){
      this.portfolio.cash -= bot.costs[bot.level];
      bot.level ++;
    }
  }
}
