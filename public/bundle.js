(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
var GameConsole = require('./view/console.js');
var Market      = require('./model/market.js');
var Portfolio   = require('./model/portfolio.js');
var GameLoop    = require('./model/gameLoop.js');
var StockViewer = require('./view/stock-viewer.js');
var GameSave    = require('./model/gameSave.js');

var PortfolioViewer     = require('./view/portfolio-viewer.js');
var BuySellInterface    = require('./view/buysell-interface.js');

var gameConsole = new GameConsole();
gameConsole.message("Welcome to Puma of Perth Road");
gameConsole.message("Keep an eye out on this console, you will recieve all your missions here");

//Load variables
var market = new Market();
var portfolio = new Portfolio(1000, market);

var gameSave = new GameSave();
gameSave.addItem(market);
gameSave.addItem(portfolio);

if(gameSave.doesExist()){
  gameSave.load();
} else {
  //Populate stock market
  market.addStock(new Stock("ESNT", 478,2));
  market.addStock(new Stock("OXIG", 788, 2));
  market.addStock(new Stock("ACA", 141, 2));
  market.addStock(new Stock("HWDN", 501, 2));
  market.addStock(new Stock("DRX", 264, 2));
  market.addStock(new Stock("MNDI", 1911, 2));
  market.addStock(new Stock("SRE", 55, 2));
  market.addStock(new Stock("RTO", 272, 2));
  market.addStock(new Stock("GYM", 250, 2));
  market.addStock(new Stock("RRS", 5940,2));
  market.addStock(new Stock("MTC", 21, 2));
  market.addStock(new Stock("ARW", 350, 2));
  market.addStock(new Stock("IMI", 1124, 2));
  market.addStock(new Stock("SGC", 129, 2));
  market.addStock(new Stock("FAN", 196, 2));
}

//initiate game loop that runs all functions every 100ms;
//this should only be used to update UI
var loop = new GameLoop();

//create views and add them to loop
var buysell = new BuySellInterface(market, portfolio);
loop.addViewItem(buysell);
var manualTrading = new StockViewer(market, buysell);
loop.addViewItem(manualTrading);
var portfolioView = new PortfolioViewer(portfolio, buysell);
loop.addViewItem(portfolioView);

//Update stock market valuess
loop.addRepeating(()=>{market.update()},500);

//Save game every 10 seconds
loop.addRepeating(()=>{
  gameSave.save();
},10000);

},{"./model/gameLoop.js":2,"./model/gameSave.js":3,"./model/market.js":4,"./model/portfolio.js":5,"./view/buysell-interface.js":6,"./view/console.js":7,"./view/portfolio-viewer.js":8,"./view/stock-viewer.js":9}],2:[function(require,module,exports){
module.exports = class{

  constructor(){
    this.paused = false;
    this.views = [];
    this.repeating = [];
    this.waiting = [];
    setInterval(() => {
      if(!this.paused){
        this.runViewUpdate();
        this.runRepeating();
        this.runWaiting();
      }
    },100)
  }

  addViewItem(item){
    this.views.push(item);
  }

  runViewUpdate(){
    this.views.forEach(view => {
      view.update();
    })
  }

  addRepeating(item, time){
    this.repeating.push({
      'item':item,
      'repeatTime':time,
      'timeSinceLast':0
    })
  }

  runRepeating(){
    this.repeating.forEach(current => {
      if(current.timeSinceLast>current.repeatTime){
        current.item();
        current.timeSinceLast = 0;
      } else {
        current.timeSinceLast += 100;
      }
    })
  }

  addWaiting(item, time){
    this.waiting.push({
      'item':item,
      'waitTime':time,
      'timeElapsed':0
    })
  }

  runWaiting(){
    for(var i=0;i<this.waiting.length;i++){
      var current = this.waiting[i]
      if(current.timeElapsed>current.waitTime){
        current.item();
        this.waiting.splice(i,1);
      }else{
        current.timeElapsed += 100;
      }
    }
  }

}

},{}],3:[function(require,module,exports){
module.exports = class{
  constructor(){
    this.saveItems = [];
  }

  doesExist(){
    return localStorage.getItem('saved');
  }

  addItem(newItem){
    this.saveItems.push(newItem);
  }

  load(){
    this.saveItems.forEach(current => {
      current.load();
    })
  }

  save(){
    this.saveItems.forEach(current => {
      current.save();
    })
    localStorage.setItem('saved',true);
  }

  restart(){
    localStorage.clear();
    location.reload();
  }
}

},{}],4:[function(require,module,exports){
class Stock{
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

},{}],5:[function(require,module,exports){
module.exports = class{
  constructor(cashValue, market){
    this.market = market;
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

  save(){
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
  }
}

},{}],6:[function(require,module,exports){
module.exports = class{
  constructor(market, portfolio){
    this.market = market;
    this.listSize = 0;
    this.portfolio = portfolio;
    $('#buyButton').click(()=>{
      this.buy();
    });
    $('#sellButton').click(()=>{
      this.sell();
    });
  }

  update(){
    if(this.listSize != this.market.stocks.length){
      $('#stockSelecter').empty();
      this.market.iterate((stock)=>{
        this.listSize++;
        var html = "<option>"+stock.name+"</option>";
        $('#stockSelecter').append(html);
      })
    }
    this.updatePrices();
    this.updateButtons();
  }

  updatePrices(){
    var stock = this.market.getStock($('#stockSelecter').val());
    $('#stockPrice').text(stock.price.toFixed(2));
    $('#displayQuantity').text($('#buysell-quantity').val());
    $('#tempTotal').text("= $"+(stock.price*$('#buysell-quantity').val()).toFixed(2));
  }

  updateButtons(){
    var stock = this.market.getStock($('#stockSelecter').val());

    var sellable = false;
    for(var i=0;i<this.portfolio.stocks.length;i++){
      if(stock.name==this.portfolio.stocks[i].stock.name){
        if(this.portfolio.stocks[i].quantity-$('#buysell-quantity').val()>=0){
          sellable = true;
        }
      }
    }

    if($('#sellButton').prop('disabled')){
      if(sellable){ $('#sellButton').removeAttr('disabled'); }
    }else{
      if(!sellable){ $('#sellButton').attr('disabled',true); }
    }


    var buyable = false;
    if(stock.price*$('#buysell-quantity').val()<this.portfolio.cash){
      buyable=true;
    }
    if($('#buyButton').prop('disabled')){
      if(buyable){ $('#buyButton').removeAttr('disabled'); }
    }else{
      if(!buyable){ $('#buyButton').attr('disabled',true); }
    }
  }

  select(name){
    $('#stockSelecter').val(name);
    this.updateButtons();
  }

  buy(){
    var stock = this.market.getStock($('#stockSelecter').val());
    var quantity = $('#buysell-quantity').val();
    this.portfolio.buy(stock, quantity);
  }

  sell(){
    var stock = this.market.getStock($('#stockSelecter').val());
    var quantity = $('#buysell-quantity').val();
    this.portfolio.sell(stock, quantity);
  }
}

},{}],7:[function(require,module,exports){
module.exports = class{
  constructor(){
    this.consoleDomElement = $('#console');
  }

  message(message){
    var date = new Date();
    var newMessage = date.getHours()+":"+date.getMinutes() + " > "+ message;
    var html = '<p class="console">'+newMessage+'</p>';
    this.consoleDomElement.prepend(html);
  }

  clear(){
    this.consoleDomElement.empty();
  }
}

},{}],8:[function(require,module,exports){
module.exports = class{
  constructor(portfolio, buysell){
    this.buysell = buysell;
    this.portfolio = portfolio;
    this.portfolioSize = 0;
    this.repopulate();
  }

  repopulate(){
    $('#cash-value').text(this.portfolio.cash.toFixed(2));

    var portfolioListDOM = $('#portfolio-list');
    portfolioListDOM.empty();

    var html = `
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Total</th>
        <th>Amount</th>
      </tr>
    `

    portfolioListDOM.append(html);

    this.portfolio.stocks.forEach((current) => {
      var total = current.quantity*current.stock.price;

      var html = `
        <tr>
          <td>`+current.stock.name+`</td>
          <td id="`+current.stock.name+`PortPrice">`+current.stock.price.toFixed(2)+`</td>
          <td id="`+current.stock.name+`PortTotal">`+(current.quantity*current.stock.price).toFixed(2)+`</td>
          <td><p class="no-new-line" id="`+current.stock.name+`PortQuant">`+current.quantity+`</p>
          <button id="portfolioselect`+current.stock.name+`">Select</button></td>
        </td>
      `
      portfolioListDOM.append(html);
      $('#portfolioselect'+current.stock.name).click(()=>{
        this.buysell.select(current.stock.name);
      })
    })
    this.portfolioSize = this.portfolio.stocks.length;
  }

  update(){
    $('#cash-value').text(this.portfolio.cash.toFixed(2));
    if(this.portfolioSize != this.portfolio.stocks.length){ this.repopulate(); }
    this.portfolio.stocks.forEach(current => {
      $('#'+current.stock.name+'PortPrice').text(current.stock.price.toFixed(2));
      $('#'+current.stock.name+'PortTotal').text((current.quantity*current.stock.price).toFixed(2));
      $('#'+current.stock.name+'PortQuant').text(current.quantity);
    })
  }
}

},{}],9:[function(require,module,exports){
module.exports = class{
  constructor(market, buysell){
    this.buysell = buysell;
    this.market = market;
    this.marketSize = 0;
    this.repopulate()
  }

  repopulate(){
    $('#stock-viewer').empty();
    //this.market.sortStocks();
    this.market.iterate((stock) => {
      var icon = "";
      if(stock.getDiff()>0){
        icon="green fas fa-chevron-up";
      }else{
        icon="red fas fa-chevron-down";
      }
      var html = `
        <tr>
          <td>`+stock.name+`</td>
          <td id="`+stock.name+`Price">$`+stock.price.toFixed(2)+`</td>
          <td id="`+stock.name+`Diff">`+stock.getDiff().toFixed(2)+`</td>
          <td><i id="`+stock.name+`Icon" class="`+icon+`"></i></td>
          <td><button id="buysellselect`+stock.name+`">Select</button></td>"
        </tr>`
      $('#stock-viewer').append(html);
      $('#buysellselect'+stock.name).click(() => { this.buysell.select(stock.name) });
    })
    this.marketSize = this.market.stocks.length;
  }

  update(){
    if(this.marketSize != this.market.stocks.length){ repopulate() }

    this.market.iterate(stock => {
      var icon = "";
      if(stock.getDiff()>0){
        icon="<i class='green fas fa-chevron-up'></i>";
      }else{
        icon="<i class='red fas fa-chevron-down'></i>";
      }
      $('#'+stock.name+'Price').text("$"+stock.price.toFixed(2));
      $('#'+stock.name+'Diff').text(stock.getDiff().toFixed(2));
      $('#'+stock.name+'Icon').empty();
      $('#'+stock.name+'Icon').append(icon);
    })
  }
}

},{}]},{},[1]);
