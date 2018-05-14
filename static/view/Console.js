class Console{
  constructor(){
    this.consoleDomElement = $('#console');
  }

  message(message){
    var date = new Date();
    var newMessage = ("0" + date.getHours()).slice(-2)+":"+("0" + date.getMinutes()).slice(-2) + " > "+ message;
    this.consoleDomElement.prepend(`<p class="console">${ newMessage }</p>`);
  }

  clear(){
    this.consoleDomElement.empty();
  }
}

module.exports = () => {
  let gameConsole = new Console();
  gameConsole.message("Welcome to Puma of Perth Road!");
  gameConsole.message("Keep an eye out on this console, you will recieve all your missions here");
  gameConsole.message("Click on the title of any window for 'Help'")
  return gameConsole;
}
