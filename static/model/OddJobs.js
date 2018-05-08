module.exports = class {
  constructor ( Portfolio ){
    this.portfolio = Portfolio
    this.working = false;
    this.jobs = [{
      name:       'Cleaning',
      payment:    10,
      timeTaken:  10, // Time in seconds
      timeLeft:   0,
    },
    {
      name:       'Call Center',
      payment:    25,
      timeTaken:  15,
      timeLeft:   0
    },
    {
      name:       'Paperboy',
      payment:    8,
      timeTaken:  2,
      timeLeft:   0
    },
    {
      name:       'Milkman',
      payment:    15,
      timeTaken:  11,
      timeLeft:   0
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
