const PortfolioView  = require('./../view/Portfolio.js');
const Portfolio      = require('./../model/Portfolio.js');

class PortfolioController{
  constructor(loop, market){
    this.model = new Portfolio(1000, market.getModel());
    this.view = new PortfolioView(this.model);
    loop.addViewItem(this.view);
  }

  getView(){
    return this.view;
  }

  getModel(){
    return this.model;
  }
}

module.exports = (loop, market) => {
  return new PortfolioController(loop, market);
}
