module.exports = class {
  constructor(calendar){
    this.calendar = calendar;
  }

  update(){
    console.log(this.calendar.getTime());
  }
}
