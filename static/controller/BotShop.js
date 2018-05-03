const View    = require('./../View/BotShop.js');
const Model   = require('./../Model/BotShop.js');

class BotShopController {
  constructor(Loop, Portfolio, Market){
    this.Loop       = Loop;
    this.Portfolio  = Portfolio;
    this.Market     = Market;
    this.View       = new View();
    this.Model      = new BotShop();
    this.Loop.addViewItem( this.View );
    this.Loop.addRepeating(()=>{ this.Model.update(); }, 500);
  }
}

module.exports = (Loop, Portfolio, Market) => {
  return new BotShopController(Loop, Portfolio, Market);
}
