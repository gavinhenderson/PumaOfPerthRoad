module.exports = class {
  constructor(Loop, Portfolio){
    this.portfolio  = Portfolio.model;
    this.loop       = Loop;
    this.day        = 0;
    this.hour       = 0;
    this.minute     = 0;
    this.dailyExpenditures = [{
      name:         "Mortgage",
      description:  "Gotta keep make sure you keep your house",
      reoccuring:   5, // Time in days
      daysLeft:     5, // Time in days
      cost:         5000,
      hidden:       false
    },
    {
      name:         "Heating",
      description:  "Make sure you dont freeze to death",
      reoccuring:   1,
      daysLeft:     1,
      cost:         300,
      hidden:       false
    },
    {
      name:         "Electricity",
      description:  "Keep everyones phones charged",
      reoccuring:   1,
      daysLeft:     1,
      cost:         300,
      hidden:       true
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
      this.day ++;
      this.dayEnd();
    }
  }

  dayEnd(){
    this.dailyExpenditures.forEach(current => {
      current.daysLeft--;
      if(current.daysLeft == 0){
        //console.log("Day end")
        this.portfolio.cash -= current.cost;
        current.daysLeft = current.reoccuring;
      }
    });
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
