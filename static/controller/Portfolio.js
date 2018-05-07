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

  getSaveInfo(){
    return this.model.getSaveInfo();
  }
}

module.exports = (loop, market, GameConsole, GameSave) => {
  let PortController = new PortfolioController(loop, market, GameConsole);

  if(GameSave != undefined){
    if(GameSave.Portfolio != undefined){
      PortController.model.cash = GameSave.Portfolio.cash;
      GameSave.Portfolio.stocks.forEach(current => {
        //console.log(current)
        let stock = market.getModel().getStock(current.stockName);
        PortController.model.load(stock, current.quantity);
      })
    }
  }

  return PortController;
}
