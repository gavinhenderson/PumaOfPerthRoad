const View    = require('./../View/BotShop.js');
const Model   = require('./../Model/BotShop.js');

class BotShopController {
  constructor(Loop, Portfolio, Market){
    this.Loop       = Loop;
    this.Portfolio  = Portfolio;
    this.Market     = Market;
    this.View       = new View();
    this.Model      = new BotShop();
  }
}

module.exports = (Loop, Portfolio, Market) => {
  return new BotShopController(Loop, Portfolio, Market);
}
