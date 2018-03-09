module.exports = class{
  constructor(){
    this.consoleDomElement = $('#console');
  }

  message(message){
    var date = new Date();
    var newMessage = date.getHours()+":"+date.getMinutes() + " > "+ message;
    var html = '<p class="console">'+newMessage+'</p>';
    this.consoleDomElement.prepend(html);
  }

  clear(){
    this.consoleDomElement.empty();
  }
}
