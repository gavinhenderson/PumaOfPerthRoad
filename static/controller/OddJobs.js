const OddJobsView  = require('./../view/OddJobs.js');
const OddJobsModel = require('./../model/OddJobs.js');

class OddJobsController {
  constructor(Loop, Portfolio) {
    this.model  = new OddJobsModel( Portfolio.model );
    this.view   = new OddJobsView( this.model, Loop );
    Loop.addViewItem( this.view );
  }
}

module.exports = (Loop, Portfolio) => {
  let controller = new OddJobsController(Loop, Portfolio);

  return controller;
}
