const View    = require('./../View/BotShop.js');
const Model   = require('./../Model/BotShop.js');

class BotShopController {
  constructor(Loop, Portfolio, Market){
    this.Loop       = Loop;
    this.Portfolio  = Portfolio;
    this.Market     = Market;
    this.Model      = new Model( Portfolio );
    this.View       = new View( this.Model );

    this.Loop.addViewItem( this.View );
    this.Loop.addRepeating(() => {
      this.Model.update();
    }, 500);
  }
}

module.exports = (Loop, Portfolio, Market) => {
  let controller =  new BotShopController(Loop, Portfolio, Market);

  controller.Model.addBot({
    name: "testBot1",
    description: "this is a description",
    costs: [100,200,100,300],
    behaviour: function(){ console.log("test") },
  });

  controller.Model.addBot({
    name: "testBot2",
    description: "this is a description",
    costs: [100,200,100,300],
    behaviour: function(){ console.log("test") },
    level: 3
  });

  controller.Model.addBot({
    name: "testBot3",
    description: "this is a description",
    costs: [100,200,100,300],
    behaviour: function(){ console.log("test") },
  });

  return controller;
}
