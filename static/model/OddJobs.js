module.exports = class {
  constructor ( Portfolio ){
    this.portfolio = Portfolio
    this.working = false;
    this.jobs = [{
      name:       'Cleaning',
      payment:    10,
      timeTaken:  5, // Time in seconds
      locked:     0
    },
    {
      name:       'Call Center',
      payment:    25,
      timeTaken:  7,
      locked:     1
    },
    {
      name:       'Paperboy',
      payment:    20,
      timeTaken:  4,
      locked:     2
    },
    {
      name:       'Milkman',
      payment:    25,
      timeTaken:  2,
      locked:     3
    }];
  }

  work (job) {
    if(!this.working){
      this.working = true;
      setTimeout(() => {
        this.working = false;
        this.portfolio.cash += job.payment;
      }, job.timeTaken * 1000);
    }
  }
}
