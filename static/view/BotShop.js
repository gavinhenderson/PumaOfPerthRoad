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
        <th>Cost</th>
        <th>Upgrade</th>
      </tr>
      `);
    this.model.bots.forEach(current => {
      this.size++;
      this.table.append(`
        <tr>
          <td class="center">${ current.name }</td>
          <td class="center" id="level${ current.name }">${ current.level }</td>
          <td class="center" id="cost${ current.name }">${ current.costs[current.level] }</td>
          <td class="center"><button id="upgrade${ current.name }">Upgrade</button></td>
        </tr>
        `);

      $('#upgrade'+current.name).click(() => {
        this.model.upgrade(this.findBotByName(current.name));
      })
    });
  }

  findBotByName(name){
    for(let i=0;i<this.model.bots.length; i++){
      if(this.model.bots[i].name == name){
        return this.model.bots[i];
      }
    }
  }

  update(){
    if(this.size != this.model.bots.length){
      this.repopulate();
    } else {
      this.model.bots.forEach(current => {
        $('#level'+current.name).text(current.level);
        $('#cost'+current.name).text(current.costs[current.level]);

        // Disable Button if you dont have enough money
        if(this.model.portfolio.cash >= current.costs[current.level]){
          $('#upgrade'+current.name).removeAttr('disabled');
        } else {
          $('#upgrade'+current.name).attr('disabled',true);
        }
      });
    }
  }
}
