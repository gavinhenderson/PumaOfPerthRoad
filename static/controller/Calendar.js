const CalendarView = require('./../view/Calendar.js');
const CalendarModel = require('./../model/Calendar.js');

class CalendarController {
  constructor(Loop, Portfolio){
    this.model = new CalendarModel(Loop, Portfolio);
    this.view = new CalendarView(this.model);
    Loop.addViewItem(this.view);
    Loop.addRepeating(()=>{ this.model.update() }, 100);
  }

  getSaveInfo(){
    return this.model.getSaveInfo();
  }
}

module.exports = (Loop, Portfolio, GameSave) => {
  let calender = new CalendarController(Loop, Portfolio);

  if(GameSave != undefined){
    if(GameSave.Calendar != undefined){
      calender.model.loadTime(GameSave.Calendar);
    }
  }

  return calender;
}
