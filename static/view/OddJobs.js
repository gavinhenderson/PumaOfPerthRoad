module.exports = class {
  constructor( model ){
    this.model = model;
    this.buttons = [];
    this.repopulate();
  }

  repopulate(){
    this.model.jobs.forEach(current => {
      $('#odd-jobs-table').append(`
        <tr>
          <td>${ current.name }</td>
          <td>${ current.payment }</td>
          <td>${ current.timeTaken }</td>
          <td><button id="${ current.name.replace(/ /g, '-') }-work">Work</button></td>
        </tr>
      `);

      $(`#${ current.name.replace(/ /g, '-') }-work`).click(() => {
        this.model.work(current);
      })

      this.buttons.push( $(`#${ current.name.replace(/ /g, '-') }-work`) );
    })
  }

  disableButtons(){
    this.buttons.forEach(current => {
      current.prop("disabled",true);
    })
  }

  enableButtons(){
    this.buttons.forEach(current => {
      current.prop("disabled",false);
    })
  }

  update(){
    //console.log(this.model.working)
    if(this.model.working){
      this.disableButtons();
    } else {
      this.enableButtons();
    }
  }
}
