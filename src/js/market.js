class Stock{
  constructor(name, volatility){
    this.name = name;
    this.price = 100;
    this.momentum = 0;
    this.volatility = volatility;
    this.history = [];
  }

  update(){
    var rand = Math.floor(Math.random()*21);
    rand -= 10;
    rand = rand/10;
    this.momentum += rand;
    if(this.momentum>0.8){ this.momentum = 0.8; }
    else if(this.momentum<-0.8){ this.momentum = -0.8; }
    this.price += this.momentum
    if(this.price<0){ this.price = 0;}

    //Jump checking
    //Generate random no between 1 and 100;
    var jumpChance = Math.floor(Math.random()*1000)+1
    if(jumpChance<this.volatility){
      //jump up or down
      var upOrDown = Math.floor(Math.random()*2);
      if(upOrDown==0){
        this.price += (this.price/10);
        console.message(this.name+" jumped up");
      }else if(upOrDown=1){
        this.price -= (this.price/10);
        console.message(this.name+" jumped down");
      }
    }

    this.addHistory(this.price);
  }

  addHistory(newValue){
    this.history.push(newValue);

    if(this.history.length>100){
      this.history.shift();
    }
  }

  getDiff(){
    return this.price - this.history[0];
  }
}

class Market{

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
      if (a.getDiff() > b.getDiff()) {
        return -1;
      }
      if (a.getDiff() < b.getDiff()) {
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

}
