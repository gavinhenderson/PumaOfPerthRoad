const PortfolioView  = require('./../view/Portfolio.js');
const Portfolio      = require('./../model/Portfolio.js');

class PortfolioController{
  constructor(loop, market, GameConsole){
    this.model = new Portfolio(1000, market.getModel(), GameConsole);
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

module.exports = (loop, market, GameConsole) => {
  return new PortfolioController(loop, market, GameConsole);
}
