const CalendarView = require('./../view/Calendar.js');
const CalendarModel = require('./../model/Calendar.js');

class CalendarController {
  constructor(Loop){
    this.model = new CalendarModel(Loop);
    this.view = new CalendarView(this.model);
    Loop.addViewItem(this.view);
    Loop.addRepeating(()=>{ this.model.update() }, 100);
  }
}

module.exports = (Loop) => {
  let calender = new CalendarController(Loop);
  return calender;
}
