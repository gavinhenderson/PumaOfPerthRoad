module.exports = class {
  constructor(name, price, volatility){
    this.name = name;
    this.price = price;
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
      }else if(upOrDown=1){
        this.price -= (this.price/10);
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
