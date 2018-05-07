module.exports = class {
  constructor(calendar){
    this.calendar = calendar;
  }

  update(){
    $('#day').text("Day "+this.calendar.getDay());
    $('#time').text(this.calendar.getTime())
  }
}
