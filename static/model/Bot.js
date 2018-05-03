module.exports = class {
  constructor (ops) {
    this.name         = ops.name;
    this.description  = ops.description;
    this.costs        = ops.cost;
    this.behaviour    = ops.behaviour;
    this.level        = 0;
  }

  action() {
    if(this.level>0){
      this.behaviour(this);
    }
  }

}
