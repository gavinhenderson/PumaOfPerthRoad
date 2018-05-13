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

    $('#calendar-title').click(() => {
      let desc = `The Calendar page tells you what time and day it is. The work day runs from 9AM-5PM. At the end of every day you must make certain payments and this tells you which payments are due when. It also lets you delete your saved data and pause the game`;
      require('./Help.js')("Calendar Help", desc, loop);
    });
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

    if(this.calendar.gameLost){
      GameEnd(this.calendar.day)
    } else {

      let floatingDiv = `
        <div class="window on-top" id="popup">
          <h1 class="window title">Day End - Summary</h1>
          <table class="window">`

      let total = 0;
      this.calendar.dailyExpenditures.forEach(current => {
        if(current.daysLeft == current.reoccuring){
          floatingDiv += `
          <tr>
            <td>${ current.name }: </td>
            <td>-$${ current.cost }</td>
          </tr>`
          total += current.cost;
        }
      })

      floatingDiv += `
        <tr>
          <td>Total: </td>
          <td>-$${ total }</td>
        </tr>
        <tr><td></br></td></tr>
        <tr>
          <td>Cash Left: </td>
          <td>$${ this.calendar.portfolio.cash.toFixed(2) }</td>
        </table>
        <button id="remove-popup">Continue</button>
      </div>`

      $('#wrapper').append(floatingDiv);

      $('#remove-popup').click(() => {
        $('#popup').remove();
        this.loop.pause();
      });
    }
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
