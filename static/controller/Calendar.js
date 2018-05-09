const CalendarView = require('./../view/Calendar.js');
const CalendarModel = require('./../model/Calendar.js');

class CalendarController {
  constructor(Loop, Portfolio, GameConsole){
    this.model = new CalendarModel(Loop, Portfolio, GameConsole, this);
    this.view = new CalendarView(this.model, Loop);
    Loop.addViewItem(this.view);
    Loop.addRepeating(()=>{ this.model.update() }, 100);
  }

  getSaveInfo(){
    return this.model.getSaveInfo();
  }
}

module.exports = (Loop, Portfolio, GameConsole, GameSave) => {
  let calender = new CalendarController(Loop, Portfolio, GameConsole);

  if(GameSave != undefined){
    if(GameSave.Calendar != undefined){
      calender.model.loadTime(GameSave.Calendar);
    }
  }

  return calender;
}
