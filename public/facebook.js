let Player = {};
let day = 0;
let loginButton = ""

function SetDetails(){
  FB.login((response) => {
    if(response.status == "connected"){
      FB.api('/me', (response) => {
        console.log(response);
        Player.name = response.name;
        Player.id   = response.id;
        console.log(Player);
        GameEnd(null)
      })
    }
  })
}

function GameEnd(givenDay){
  if(givenDay != null){
    day = givenDay;
  }

  let floatingDiv = `
  <div class="window on-top">
  <h1 class="window title">YOU LOST</h1>
  <p> You made it day ${ day } </p>`

  if(Player.name == undefined){

    floatingDiv += `<p>Sign in to submit your highscore</p>`
    floatingDiv += `<p><img style="width:200px" src="facebook.png" onclick="SetDetails(${givenDay})"></p>`
    floatingDiv += `<button id="game-lost" class="center">Reset</button></div>`
    $('#wrapper').append(floatingDiv);

  } else {

    floatingDiv += `
    <table id="leaderboard-table">
      <tr>
        <th></th>
        <th>User</th>
        <th>Score</th>
      </tr>
    </table>`

    floatingDiv += `<button id="game-lost-leaderboard" class="center">Reset</button></div>`
    $('#wrapper').append(floatingDiv);

    $.post("leaderboard/newScore",
    {
      name: Player.name,
      id: Player.id,
      score: day
    },
    function(data, status){
      data.forEach(current => {
        $('#leaderboard-table').append(`
          <tr>
            <td><img class="profile-pic" src="https://graph.facebook.com/${ current.id }/picture"/></td>
            <td>${ current.name }</td>
            <td>${ current.score }</td>
          </tr>
        `)
      })
    });

  }


  $('#game-lost').click(() => {
    localStorage.clear();
    location.reload();
  });
  $('#game-lost-leaderboard').click(() => {
    localStorage.clear();
    location.reload();
  });

}

window.fbAsyncInit = function() {
  console.log("test")

  FB.init({
    appId      : '714517088910202',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });


  FB.getLoginStatus(function(response) {
    if(response.status == "connected"){
      FB.api('/me', (response) => {
        console.log(response);
        Player.name = response.name;
        Player.id   = response.id;
        console.log(Player);
      })
    }
  });
};

// Load the SDK asynchronously
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "https://connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
//$('#login-button').css('visibility', 'hidden !important');
}(document, 'script', 'facebook-jssdk'));
