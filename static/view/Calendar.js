module.exports = class {
  constructor(calendar){
    this.calendar = calendar;
    this.paused = false;

    $('#pause-game').click(() => {
      this.calendar.pause();
      this.paused = !this.paused;

      $('#pause-game').text(this.paused ? "Resume" : "Pause");
    });

    $('#reset-game').click(() => {
      localStorage.clear();
      location.reload();
    });

    this.showingLength = 0;
    this.repopulate();
  }

  repopulate(){
    $('#daily-expenditures').empty();
    $('#daily-expenditures').append(`
      <tr>
        <th>Name</th>
        <th>Cost</th>
        <th>Days Left</th>
      </tr>
    `);

    this.showingLength = 0;

    this.calendar.dailyExpenditures.forEach(current => {
      if(!current.hidden){
        $('#daily-expenditures').append(`
          <tr>
            <td class="center">${ current.name }</td>
            <td class="center">$<p class="no-new-line" id="${ current.name }-cost">${ current.cost }</p></td>
            <td class="center" id="${ current.name }-daysLeft">${ current.daysLeft }</td>
          </tr>
        `);
        this.showingLength++;
      }
    })
  }

  update(){
    $('#day').text("Day "+this.calendar.getDay());
    $('#time').text(this.calendar.getTime())
    this.repopulate();
  }
}
