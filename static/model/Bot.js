module.exports = class {
  constructor (ops) {
    this.name         = ops.name;
    this.description  = ops.description;
    this.costs        = ops.costs;
    this.behaviour    = ops.behaviour;
    this.level        = ops.level || 0;
  }

  action(market, portfolio, calendar) {
    if(this.level>0){
      this.behaviour(this, market, portfolio, calendar);
    }
  }
}
