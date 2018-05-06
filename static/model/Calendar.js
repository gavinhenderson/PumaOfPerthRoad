module.exports = class {
  constructor(){
    this.time = 0;
  }

  update(){
    this.time++;
  }

  getTime(){
    return this.time;
  }
}
