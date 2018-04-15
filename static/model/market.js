module.exports = class{

  constructor(){
    this.stocks = [];
  }

  getStock(name){
    var found = null
    this.iterate((stock)=>{
      if(stock.name == name){ found=stock; }
    });
    return found;
  }

  addStock(newStock){
    this.stocks.push(newStock);
  }

  sortStocks(){
    this.stocks.sort((a,b) => {
      if (a.price > b.price) {
        return -1;
      }
      if (a.price < b.price) {
        return 1;
      }
      return 0;
    });
  }

  update(){
    this.iterate(function(stock){
      stock.update();
    })
  }

  iterate(cb){
    for(var i=0;i<this.stocks.length;i++){
      cb(this.stocks[i]);
    }
  }

  save(){
    var serialisedStocks = [];

    this.iterate(function(stock){
      var temp = {
        name: stock.name,
        price: stock.price,
        momentum: stock.momentum,
        volatility: stock.volatility,
        history: stock.history
      }
      serialisedStocks.push(temp);
    })
    localStorage.setItem('market',JSON.stringify(serialisedStocks));
  }

  load(){
    var serialisedStocks = JSON.parse(localStorage.getItem('market'));
    serialisedStocks.forEach(current=>{
      var nStock = new Stock(current.name, current.price, current.volatility);
      nStock.momentum = current.momentum;
      nStock.history = current.history;
      this.stocks.push(nStock);
    });
  }

}
