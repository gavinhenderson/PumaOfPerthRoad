const Market        = require('./../model/Market.js');
const MarketViewer  = require('./../view/Market.js');
const Stock         = require('./../model/Stock.js');

class MarketController {
  constructor(model, loop){
    this.loop = loop;
    this.model = model;
    loop.addRepeating(()=>{this.model.update()},500);
    this.viewer = new MarketViewer(this.model, loop);
    loop.addViewItem(this.viewer)
  }

  getModel(){
    return this.model;
  }

  getSaveInfo(){
    return this.model.getSaveInfo();
  }
}

module.exports = (loop, marketSave) => {
  // Create Market and Populate it
  let market = new Market();

  if(marketSave == undefined){
    market.addStock(new Stock({ name:"ESNT", price:478,  volatility:2 }));
    market.addStock(new Stock({ name:"OXIG", price:788,  volatility:2 }));
    market.addStock(new Stock({ name:"ACA",  price:141,  volatility:2 }));
    market.addStock(new Stock({ name:"HWDN", price:501,  volatility:2 }));
    market.addStock(new Stock({ name:"DRX",  price:264,  volatility:2 }));
    market.addStock(new Stock({ name:"MNDI", price:1911, volatility:2 }));
    market.addStock(new Stock({ name:"SRE",  price:55,   volatility:2 }));
    market.addStock(new Stock({ name:"RTO",  price:272,  volatility:2 }));
    market.addStock(new Stock({ name:"GYM",  price:250,  volatility:2 }));
    market.addStock(new Stock({ name:"RRS",  price:5940, volatility:2 }));
    market.addStock(new Stock({ name:"MTC",  price:21,   volatility:2 }));
    market.addStock(new Stock({ name:"ARW",  price:350,  volatility:2 }));
    market.addStock(new Stock({ name:"IMI",  price:1124, volatility:2 }));
    market.addStock(new Stock({ name:"SGC",  price:129,  volatility:2 }));
    market.addStock(new Stock({ name:"FFN",  price:196,  volatility:2 }));
  } else {
    marketSave.Market.forEach(current => {
      market.addStock(new Stock(current));
    })
  }

  // Return the controller
  return new MarketController(market, loop);
}
