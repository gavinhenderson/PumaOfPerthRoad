module.exports = class{
  constructor(cashValue, market, gameConsole){
    this.gameConsole = gameConsole;
    this.market = market;
    this.stocks = [];
    this.cash = cashValue;
  }

  load(addStock, quantity){
    this.stocks.push({
      'stock': addStock,
      'quantity': parseInt(quantity),
      'buyprice': addStock.price
    })
  }

  buy(addStock, quantity){
    if(addStock.price*quantity>this.cash){
      console.message("You have insufficent funds to buy "+addStock.name);
      return;
    }

    var added = false;
    this.stocks.forEach((stock)=>{
      if(stock.stock.name == addStock.name){
        this.cash -= addStock.price*quantity;
        stock.quantity += parseInt(quantity);
        added = true;
      }
    })
    if(!added){
      this.cash -= addStock.price*quantity;
      this.stocks.push({
        'stock': addStock,
        'quantity': parseInt(quantity),
        'buyprice': addStock.price
      })
    }
  }

  value(){
    let value = 0;
    this.stocks.forEach((stock)=>{
      value += stock.stock.price * stock.quantity;
    })
    return value;
  }

  sell(stock, quantity){
    for(var i=0;i<this.stocks.length;i++){
      if(stock.name==this.stocks[i].stock.name){
        if(this.stocks[i].quantity-quantity>0){
          this.stocks[i].quantity -= quantity;
          this.cash += stock.price*quantity;
          return;
        }else if (this.stocks[i].quantity-quantity==0){
          this.stocks.splice(i,1);
          this.cash += stock.price*quantity;
          return;
        }else{
          this.gameConsole.message("You don't have enough of "+stock.name+" to sell");
          return
        }
      }
    }
    this.gameConsole.message("You don't have any "+stock.name);
  }

  getSaveInfo(){
    let tempObj     = {}
    tempObj.cash    = this.cash;
    tempObj.stocks  = [];

    this.stocks.forEach(current => {
      let tempStock = {};
      tempStock.quantity  = current.quantity;
      tempStock.stockName = current.stock.name;
      tempObj.stocks.push(tempStock);
    });

    return tempObj;
  }

  /*save(){
    localStorage.setItem('portfolio.cashValue',this.cash);
    var stocks = [];
    this.stocks.forEach(current=>{
      var temp = {
        name: current.stock.name,
        quantity: current.quantity,
        buyPrice: current.buyprice
      }
      stocks.push(temp);
    });
    //console.log(stocks)
    localStorage.setItem('portfolio.stocks',JSON.stringify(stocks));
  }

  load(){
    this.cash = parseInt(localStorage.getItem('portfolio.cashValue'));
    var tStocks = JSON.parse(localStorage.getItem('portfolio.stocks'));
    tStocks.forEach(current=>{
      var temp = {
        stock: this.market.getStock(current.name),
        quantity: current.quantity,
        buyprice: current.buyPrice
      }
      this.stocks.push(temp)
    })
  }*/
}
