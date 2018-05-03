const Bot = require('./Bot.js');

module.exports = class {
  constructor () {
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
}
