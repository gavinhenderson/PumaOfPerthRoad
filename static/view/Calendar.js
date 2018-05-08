module.exports = class {
  constructor(calendar, loop){
    this.loop = loop;
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
    this.prevDay = 0;
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
    });
  }

  dayEnd() {
    this.loop.pause();

    let floatingDiv = `
      <div class="floating window" id="popup">
        <h1 class="floating">Day End - Summary</h1>
        <table class="floating">`

    let total = 0;
    this.calendar.dailyExpenditures.forEach(current => {
      if(current.daysLeft == current.reoccuring){
        floatingDiv += `
        <tr>
          <td>${ current.name }</td>
          <td>${ current.cost }</td>
        </tr>`
        total += current.cost;
      }
    })

    floatingDiv += `
      <tr>
        <td>Total</td>
        <td>${ total }</td>
      </tr>
      </table>
      <button id="remove-popup">Continue</button>
    </div>`

    $('#wrapper').append(floatingDiv);

    $('#remove-popup').click(() => {
      $('#popup').remove();
      this.loop.pause();
    })
  }

  update(){
    $('#day').text("Day "+this.calendar.getDay());
    $('#time').text(this.calendar.getTime())
    this.repopulate();

    if(this.prevDay != this.calendar.day){
      this.dayEnd();
      this.prevDay = this.calendar.day;
    }
  }
}
