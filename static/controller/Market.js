const Market        = require('./../model/Market.js');
const MarketViewer  = require('./../model/Market.js');
const Stock         = require('./../model/Stock.js');

class MarketController {
  constructor(model, loop){
    this.loop = loop;
    this.model = model;
    this.loop.addRepeating(()=>{this.model.update()},500);
  }

  getModel(){
    return this.model;
  }

  createViewer(buysell) {
    this.viewer = new MarketViewer(this.model, buysell);
    this.loop.addViewItem(this.viewer);
  }
}

module.exports = (loop) => {


  let market = new Market();


  market.addStock(new Stock("ESNT", 478,2));
  market.addStock(new Stock("OXIG", 788, 2));
  market.addStock(new Stock("ACA", 141, 2));
  market.addStock(new Stock("HWDN", 501, 2));
  market.addStock(new Stock("DRX", 264, 2));
  market.addStock(new Stock("MNDI", 1911, 2));
  market.addStock(new Stock("SRE", 55, 2));
  market.addStock(new Stock("RTO", 272, 2));
  market.addStock(new Stock("GYM", 250, 2));
  market.addStock(new Stock("RRS", 5940,2));
  market.addStock(new Stock("MTC", 21, 2));
  market.addStock(new Stock("ARW", 350, 2));
  market.addStock(new Stock("IMI", 1124, 2));
  market.addStock(new Stock("SGC", 129, 2));
  market.addStock(new Stock("FFN", 196, 2));

  return new MarketController(market,loop);

}
