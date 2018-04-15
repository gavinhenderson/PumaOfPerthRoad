module.exports = class{
  constructor(){
    this.saveItems = [];
  }

  doesExist(){
    return localStorage.getItem('saved');
  }

  addItem(newItem){
    this.saveItems.push(newItem);
  }

  load(){
    this.saveItems.forEach(current => {
      current.load();
    })
  }

  save(){
    this.saveItems.forEach(current => {
      current.save();
    })
    localStorage.setItem('saved',true);
  }

  restart(){
    localStorage.clear();
    location.reload();
  }
}
