module.exports = class {
  constructor(Loop){
    this.loop     = Loop;
    this.day      = 0;
    this.hour     = 0;
    this.minute   = 0;
  }

  loadTime(time){
    this.day = time.day;
    this.hour = time.hour;
    this.minute = time.minute;
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
