module.exports = (title, description, loop) => {
  loop.pause();

  let DialogWindow = `
    <div class="window on-top" id="help">
      <h1 class="window title">${ title }</h1>
      <p class="description help">${ description }</p>
      <button class="center" id="resume">Resume</button>
    </div>`

  $('body').append(DialogWindow);

  $('#resume').click(() => {
    loop.pause();
    $('#help').remove();
  });

}
