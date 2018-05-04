module.exports = class {
  constructor( model ){
    this.model = model;
    this.size = 0;
    this.table = $('#bot-shop-table');
    this.update();
  }

  repopulate(){
    this.size = 0;
    this.table.empty();
    this.table.append(`
      <tr>
        <th>Bot</th>
        <th>Level</th>
        <th>Upgrade</th>
      </tr>
      `);
    this.model.bots.forEach(current => {
      this.size++;
      this.table.append(`
        <tr>
          <td>${ current.name }</td>
          <td id="level${ current.name }">${ current.level }</td>
          <td><button id="upgrade${ current.name }">Upgrade</button></td>
        </tr>
        `);
    });
  }

  update(){
    if(this.size != this.model.bots.length){
      this.repopulate();
    } else {
      this.model.bots.forEach(current => {
        $('#level'+current.name).text(current.level);
      });
    }
  }
}
