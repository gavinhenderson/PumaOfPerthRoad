console.message = function(message){
  var date = new Date();
  var newMessage = date.getHours()+":"+date.getMinutes() + " > "+ message;
  var html = '<p class="console">'+newMessage+'</p>';
  $('#console').prepend(html);
}

console.clear = function(){
  $('#console').empty();
}
