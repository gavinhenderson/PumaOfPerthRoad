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

  getSaveInfo(){
    return this.Model.getSaveInfo();
  }
}

module.exports = (Loop, Portfolio, Market, GameSave) => {
  let controller =  new BotShopController(Loop, Portfolio, Market);

  // Bots defined externally
  controller.Model.addBot(require('./../bot-behaviour/auto-sell.js'));
  controller.Model.addBot(require('./../bot-behaviour/auto-buy.js'));

  if(GameSave != undefined){
    if(GameSave.BotShop != undefined){
      GameSave.BotShop.forEach(current => {
        controller.Model.setLevel(current.name, current.level);
      })
    }
  }

  return controller;
}
