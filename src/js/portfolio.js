class Portfolio{
  constructor(cashValue){
    this.stocks = [];
    this.cash = cashValue;
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
    var value = 0;
    this.stocks.forEach((stock)=>{
      value += stock.price;
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
          console.message("You don't have enough of "+stock.name+" to sell");
          return
        }
      }
    }
    console.message("You don't have any "+stock.name);
  }
}
