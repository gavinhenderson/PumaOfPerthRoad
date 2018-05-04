(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
module.exports = class {
  constructor (ops) {
    this.name         = ops.name;
    this.description  = ops.description;
    this.costs        = ops.costs;
    this.behaviour    = ops.behaviour;
    this.level        = ops.level || 0;
  }

  action() {
    if(this.level>0){
      this.behaviour(this);
    }
  }
}

},{}],2:[function(require,module,exports){
const Bot = require('./Bot.js');

module.exports = class {
  constructor ( portfolio ) {
    this.portfolio = portfolio.model;
    this.bots = [];
  }

  addBot(ops){
    this.bots.push(new Bot(ops));
  }

  update () {
    this.bots.forEach(current => {
      current.action();
    })
  }

  upgrade(bot){
    if(this.portfolio.cash >= bot.costs[bot.level]){
      this.portfolio.cash -= bot.costs[bot.level];
      bot.level ++;
    }
  }
}

},{"./Bot.js":1}],3:[function(require,module,exports){
module.exports = class {
  constructor( model ){
    this.model = model;
    this.size = 0;
    this.table = $('#bot-shop-table');
    this.update();
  }

  repopulate(){
    this.size = 0;
    this.table.empty();
    this.table.append(`
      <tr>
        <th>Bot</th>
        <th>Level</th>
        <th>Cost</th>
        <th>Upgrade</th>
      </tr>
      `);
    this.model.bots.forEach(current => {
      this.size++;
      this.table.append(`
        <tr>
          <td>${ current.name }</td>
          <td id="level${ current.name }">${ current.level }</td>
          <td id="cost${ current.name }">${ current.costs[current.level] }</td>
          <td><button id="upgrade${ current.name }">Upgrade</button></td>
        </tr>
        `);

      $('#upgrade'+current.name).click(() => {
        this.model.upgrade(this.findBotByName(current.name));
      })
    });
  }

  findBotByName(name){
    for(let i=0;i<this.model.bots.length; i++){
      if(this.model.bots[i].name == name){
        return this.model.bots[i];
      }
    }
  }

  update(){
    if(this.size != this.model.bots.length){
      this.repopulate();
    } else {
      this.model.bots.forEach(current => {
        $('#level'+current.name).text(current.level);
        $('#cost'+current.name).text(current.costs[current.level]);

        // Disable Button if you dont have enough money
        if(this.model.portfolio.cash >= current.costs[current.level]){
          $('#upgrade'+current.name).removeAttr('disabled');
        } else {
          $('#upgrade'+current.name).attr('disabled',true);
        }
      });
    }
  }
}

},{}],4:[function(require,module,exports){
module.exports = {
  name: "Auto-Buy",
  description: "This bot will automatically buy stocks when they are about to make a lot of money",
  costs: [100,200,500,3000],
  behaviour: function(bot, market, portfolio) {
    console.log(bot.name);
  }
}

},{}],5:[function(require,module,exports){
module.exports = {
  name: "Auto-Sell",
  description: "This bot will automatically sell stocks when they are crashing or when they are thriving",
  costs: [100,200,1000,3000],
  behaviour: function(bot, market, portfolio) {
    console.log(bot.name);
  }
}

},{}],6:[function(require,module,exports){
const View    = require('./../View/BotShop.js');
const Model   = require('./../Model/BotShop.js');

class BotShopController {
  constructor(Loop, Portfolio, Market){
    this.Loop       = Loop;
    this.Portfolio  = Portfolio;
    this.Market     = Market;
    this.Model      = new Model( Market, Portfolio );
    this.View       = new View( this.Model );

    this.Loop.addViewItem( this.View );
    this.Loop.addRepeating(() => {
      this.Model.update();
    }, 500);
  }
}

module.exports = (Loop, Portfolio, Market) => {
  let controller =  new BotShopController(Loop, Portfolio, Market);

  // Bots defined externally
  controller.Model.addBot(require('./../bot-behaviour/auto-sell.js'));
  controller.Model.addBot(require('./../bot-behaviour/auto-buy.js'));

  return controller;
}

},{"./../Model/BotShop.js":2,"./../View/BotShop.js":3,"./../bot-behaviour/auto-buy.js":4,"./../bot-behaviour/auto-sell.js":5}],7:[function(require,module,exports){
const BrokerView  = require('./../view/Broker.js')

class BrokerController{
  constructor(loop, market, portfolio){
    this.view = new BrokerView(market.getModel(), portfolio.getModel())
    loop.addViewItem(this.view);
  }

  getView(){
    return this.view
  }
}

module.exports = (loop, market, portfolio) => {
  return new BrokerController(loop, market, portfolio);
}

},{"./../view/Broker.js":15}],8:[function(require,module,exports){
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

},{"./../model/Market.js":12,"./../model/Stock.js":14,"./../view/Market.js":17}],9:[function(require,module,exports){
const PortfolioView  = require('./../view/Portfolio.js');
const Portfolio      = require('./../model/Portfolio.js');

class PortfolioController{
  constructor(loop, market){
    this.model = new Portfolio(1000, market.getModel());
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

module.exports = (loop, market) => {
  return new PortfolioController(loop, market);
}

},{"./../model/Portfolio.js":13,"./../view/Portfolio.js":18}],10:[function(require,module,exports){
$(document).ready(function() {
  let GameConsole     = require('./view/Console.js')();

  let Loop            = require('./model/Loop.js')();

  let Market          = require('./controller/Market.js')(Loop);
  let Portfolio       = require('./controller/Portfolio.js')(Loop, Market);
  let Broker          = require('./controller/Broker.js')(Loop, Market, Portfolio);
  let BotShop         = require('./controller/BotShop.js')(Loop, Portfolio, Market);
});

},{"./controller/BotShop.js":6,"./controller/Broker.js":7,"./controller/Market.js":8,"./controller/Portfolio.js":9,"./model/Loop.js":11,"./view/Console.js":16}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
module.exports = class{
  constructor(market, portfolio){
    this.market     = market;
    this.listSize   = 0;
    this.portfolio  = portfolio;

    $('#buyButton').click(() => {
      this.buy()
    });

    $('#sellButton').click(() => {
      this.sell();
    });
  }

  update(){
    // Only clear if new stocks
    if(this.listSize != this.market.stocks.length){
      // Clear stocks
      $('#stockSelecter').empty();

      // Loop through stocks
      this.market.iterate((stock)=>{
        this.listSize++;
        $('#stockSelecter').append(`<option>${ stock.name }</option>`);
      })
    }
    this.updatePrices();
    this.updateButtons();
  }

  updatePrices(){
    let stock = this.market.getStock($('#stockSelecter').val());
    $('#stockPrice').text(stock.price.toFixed(2));
    $('#displayQuantity').text($('#buysell-quantity').val());
    $('#tempTotal').text("= $"+(stock.price*$('#buysell-quantity').val()).toFixed(2));
  }

  updateButtons(){
    let stock = this.market.getStock($('#stockSelecter').val());

    let sellable = false;
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


    let buyable = false;
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

},{}],16:[function(require,module,exports){
class Console{
  constructor(){
    this.consoleDomElement = $('#console');
  }

  message(message){
    var date = new Date();
    var newMessage = date.getHours()+":"+date.getMinutes() + " > "+ message;
    this.consoleDomElement.prepend(`<p class="console">${ newMessage }</p>`);
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

},{}],17:[function(require,module,exports){
module.exports = class{
  constructor(market){
    this.market     = market;
    this.marketSize = 0;
    this.repopulate()
  }

  repopulate(){
    // Clear the viewer
    $('#stock-viewer').empty();

    // Loop through all the stocks
    this.market.iterate((stock) => {
      // Set icon to up or down
      let icon = stock.getDiff() > 0 ? "green fas fa-chevron-up" : "red fas fa-chevron-down";

      // Add each stock to the list
      $('#stock-viewer').append(`
        <tr>
          <td>${ stock.name }</td>
          <td id="${ stock.name }Price">$${ stock.price.toFixed(2) }</td>
          <td id="${ stock.name }Diff">${ stock.getDiff().toFixed(2) }</td>
          <td><i id="${ stock.name }Icon" class="${ icon }"></i></td>
          <td><button id="buysellselect${ stock.name }">Select</button></td>"
        </tr>
        `);
      $('#buysellselect'+stock.name).click(() => { $('#stockSelecter').val(stock.name); });
    })

    // Set the stock length
    this.marketSize = this.market.stocks.length;
  }

  update(){
    // Only update if the stocks have changed
    if(this.marketSize != this.market.stocks.length){ this.repopulate() }

    // Update the price of each
    this.market.iterate(stock => {
      var icon = stock.getDiff()>0 ? "<i class='green fas fa-chevron-up'></i>" : "<i class='red fas fa-chevron-down'></i>";
      $('#'+stock.name+'Price').text("$"+stock.price.toFixed(2));
      $('#'+stock.name+'Diff').text(stock.getDiff().toFixed(2));
      $('#'+stock.name+'Icon').empty();
      $('#'+stock.name+'Icon').append(icon);
    })
  }
}

},{}],18:[function(require,module,exports){
module.exports = class {
  constructor( portfolio ){
    this.portfolio      = portfolio;
    this.portfolioSize  = 0;
    this.repopulate();
  }

  repopulate(){
    // Set cash value
    $('#cash-value').text(this.portfolio.cash.toFixed(2));

    // Empty the list and add headers
    var portfolioListDOM = $('#portfolio-list');
    portfolioListDOM.empty();
    portfolioListDOM.append(`
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Total</th>
        <th>Amount</th>
      </tr>
    `);

    // Loop through owned stocks and add them to table.
    this.portfolio.stocks.forEach((current) => {
      var total = current.quantity * current.stock.price;
      portfolioListDOM.append(`
        <tr>
          <td>${ current.stock.name }</td>
          <td id="${ current.stock.name }PortPrice">${ current.stock.price.toFixed(2) }</td>
          <td id="${ current.stock.name }PortTotal">${ (current.quantity * current.stock.price).toFixed(2) }</td>
          <td><p class="no-new-line" id="${ current.stock.name }PortQuant">${ current.quantity }</p>
          <button id="portfolioselect${ current.stock.name }">Select</button></td>
        </td>
      `);
      $('#portfolioselect'+current.stock.name).click(()=>{
        $('#stockSelecter').val(current.stock.name);
      });
    });

    // Reset the size of the portoflio
    this.portfolioSize = this.portfolio.stocks.length;
  }

  update(){
    // Always reset cash value
    $('#cash-value').text(this.portfolio.cash.toFixed(2));

    // Only repopulate if stocks have changed
    if(this.portfolioSize != this.portfolio.stocks.length){
      this.repopulate();
    }

    // Alwyas re price every stock
    this.portfolio.stocks.forEach(current => {
      $('#'+current.stock.name+'PortPrice').text(current.stock.price.toFixed(2));
      $('#'+current.stock.name+'PortTotal').text((current.quantity * current.stock.price).toFixed(2));
      $('#'+current.stock.name+'PortQuant').text(current.quantity);
    })
  }
}

},{}]},{},[10]);
