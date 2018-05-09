const BrokerView  = require('./../view/Broker.js')

class BrokerController{
  constructor(loop, market, portfolio, calendar){
    this.view = new BrokerView(market.getModel(), portfolio.getModel(), loop, calendar.model);
    loop.addViewItem(this.view);
  }

  getView(){
    return this.view
  }
}

module.exports = (loop, market, portfolio, calendar) => {
  return new BrokerController(loop, market, portfolio, calendar);
}
