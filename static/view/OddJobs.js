module.exports = class {
  constructor( model, calendar, loop ){
    this.calendar = calendar;
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
          <td class="bottom-padding">${ current.name }</td>
          <td class = "center bottom-padding">$${ current.payment }</td>
          <td class = "center bottom-padding">${ current.gameTime }</td>
          <td class="bottom-padding"><button id="${ current.name.replace(/ /g, '-') }-work">Work</button></td>
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

  lockButtons(){
    this.model.jobs.forEach(current => {
      if(current.locked > this.calendar.day) {
        $(`#${ current.name.replace(/ /g, '-') }-work`).text('Locked');
        $(`#${ current.name.replace(/ /g, '-') }-work`).prop("disabled",true);
      } else {
        $(`#${ current.name.replace(/ /g, '-') }-work`).text('Work');
      }
    })
  }

  update(){
    if(this.model.working){
      this.disableButtons();
    } else {
      this.enableButtons();
      this.lockButtons();
    }
  }
}
