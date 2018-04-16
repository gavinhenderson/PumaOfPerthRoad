(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
const Market        = require('./../model/Market.js');
const MarketViewer  = require('./../view/Market.js');
const Stock         = require('./../model/Stock.js');

class MarketController {
  constructor(model, loop){
    this.loop = loop;
    this.model = model;
    loop.addRepeating(()=>{this.model.update()},500);
    this.viewer = new MarketViewer(this.model);
    loop.addViewItem(this.viewer)
  }

  getModel(){
    return this.model;
  }
}

module.exports = (loop) => {
  // Create Market and Populate it
  let market = new Market();
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
  market.addStock(new Stock("FFN", 196, 2));

  // Return the controller
  return new MarketController(market, loop);
}

},{"./../model/Market.js":4,"./../model/Stock.js":5,"./../view/Market.js":7}],2:[function(require,module,exports){
$(document).ready(function() {
  const GameConsole     = require('./view/Console.js')();
  const Loop            = require('./model/Loop.js')();
  const Market          = require('./controller/Market.js')(Loop);
})


/*$(document).ready(function() {
  localStorage.clear();
  //var FB          = require('./model/fb.js')();

  var GameConsole = require('./view/console.js');
  var Portfolio   = require('./model/portfolio.js');
  var GameLoop    = require('./model/gameLoop.js');
  var loop = new GameLoop();
  //var StockViewer = require('./view/stock-viewer.js');
  var GameSave    = require('./model/gameSave.js');
  //var Stock       = require('./model/Stock.js');

  var PortfolioViewer     = require('./view/portfolio-viewer.js');
  var BuySellInterface    = require('./view/buysell-interface.js');

  var gameConsole = new GameConsole();
  gameConsole.message("Welcome to Puma of Perth Road!");
  gameConsole.message("Keep an eye out on this console, you will recieve all your missions here");


  //Load variables
  //var market = new Market();

  //var gameSave = new GameSave();
  //gameSave.addItem(market);
  //gameSave.addItem(portfolio);
  //if(gameSave.doesExist()){
    //gameSave.load();
  //} else {
    //Populate stock market

  //}

  //initiate game loop that runs all functions every 100ms;
  //this should only be used to update UI

  //create views and add them to loop
  let market    = require('./controller/Market.js')(loop);
  var portfolio = new Portfolio(1000, market.getModel());


  var buysell = new BuySellInterface(market.getModel(), portfolio);
  loop.addViewItem(buysell);

  market.createViewer(buysell)



  var portfolioView = new PortfolioViewer(portfolio, buysell);
  loop.addViewItem(portfolioView);

  //Update stock market valuess
  //loop.addRepeating(()=>{market.update()},500);

  //Save game every 10 seconds
  //loop.addRepeating(()=>{
    //gameSave.save();
  //},10000);

});*/

},{"./controller/Market.js":1,"./model/Loop.js":3,"./view/Console.js":6}],3:[function(require,module,exports){
class Loop {
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

module.exports = () => {
  return new Loop();
}

},{}],4:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
class Console{
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

module.exports = () => {
  let gameConsole = new Console();
  gameConsole.message("Welcome to Puma of Perth Road!");
  gameConsole.message("Keep an eye out on this console, you will recieve all your missions here");
  return gameConsole;
}

},{}],7:[function(require,module,exports){
module.exports = class{
  constructor(market){
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
      $('#buysellselect'+stock.name).click(() => { $('#stockSelecter').val(stock.name); });
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

},{}]},{},[2]);
