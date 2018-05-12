const WelcomeView = require('./../view/WelcomeWindow.js');

module.exports = (Loop) => {
  Loop.pause();
  let view = new WelcomeView(Loop);
  view.spawnWindow();
  return view;
}
