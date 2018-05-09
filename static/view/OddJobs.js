module.exports = class {
  constructor( model, loop ){
    this.model = model;
    this.buttons = [];
    this.repopulate();

    $('#odd-job-title').click(() => {
      let desc = `Odd Jobs is a place for you to make a little bit of money and all you need is some time. Each job has a wage and an amount of time it takes to complete. If you chose to do the job you won't be able to do any other jobs while you complete the first one.`;
      require('./Help.js')("Odd Jobs Help", desc, loop);
    });
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
