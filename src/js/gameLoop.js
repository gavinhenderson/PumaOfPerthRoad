class GameLoop{

  constructor(timeInterval){
    this.updateList = [];
    setInterval(() => {
      for(var i=0;i<this.updateList.length;i++){
        this.updateList[i].update();
      }
    },timeInterval)
  }

  addItem(item){
    this.updateList.push(item);
  }

}
