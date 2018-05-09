const OddJobsView  = require('./../view/OddJobs.js');
const OddJobsModel = require('./../model/OddJobs.js');

class OddJobsController {
  constructor(Loop, Portfolio, Calendar) {
    this.model  = new OddJobsModel( Portfolio.model );
    this.view   = new OddJobsView( this.model, Calendar.model, Loop );
    Loop.addViewItem( this.view );
  }
}

module.exports = (Loop, Portfolio, Calendar) => {
  let controller = new OddJobsController(Loop, Portfolio, Calendar);

  return controller;
}
