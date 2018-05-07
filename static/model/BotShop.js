const Bot = require('./Bot.js');

module.exports = class {
  constructor ( market, portfolio ) {
    this.portfolio = portfolio.model;
    this.market    = market.model;
    this.bots = [];
  }

  setLevel(name, level){
    for(let i=0; i<this.bots.length; i++){
      if(this.bots[i].name == name){
        this.bots[i].level = level;
        return;
      }
    }
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

  getSaveInfo(){
    let tempArr = [];

    this.bots.forEach(current => {
      let tempObj = {
        name: current.name,
        level: current.level
      }
      tempArr.push(tempObj)
    });

    return tempArr;
  }
}
