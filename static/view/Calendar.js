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
    })
  }

  update(){
    $('#day').text("Day "+this.calendar.getDay());
    $('#time').text(this.calendar.getTime())
  }
}
