(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
$(document).ready(function() {
  const GameConsole     = require('./view/Console.js')();
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

},{"./view/Console.js":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
