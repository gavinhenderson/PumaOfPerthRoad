const Bot = require('./Bot.js');

module.exports = class {
  constructor ( portfolio ) {
    this.portfolio = portfolio.model;
    this.bots = [];
  }

  addBot(ops){
    this.bots.push(new Bot(ops));
  }

  update () {
    this.bots.forEach(current => {
      current.action();
    })
  }

  upgrade(bot){
    if(this.portfolio.cash >= bot.costs[bot.level]){
      this.portfolio.cash -= bot.costs[bot.level];
      bot.level ++;
    }
  }
}
