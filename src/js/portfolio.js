class Portfolio{
  constructor(cashValue){
    this.stocks = [];
    this.cash = cashValue;
  }

  buy(addStock, quantity){
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
    var value = 0;
    this.stocks.forEach((stock)=>{
      value += stock.price;
    })
    return value;
  }

  sell(stock, quantity){
    this.cash += stock.price*quantity;
    for(var i=0;i<this.stocks.length;i++){
      if(stock.name==this.stocks[i].stock.name){
        if(this.stocks[i].quantity-quantity>0){
          this.stocks[i].quantity -= quantity;
        }else{
          this.stocks.splice(i,1);
        }
      }
    }
  }
}
