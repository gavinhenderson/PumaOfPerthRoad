const CalendarView = require('./../view/Calendar.js');
const CalendarModel = require('./../model/Calendar.js');

class CalendarController {
  constructor(Loop){
    this.model = new CalendarModel(Loop);
    this.view = new CalendarView(this.model);
    Loop.addViewItem(this.view);
    Loop.addRepeating(()=>{ this.model.update() }, 100);
  }

  getSaveInfo(){
    return this.model.getSaveInfo();
  }
}

module.exports = (Loop, GameSave) => {
  let calender = new CalendarController(Loop);

  if(GameSave != undefined){
    if(GameSave.Calendar != undefined){
      calender.model.loadTime(GameSave.Calendar);
    }
  }

  return calender;
}
