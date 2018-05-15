(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){module.exports=class{constructor(ops){this.name=ops.name;this.description=ops.description;this.costs=ops.costs;this.behaviour=ops.behaviour;this.level=ops.level||0}
action(market,portfolio,calendar){if(this.level>0){this.behaviour(this,market,portfolio,calendar)}}}},{}],2:[function(require,module,exports){const Bot=require('./Bot.js');module.exports=class{constructor(market,portfolio,calendar){this.portfolio=portfolio.model;this.market=market.model;this.calendar=calendar.model;this.bots=[]}
setLevel(name,level){for(let i=0;i<this.bots.length;i++){if(this.bots[i].name==name){this.bots[i].level=level;return}}}
addBot(ops){this.bots.push(new Bot(ops))}
update(){this.bots.forEach(current=>{current.action(this.market,this.portfolio,this.calendar)})}
upgrade(bot){if(this.portfolio.cash>=bot.costs[bot.level]){this.portfolio.cash-=bot.costs[bot.level];bot.level ++}}
getSaveInfo(){let tempArr=[];this.bots.forEach(current=>{let tempObj={name:current.name,level:current.level}
tempArr.push(tempObj)});return tempArr}}},{"./Bot.js":1}],3:[function(require,module,exports){module.exports=class{constructor(model,loop,calendar){this.calendar=calendar
this.model=model;this.size=0;this.table=$('#bot-shop-table');this.update();$('#bot-shop-title').click(()=>{let desc=`The bot shop is a place where you can automate processes so that you have a chance of making money without having to do anything.`;require('./Help.js')("Bot Shop Help",desc,loop)})}
repopulate(){this.size=0;this.table.empty();this.table.append(`
      <tr>
        <th>Bot</th>
        <th>Level</th>
        <th>Cost</th>
        <th>Upgrade</th>
      </tr>
      `);this.model.bots.forEach(current=>{this.size++;this.table.append(`
        <tr>
          <td class="center">${ current.name }</td>
          <td class="center" id="level${ current.name }">${ current.level }</td>
          <td class="center">$<p class="no-new-line" id="cost${ current.name }">${ current.costs[current.level] }</p></td>
          <td class="center"><button id="upgrade${ current.name }">Upgrade</button></td>
        </tr>
        `);$('#upgrade'+current.name).click(()=>{this.model.upgrade(this.findBotByName(current.name))})})}
findBotByName(name){for(let i=0;i<this.model.bots.length;i++){if(this.model.bots[i].name==name){return this.model.bots[i]}}}
update(){if(this.calendar.day>5){$('#bot-shop-window').css('visibility',"visible")}
if(this.size!=this.model.bots.length){this.repopulate()}else{this.model.bots.forEach(current=>{$('#level'+current.name).text(current.level);$('#cost'+current.name).text(current.costs[current.level]);if(this.model.portfolio.cash>=current.costs[current.level]){$('#upgrade'+current.name).removeAttr('disabled')}else{$('#upgrade'+current.name).attr('disabled',!0)}})}}}},{"./Help.js":4}],4:[function(require,module,exports){module.exports=(title,description,loop)=>{loop.pause();let DialogWindow=`
    <div class="window on-top" id="help">
      <h1 class="window title">${ title }</h1>
      <p class="help">${ description }</p>
      <button class="center" id="resume">Resume</button>
    </div>`
$('body').append(DialogWindow);$('#resume').click(()=>{loop.pause();$('#help').remove()})}},{}],5:[function(require,module,exports){module.exports={name:"Auto-Buy",description:"This bot will automatically buy stocks when they are about to make a lot of money",costs:[100,200,500,3000],behaviour:function(bot,market,portfolio,calendar){const buyingCaps=[10,20,30,40,50];let currentCap=(portfolio.cash/100)*buyingCaps[bot.level];const momentumCaps=[0.1,0.2,0.3,0.4,0.5]
if(calendar.hour>5){console.log("bot sleeping");return}
market.iterate((current)=>{if(current.price<currentCap&&current.momentum>momentumCaps[bot.level]){let quant=Math.floor(currentCap/current.price)
currentCap-=current.price*quant;portfolio.buy(current,quant)}})}}},{}],6:[function(require,module,exports){module.exports={name:"Auto-Sell",description:"This bot will automatically sell stocks when they are crashing or when they are thriving",costs:[100,200,1000,3000],behaviour:function(bot,market,portfolio){const StockValue=portfolio.value();const SellCaps=[40,50,60,70];let SellCap=(StockValue/100)*SellCaps[bot.level];portfolio.stocks.forEach(current=>{if(current.stock.price<SellCap&&current.stock.momentum<0){let quant=Math.floor(SellCap/current.stock.price)
SellCap-=current.stock.price*quant;portfolio.sell(current.stock,quant)}})}}},{}],7:[function(require,module,exports){const View=require('./../View/BotShop.js');const Model=require('./../Model/BotShop.js');class BotShopController{constructor(Loop,Portfolio,Market,Calendar){this.Loop=Loop;this.Portfolio=Portfolio;this.Market=Market;this.Model=new Model(Market,Portfolio,Calendar);this.View=new View(this.Model,Loop,Calendar.model);this.Loop.addViewItem(this.View);this.Loop.addRepeating(()=>{this.Model.update()},3000)}
getSaveInfo(){return this.Model.getSaveInfo()}}
module.exports=(Loop,Portfolio,Market,Calendar,GameSave)=>{let controller=new BotShopController(Loop,Portfolio,Market,Calendar);controller.Model.addBot(require('./../bot-behaviour/auto-sell.js'));controller.Model.addBot(require('./../bot-behaviour/auto-buy.js'));if(GameSave!=undefined){if(GameSave.BotShop!=undefined){GameSave.BotShop.forEach(current=>{controller.Model.setLevel(current.name,current.level)})}}
return controller}},{"./../Model/BotShop.js":2,"./../View/BotShop.js":3,"./../bot-behaviour/auto-buy.js":5,"./../bot-behaviour/auto-sell.js":6}],8:[function(require,module,exports){const BrokerView=require('./../view/Broker.js')
class BrokerController{constructor(loop,market,portfolio,calendar){this.view=new BrokerView(market.getModel(),portfolio.getModel(),loop,calendar.model);loop.addViewItem(this.view)}
getView(){return this.view}}
module.exports=(loop,market,portfolio,calendar)=>{return new BrokerController(loop,market,portfolio,calendar)}},{"./../view/Broker.js":21}],9:[function(require,module,exports){const CalendarView=require('./../view/Calendar.js');const CalendarModel=require('./../model/Calendar.js');class CalendarController{constructor(Loop,Portfolio,GameConsole){this.model=new CalendarModel(Loop,Portfolio,GameConsole,this);this.view=new CalendarView(this.model,Loop);Loop.addViewItem(this.view);Loop.addRepeating(()=>{this.model.update()},100)}
getSaveInfo(){return this.model.getSaveInfo()}}
module.exports=(Loop,Portfolio,GameConsole,GameSave)=>{let calender=new CalendarController(Loop,Portfolio,GameConsole);if(GameSave!=undefined){if(GameSave.Calendar!=undefined){calender.model.loadTime(GameSave.Calendar)}}
return calender}},{"./../model/Calendar.js":15,"./../view/Calendar.js":22}],10:[function(require,module,exports){const Market=require('./../model/Market.js');const MarketViewer=require('./../view/Market.js');const Stock=require('./../model/Stock.js');class MarketController{constructor(model,loop){this.loop=loop;this.model=model;loop.addRepeating(()=>{this.model.update()},500);this.view=new MarketViewer(this.model,loop);loop.addViewItem(this.view)}
getModel(){return this.model}
getSaveInfo(){return this.model.getSaveInfo()}
setCalendar(calendar){this.view.setCalendar(calendar.model)}}
module.exports=(loop,marketSave)=>{let market=new Market();if(marketSave==undefined){market.addStock(new Stock({name:"ESNT",price:478,volatility:2}));market.addStock(new Stock({name:"OXIG",price:788,volatility:2}));market.addStock(new Stock({name:"ACA",price:141,volatility:2}));market.addStock(new Stock({name:"HWDN",price:501,volatility:2}));market.addStock(new Stock({name:"DRX",price:264,volatility:2}));market.addStock(new Stock({name:"MNDI",price:1911,volatility:2}));market.addStock(new Stock({name:"SRE",price:55,volatility:2}));market.addStock(new Stock({name:"RTO",price:272,volatility:2}));market.addStock(new Stock({name:"GYM",price:250,volatility:2}));market.addStock(new Stock({name:"RRS",price:5940,volatility:2}));market.addStock(new Stock({name:"MTC",price:21,volatility:2}));market.addStock(new Stock({name:"ARW",price:350,volatility:2}));market.addStock(new Stock({name:"IMI",price:1124,volatility:2}));market.addStock(new Stock({name:"SGC",price:129,volatility:2}));market.addStock(new Stock({name:"FFN",price:196,volatility:2}))}else{marketSave.Market.forEach(current=>{market.addStock(new Stock(current))})}
return new MarketController(market,loop)}},{"./../model/Market.js":17,"./../model/Stock.js":20,"./../view/Market.js":25}],11:[function(require,module,exports){const OddJobsView=require('./../view/OddJobs.js');const OddJobsModel=require('./../model/OddJobs.js');class OddJobsController{constructor(Loop,Portfolio,Calendar){this.model=new OddJobsModel(Portfolio.model);this.view=new OddJobsView(this.model,Calendar.model,Loop);Loop.addViewItem(this.view)}}
module.exports=(Loop,Portfolio,Calendar)=>{let controller=new OddJobsController(Loop,Portfolio,Calendar);return controller}},{"./../model/OddJobs.js":18,"./../view/OddJobs.js":26}],12:[function(require,module,exports){const PortfolioView=require('./../view/Portfolio.js');const Portfolio=require('./../model/Portfolio.js');class PortfolioController{constructor(loop,market,GameConsole){this.model=new Portfolio(150,market.getModel(),GameConsole);this.view=new PortfolioView(this.model,loop);loop.addViewItem(this.view)}
getView(){return this.view}
getModel(){return this.model}
getSaveInfo(){return this.model.getSaveInfo()}}
module.exports=(loop,market,GameConsole,GameSave)=>{let PortController=new PortfolioController(loop,market,GameConsole);if(GameSave!=undefined){if(GameSave.Portfolio!=undefined){PortController.model.cash=GameSave.Portfolio.cash;GameSave.Portfolio.stocks.forEach(current=>{let stock=market.getModel().getStock(current.stockName);PortController.model.load(stock,current.quantity)})}}
return PortController}},{"./../model/Portfolio.js":19,"./../view/Portfolio.js":27}],13:[function(require,module,exports){const WelcomeView=require('./../view/WelcomeWindow.js');module.exports=(Loop)=>{Loop.pause();let view=new WelcomeView(Loop);view.spawnWindow();return view}},{"./../view/WelcomeWindow.js":28}],14:[function(require,module,exports){$(document).ready(function(){let GameConsole=require('./view/Console.js')();let Loop=require('./model/Loop.js')();let WelcomeWindow=require('./controller/WelcomeWindow.js')(Loop);let GameSave=undefined
let Market=require('./controller/Market.js')(Loop,GameSave);let Portfolio=require('./controller/Portfolio.js')(Loop,Market,GameConsole,GameSave);let Calendar=require('./controller/Calendar.js')(Loop,Portfolio,GameConsole,GameSave);let OddJobs=require('./controller/OddJobs.js')(Loop,Portfolio,Calendar);let Broker=require('./controller/Broker.js')(Loop,Market,Portfolio,Calendar);let BotShop=require('./controller/BotShop.js')(Loop,Portfolio,Market,Calendar,GameSave);Market.setCalendar(Calendar)})},{"./controller/BotShop.js":7,"./controller/Broker.js":8,"./controller/Calendar.js":9,"./controller/Market.js":10,"./controller/OddJobs.js":11,"./controller/Portfolio.js":12,"./controller/WelcomeWindow.js":13,"./model/Loop.js":16,"./view/Console.js":23}],15:[function(require,module,exports){module.exports=class{constructor(Loop,Portfolio,GameConsole,controller){this.controller=controller;this.GameConsole=GameConsole;this.portfolio=Portfolio.model;this.loop=Loop;this.day=0;this.hour=0;this.minute=0;this.gameLost=!1;this.dayEndMessages=[{day:1,message:"You are now qualified to work in a call center"},{day:2,message:"You now have the stamina to be a paperboy"},{day:3,message:"You now have a van so can deliver milk."},{day:4,message:"Welcome to the big leagues, trade some stocks to make money"},{day:6,message:"Employ some of the clever bots to get an edge and make extra money"}]
this.dailyExpenditures=[{name:"Heating",description:"Make sure you dont freeze to death",reoccuring:1,daysLeft:1,cost:60,hidden:!1},{name:"Electricity",description:"Keep everyones phones charged",reoccuring:1,daysLeft:1,cost:60,hidden:!1},{name:'Buy Food',description:'Eat to live',reoccuring:3,daysLeft:3,cost:50,hidden:!1},{name:"Car Insurance",description:"Make sure your car is kept insured",reoccuring:8,daysLeft:8,cost:1000,hidden:!1},{name:"Mortgage",description:"Put a roof over your head",reoccuring:12,daysLeft:12,cost:3000,hidden:!1},{name:"Car Breakdown",description:"Your car wont start",reoccuring:14,daysLeft:14,cost:8000,hidden:!1}]}
loadTime(time){this.day=time.day;this.hour=time.hour;this.minute=time.minute}
update(){this.minute+=5;if((this.minute%60)==0&&this.minute!=0){this.minute=0;this.hour ++}
if((this.hour%8)==0&&this.hour!=0){this.hour=0;this.dayEnd();this.day ++;this.dayEndMessages.forEach(current=>{console.log(current.day+" = "+this.day)
if(current.day==this.day){this.GameConsole.message(current.message)}})}}
dayEnd(){console.timeEnd('day');console.time('day')
this.dailyExpenditures.forEach(current=>{current.daysLeft--;if(current.daysLeft==0){if(current.hidden){this.GameConsole.message(`You have been charged $${ current.cost } for ${ current.name }.`)}
this.portfolio.cash-=current.cost;current.daysLeft=current.reoccuring}});if(this.portfolio.cash<0){this.gameLost=!0}}
pause(){this.loop.pause()}
getDay(){return this.day}
getTime(){let postfix="AM"
let realHour=this.hour+9;if(realHour==12){postfix="PM"}
if(realHour>12){realHour-=12;postfix="PM"}
return realHour+":"+("0"+this.minute).slice(-2)+" "+postfix}
getSaveInfo(){let tempObj={day:this.day,hour:this.hour,minute:this.minute}
return tempObj}}},{}],16:[function(require,module,exports){class Loop{constructor(){this.paused=!1;this.views=[];this.repeating=[];this.waiting=[];setInterval(()=>{if(!this.paused){this.runViewUpdate()}},250);setInterval(()=>{if(!this.paused){this.runRepeating()}},100);setInterval(()=>{if(!this.paused){this.runWaiting()}},100)}
pause(){this.paused=!this.paused}
addViewItem(item){this.views.push(item)}
runViewUpdate(){this.views.forEach(view=>{view.update()})}
addRepeating(item,time){this.repeating.push({'item':item,'repeatTime':time,'timeSinceLast':0})}
runRepeating(){this.repeating.forEach(current=>{if(current.timeSinceLast>current.repeatTime){current.item();current.timeSinceLast=0}else{current.timeSinceLast+=100}})}
addWaiting(item,time){this.waiting.push({'item':item,'waitTime':time,'timeElapsed':0})}
runWaiting(){for(var i=0;i<this.waiting.length;i++){var current=this.waiting[i]
if(current.timeElapsed>current.waitTime){current.item();this.waiting.splice(i,1)}else{current.timeElapsed+=100}}}}
module.exports=()=>{return new Loop()}},{}],17:[function(require,module,exports){module.exports=class{constructor(){this.stocks=[]}
getStock(name){var found=null
this.iterate((stock)=>{if(stock.name==name){found=stock}});return found}
addStock(newStock){this.stocks.push(newStock)}
sortStocks(){this.stocks.sort((a,b)=>{if(a.price>b.price){return-1}
if(a.price<b.price){return 1}
return 0})}
update(){this.iterate(function(stock){stock.update()})}
iterate(cb){for(var i=0;i<this.stocks.length;i++){cb(this.stocks[i])}}
getSaveInfo(){let stockArr=[];this.iterate(current=>{stockArr.push(current.getSaveInfo())})
return stockArr}}},{}],18:[function(require,module,exports){module.exports=class{constructor(Portfolio){this.portfolio=Portfolio
this.working=!1;this.jobs=[{name:'Cleaner',payment:10,timeTaken:5,gameTime:"80mins",locked:0},{name:'Secretary',payment:25,timeTaken:7,gameTime:"112mins",locked:1},{name:'Personal Assistant',payment:20,timeTaken:2,gameTime:"30mins",locked:2},{name:'Trainee Trader',payment:25,timeTaken:2,gameTime:"30mins",locked:3}]}
work(job){if(!this.working){this.working=!0;setTimeout(()=>{this.working=!1;this.portfolio.cash+=job.payment},job.timeTaken*1000)}}}},{}],19:[function(require,module,exports){module.exports=class{constructor(cashValue,market,gameConsole){this.gameConsole=gameConsole;this.market=market;this.stocks=[];this.cash=cashValue}
load(addStock,quantity){this.stocks.push({'stock':addStock,'quantity':parseInt(quantity),'buyprice':addStock.price})}
buy(addStock,quantity){if(addStock.price*quantity>this.cash){console.message("You have insufficent funds to buy "+addStock.name);return}
var added=!1;this.stocks.forEach((stock)=>{if(stock.stock.name==addStock.name){this.cash-=addStock.price*quantity;stock.quantity+=parseInt(quantity);added=!0}})
if(!added){this.cash-=addStock.price*quantity;this.stocks.push({'stock':addStock,'quantity':parseInt(quantity),'buyprice':addStock.price})}}
value(){let value=0;this.stocks.forEach((stock)=>{value+=stock.stock.price*stock.quantity})
return value}
sell(stock,quantity){for(var i=0;i<this.stocks.length;i++){if(stock.name==this.stocks[i].stock.name){if(this.stocks[i].quantity-quantity>0){this.stocks[i].quantity-=quantity;this.cash+=stock.price*quantity;new Audio('./sounds/money.mp3').play()
return}else if(this.stocks[i].quantity-quantity==0){this.stocks.splice(i,1);this.cash+=stock.price*quantity;return}else{this.gameConsole.message("You don't have enough of "+stock.name+" to sell");return}}}
this.gameConsole.message("You don't have any "+stock.name)}
getSaveInfo(){let tempObj={}
tempObj.cash=this.cash;tempObj.stocks=[];this.stocks.forEach(current=>{let tempStock={};tempStock.quantity=current.quantity;tempStock.stockName=current.stock.name;tempObj.stocks.push(tempStock)});return tempObj}}},{}],20:[function(require,module,exports){module.exports=class{constructor(ops){this.name=ops.name;this.price=ops.price;this.momentum=ops.momentum||0;this.volatility=ops.volatility;this.history=ops.history||[]}
update(){var rand=Math.floor(Math.random()*21);rand-=10;rand=rand/10;this.momentum+=rand;if(this.momentum>2){this.momentum=2}
else if(this.momentum<-2){this.momentum=-2}
this.price+=this.momentum
if(this.price<0){this.price=0}
var jumpChance=Math.floor(Math.random()*1000)+1
if(jumpChance<this.volatility){var upOrDown=Math.floor(Math.random()*2);if(upOrDown==0){this.price+=(this.price/10)}else if(upOrDown=1){this.price-=(this.price/10)}}
if(this.price<0){this.price=0}
this.addHistory(this.price)}
addHistory(newValue){this.history.push(newValue);if(this.history.length>100){this.history.shift()}}
getDiff(){return this.price-this.history[0]}
getSaveInfo(){let tempObj={}
tempObj.name=this.name;tempObj.price=this.price;tempObj.momentum=this.momentum;tempObj.volatility=this.volatility;tempObj.history=this.history;return tempObj}}},{}],21:[function(require,module,exports){module.exports=class{constructor(market,portfolio,loop,calendar){this.calendar=calendar
this.market=market;this.listSize=0;this.portfolio=portfolio;$('#buyButton').click(()=>{this.buy()});$('#sellButton').click(()=>{this.sell()});$('#broker-title').click(()=>{let desc=`This is window allows you to buy and sell any number of stocks. You can only buy stocks that you have enough money for. Once you buy or sell the stock you will see it appear or disappear in your 'portfolio'`;require('./Help.js')("Buy/Sell Help",desc,loop)})}
update(){if(this.calendar.day>3){$('#broker-window').css('visibility','visible')}
if(this.listSize!=this.market.stocks.length){$('#stockSelecter').empty();this.market.iterate((stock)=>{this.listSize++;$('#stockSelecter').append(`<option>${ stock.name }</option>`)})}
this.updatePrices();this.updateButtons()}
updatePrices(){let stock=this.market.getStock($('#stockSelecter').val());$('#stockPrice').text(stock.price.toFixed(2));$('#displayQuantity').text($('#buysell-quantity').val());$('#tempTotal').text("= $"+(stock.price*$('#buysell-quantity').val()).toFixed(2))}
updateButtons(){let stock=this.market.getStock($('#stockSelecter').val());let sellable=!1;for(var i=0;i<this.portfolio.stocks.length;i++){if(stock.name==this.portfolio.stocks[i].stock.name){if(this.portfolio.stocks[i].quantity-$('#buysell-quantity').val()>=0){sellable=!0}}}
if($('#sellButton').prop('disabled')){if(sellable){$('#sellButton').removeAttr('disabled')}}else{if(!sellable){$('#sellButton').attr('disabled',!0)}}
let buyable=!1;if(stock.price*$('#buysell-quantity').val()<this.portfolio.cash){buyable=!0}
if($('#buyButton').prop('disabled')){if(buyable){$('#buyButton').removeAttr('disabled')}}else{if(!buyable){$('#buyButton').attr('disabled',!0)}}}
select(name){$('#stockSelecter').val(name);this.updateButtons()}
buy(){var stock=this.market.getStock($('#stockSelecter').val());var quantity=$('#buysell-quantity').val();this.portfolio.buy(stock,quantity)}
sell(){var stock=this.market.getStock($('#stockSelecter').val());var quantity=$('#buysell-quantity').val();this.portfolio.sell(stock,quantity)}}},{"./Help.js":24}],22:[function(require,module,exports){module.exports=class{constructor(calendar,loop){this.loop=loop;this.calendar=calendar;this.paused=!1;$('#pause-game').click(()=>{this.calendar.pause();this.paused=!this.paused;$('#pause-game').text(this.paused?"Resume":"Pause")});$('#reset-game').click(()=>{localStorage.clear();location.reload()});this.showingLength=0;this.repopulate();this.prevDay=0;$('#calendar-title').click(()=>{let desc=`The Calendar page tells you what time and day it is. The work day runs from 9AM-5PM. At the end of every day you must make certain payments and this tells you which payments are due when. It also lets you delete your saved data and pause the game`;require('./Help.js')("Calendar Help",desc,loop)})}
repopulate(){$('#daily-expenditures').empty();$('#daily-expenditures').append(`
      <tr>
        <th>Name</th>
        <th>Cost</th>
        <th>Days Left</th>
      </tr>
    `);this.showingLength=0;this.calendar.dailyExpenditures.forEach(current=>{if(!current.hidden){$('#daily-expenditures').append(`
          <tr>
            <td class="center">${ current.name }</td>
            <td class="center">$<p class="no-new-line" id="${ current.name }-cost">${ current.cost }</p></td>
            <td class="center" id="${ current.name }-daysLeft">${ current.daysLeft }</td>
          </tr>
        `);this.showingLength++}})}
dayEnd(){this.loop.pause();if(this.calendar.gameLost){GameEnd(this.calendar.day)}else{let floatingDiv=`
        <div class="window on-top" id="popup">
          <h1 class="window title">Day End - Summary</h1>
          <table class="window">`
let total=0;this.calendar.dailyExpenditures.forEach(current=>{if(current.daysLeft==current.reoccuring){floatingDiv+=`
          <tr>
            <td>${ current.name }: </td>
            <td>-$${ current.cost }</td>
          </tr>`
total+=current.cost}})
floatingDiv+=`
        <tr>
          <td>Total: </td>
          <td>-$${ total }</td>
        </tr>
        <tr><td></br></td></tr>
        <tr>
          <td>Cash Left: </td>
          <td>$${ this.calendar.portfolio.cash.toFixed(2) }</td>
        </table>
        <button id="remove-popup">Continue</button>
      </div>`
$('#wrapper').append(floatingDiv);$('#remove-popup').click(()=>{$('#popup').remove();this.loop.pause()})}}
update(){$('#day').text("Day "+this.calendar.getDay());$('#time').text(this.calendar.getTime())
this.repopulate();if(this.prevDay!=this.calendar.day){this.dayEnd();this.prevDay=this.calendar.day}}}},{"./Help.js":24}],23:[function(require,module,exports){class Console{constructor(){this.consoleDomElement=$('#console')}
message(message){var date=new Date();var newMessage=("0"+date.getHours()).slice(-2)+":"+("0"+date.getMinutes()).slice(-2)+" > "+message;this.consoleDomElement.prepend(`<p class="console">${ newMessage }</p>`)}
clear(){this.consoleDomElement.empty()}}
module.exports=()=>{let gameConsole=new Console();gameConsole.message("Welcome to Puma of Perth Road!");gameConsole.message("Keep an eye out on this console, you will recieve all your missions here");gameConsole.message("Click on the title of any window for 'Help'")
return gameConsole}},{}],24:[function(require,module,exports){arguments[4][4][0].apply(exports,arguments)},{"dup":4}],25:[function(require,module,exports){module.exports=class{constructor(market,loop,calendar){this.calendar=calendar
this.market=market;this.marketSize=0;this.hidden=!0;this.repopulate();$('#market-title').click(()=>{let desc=`The Stocks pane is a place where you can see all of the stock prices. It also lets you know if the stock is trending up or down right now. If you press 'select' it will then be the chosen stock in the buy/sell page.`;require('./Help.js')("Stocks Help",desc,loop)})}
repopulate(){$('#stock-viewer').empty();$('#stock-viewer').append(`
      <tr>
        <th>Stock</th>
        <th>Price</th>
        <th>History</th>
        <th></th>
        <th></th>
      </tr>
    `);this.market.iterate((stock)=>{let icon=stock.getDiff()>0?"green fas fa-chevron-up":"red fas fa-chevron-down";$('#stock-viewer').append(`
        <tr>
          <td>${ stock.name }</td>
          <td id="${ stock.name }Price">$${ stock.price.toFixed(2) }</td>
          <td id="${ stock.name }Diff">${ stock.getDiff().toFixed(2) }</td>
          <td><i id="${ stock.name }Icon" class="${ icon }"></i></td>
          <td><button id="buysellselect${ stock.name }">Select</button></td>"
        </tr>
        `);$('#buysellselect'+stock.name).click(()=>{$('#stockSelecter').val(stock.name)})})
this.marketSize=this.market.stocks.length}
setCalendar(calendar){this.calendar=calendar}
update(){if(this.calendar.day>3){$('#stock-viewer-window').css('visibility','visible')}
if(this.marketSize!=this.market.stocks.length){this.repopulate()}
this.market.iterate(stock=>{var icon=stock.getDiff()>0?"<i class='green fas fa-chevron-up'></i>":"<i class='red fas fa-chevron-down'></i>";$('#'+stock.name+'Price').text("$"+stock.price.toFixed(2));$('#'+stock.name+'Diff').text(stock.getDiff().toFixed(2));$('#'+stock.name+'Icon').empty();$('#'+stock.name+'Icon').append(icon)})}}},{"./Help.js":24}],26:[function(require,module,exports){module.exports=class{constructor(model,calendar,loop){this.calendar=calendar;this.model=model;this.buttons=[];this.repopulate();$('#odd-job-title').click(()=>{let desc=`Odd Jobs is a place for you to make a little bit of money and all you need is some time. Each job has a wage and an amount of time it takes to complete. If you chose to do the job you won't be able to do any other jobs while you complete the first one.`;require('./Help.js')("Odd Jobs Help",desc,loop)})}
repopulate(){this.model.jobs.forEach(current=>{$('#odd-jobs-table').append(`
        <tr>
          <td class="bottom-padding">${ current.name }</td>
          <td class = "center bottom-padding">$${ current.payment }</td>
          <td class = "center bottom-padding">${ current.gameTime }</td>
          <td class="bottom-padding"><button id="${ current.name.replace(/ /g, '-') }-work">Work</button></td>
        </tr>
      `);$(`#${ current.name.replace(/ /g, '-') }-work`).click(()=>{this.model.work(current)})
this.buttons.push($(`#${ current.name.replace(/ /g, '-') }-work`))})}
disableButtons(){this.buttons.forEach(current=>{current.prop("disabled",!0)})}
enableButtons(){this.buttons.forEach(current=>{current.prop("disabled",!1)})}
lockButtons(){this.model.jobs.forEach(current=>{if(current.locked>this.calendar.day){$(`#${ current.name.replace(/ /g, '-') }-work`).text('Locked');$(`#${ current.name.replace(/ /g, '-') }-work`).prop("disabled",!0)}else{$(`#${ current.name.replace(/ /g, '-') }-work`).text('Work')}})}
update(){if(this.model.working){this.disableButtons()}else{this.enableButtons();this.lockButtons()}}}},{"./Help.js":24}],27:[function(require,module,exports){module.exports=class{constructor(portfolio,loop){this.portfolio=portfolio;this.portfolioSize=0;this.repopulate();$('#portfolio-title').click(()=>{let desc=`In the porfolio page you will see all the stocks you own and how many. It is also here that you can see how much money you have. If you press select on a stock it will be the selected stock in the buy sell page`;require('./Help.js')("Portfolio Help",desc,loop)})}
repopulate(){$('#cash-value').text(this.portfolio.cash.toFixed(2));var portfolioListDOM=$('#portfolio-list');portfolioListDOM.empty();if(this.portfolio.stocks.length!=0){portfolioListDOM.append(`
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Total</th>
          <th>Amount</th>
        </tr>
      `)}
this.portfolio.stocks.forEach((current)=>{var total=current.quantity*current.stock.price;portfolioListDOM.append(`
        <tr>
          <td>${ current.stock.name }</td>
          <td id="${ current.stock.name }PortPrice">${ current.stock.price.toFixed(2) }</td>
          <td id="${ current.stock.name }PortTotal">${ (current.quantity * current.stock.price).toFixed(2) }</td>
          <td><p class="no-new-line" id="${ current.stock.name }PortQuant">${ current.quantity }</p>
          <button id="portfolioselect${ current.stock.name }">Select</button></td>
        </td>
      `);$('#portfolioselect'+current.stock.name).click(()=>{$('#stockSelecter').val(current.stock.name)})});this.portfolioSize=this.portfolio.stocks.length}
update(){let cashValue=this.portfolio.cash;let stockValue=this.portfolio.value();let totalValue=(cashValue+stockValue);$('#cash-value').text(cashValue.toFixed(2));$('#stock-value').text(stockValue.toFixed(2));$('#total-value').text(totalValue.toFixed(2));if(this.portfolioSize!=this.portfolio.stocks.length){this.repopulate()}
this.portfolio.stocks.forEach(current=>{$('#'+current.stock.name+'PortPrice').text(current.stock.price.toFixed(2));$('#'+current.stock.name+'PortTotal').text((current.quantity*current.stock.price).toFixed(2));$('#'+current.stock.name+'PortQuant').text(current.quantity)})}}},{"./Help.js":24}],28:[function(require,module,exports){module.exports=class{constructor(loop){this.loop=loop}
spawnWindow(){$('body').append(`
      <div id="welcome-window" style="width:500px; left: 10px; top:10px;" class="window on-top">
        <h1 class="window title">Welcome to Puma of Perth Road</h1>
        <p style="text-align: justify">Your task is to see how many days you last as an up and coming stock broker in the trading city of Dundee.</p>
        <p style="text-align: justify">If throughout the game you need any help simply click the title of a window and it will tell you what to do.</p>
        <h3 class="window subtitle">Odd Jobs</h3>
        <p style="text-align: justify; margin-top:5px;">You can take on odd jobs to make money to make ends meet. Each job will give you a certain amount of money and will take a certain amount of time. As time goes by you will be able to do more jobs.</p>
        <h3 class="window subtitle">Calendar</h3>
        <p style="text-align: justify; margin-top:5px;">Make sure you keep track of what day it is. Certain days you will owe money for things that you need to live. Every day you need enough CASH to be able to pay for these other wise its game over for you.</p>
        <h3 class="window subtitle">Portfolio</h3>
        <p style="text-align: justify; margin-top:5px;">This is where you will learn how much you are worth. When stocks appear this is where you will see which stocks you own and how much they are worth. Make sure you stay positive in the money.</p>
        <h3 class="window subtitle">Other</h3>
        <p style="text-align: justify; margin-top:5px;">As the game goes on you more windows will appear. You will be able to buy and sell stocks as well as buy and upgrade robots to do the trading for you. The rest is up to you to figure out. Good luck</p>
        <button id="close-welcome-window" style="font-size: 20px;">Start Game</button>
      </div>
    `);$('#close-welcome-window').click(()=>{this.loop.pause();$('#welcome-window').remove();let backgroundSound=new Audio("sounds/office.mp3");backgroundSound.loop=!0;backgroundSound.play()})}}},{}]},{},[14])
