const View    = require('./../View/BotShop.js');
const Model   = require('./../Model/BotShop.js');

class BotShopController {
  constructor(Loop, Portfolio, Market){
    this.Loop       = Loop;
    this.Portfolio  = Portfolio;
    this.Market     = Market;
    this.Model      = new Model( Market, Portfolio );
    this.View       = new View( this.Model );

    this.Loop.addViewItem( this.View );
    this.Loop.addRepeating(() => {
      this.Model.update();
    }, 3000);
  }
}

module.exports = (Loop, Portfolio, Market) => {
  let controller =  new BotShopController(Loop, Portfolio, Market);

  // Bots defined externally
  controller.Model.addBot(require('./../bot-behaviour/auto-sell.js'));
  controller.Model.addBot(require('./../bot-behaviour/auto-buy.js'));

  return controller;
}
