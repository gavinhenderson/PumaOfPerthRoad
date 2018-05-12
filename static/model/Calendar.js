module.exports = class {
  constructor(Loop, Portfolio, GameConsole, controller){
    this.controller  = controller;
    this.GameConsole = GameConsole;
    this.portfolio   = Portfolio.model;
    this.loop        = Loop;
    this.day         = 0;
    this.hour        = 0;
    this.minute      = 0;
    this.gameLost    = false;
    this.dayEndMessages = [
      {
        day: 1, // The start of this day
        message: "You are now qualified to work in a call center"
      },
      {
        day: 2,
        message: "You now have the stamina to be a paperboy"
      },
      {
        day: 3,
        message: "You now have a van so can deliver milk."
      },
      {
        day: 4,
        message: "Welcome to the big leagues, trade some stocks to make money"
      },
      {
        day: 6,
        message: "Employ some of the clever bots to get an edge and make extra money"
      }
    ]
    this.dailyExpenditures = [
    {
      name:         "Heating",
      description:  "Make sure you dont freeze to death",
      reoccuring:   1,
      daysLeft:     1,
      cost:         60,
      hidden:       false
    },
    {
      name:         "Electricity",
      description:  "Keep everyones phones charged",
      reoccuring:   1,
      daysLeft:     1,
      cost:         60,
      hidden:       false
    },
    {
      name:         'Buy Food',
      description:  'Eat to live',
      reoccuring:   3,
      daysLeft:     3,
      cost:         50,
      hidden:       false
    },
    {
      name:         "Car Insurance",
      description:  "Make sure your car is kept insured",
      reoccuring:   8, // Time in days
      daysLeft:     8, // Time in days
      cost:         1000,
      hidden:       false
    },
    {
      name:         "Mortgage",
      description:  "Put a roof over your head",
      reoccuring:   12,
      daysLeft:     12,
      cost:         3000,
      hidden:       false
    },
    {
      name:         "Car Breakdown",
      description:  "Your car wont start",
      reoccuring:   14,
      daysLeft:     14,
      cost:         8000,
      hidden:       false
    }];
  }

  loadTime(time){
    this.day      = time.day;
    this.hour     = time.hour;
    this.minute   = time.minute;
  }

  update(){
    this.minute += 5;

    if((this.minute % 60) == 0 && this.minute != 0){
      this.minute = 0;
      this.hour ++;
    }

    if((this.hour % 8) == 0 && this.hour != 0){
      this.hour = 0;
      this.dayEnd();
      this.day ++;
      this.dayEndMessages.forEach(current => {
        if(current.day == this.day){
          this.GameConsole.message(current.message);
        }
      });
    }
  }

  dayEnd(){
    this.dailyExpenditures.forEach(current => {
      current.daysLeft--;
      if(current.daysLeft == 0){
        if(current.hidden){
          this.GameConsole.message(`You have been charged $${ current.cost } for ${ current.name }.`);
        }
        this.portfolio.cash -= current.cost;
        current.daysLeft = current.reoccuring;
      }
    });



    if(this.portfolio.cash < 0) {
      this.gameLost = true;
    }
  }

  pause(){
    this.loop.pause();
  }

  getDay(){
    return this.day;
  }

  getTime(){
    let postfix   = "AM"
    let realHour  = this.hour + 9;
    if(realHour == 12){ postfix = "PM"; }
    if(realHour > 12){
      realHour -= 12;
      postfix = "PM"
    }
    return realHour + ":" + ("0" + this.minute).slice(-2) + " " + postfix;
  }

  getSaveInfo(){
    let tempObj = {
      day: this.day,
      hour: this.hour,
      minute: this.minute
    }
    return tempObj
  }
}
