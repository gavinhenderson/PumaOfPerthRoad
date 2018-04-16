const BrokerView  = require('./../view/Broker.js')

class BrokerController{
  constructor(loop, market, portfolio){
    this.view = new BrokerView(market.getModel(), portfolio.getModel())
    loop.addViewItem(this.view);
  }

  getView(){
    return this.view
  }
}

module.exports = (loop, market, portfolio) => {
  return new BrokerController(loop, market, portfolio);
}
