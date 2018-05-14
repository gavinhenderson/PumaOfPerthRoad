module.exports = class {
  constructor( loop ) {
    this.loop = loop;
  }

  spawnWindow(){
    $('body').append(`
      <div id="welcome-window" style="width:500px; left: 10px; top:10px;" class="window on-top">
        <h1 class="window title">Welcome to Puma of Perth Road</h1>
        <p style="text-align: justify">Your task is to see how many days you last as an up and coming stock broker in the trading city of Dundee.</p>
        <p style="text-align: justify">If throughout the game you need any help simply click the title of a window and it will tell you what to do.</p>
        <h3 class="window subtitle">Odd Jobs</h3>
        <p style="text-align: justify; margin-top:5px;">You can take on odd jobs to make money to make ends meet. Each job will give you a certain amount of money and will take a certain amount of time. As time goes by you will be able to do more jobs.</p>
        <h3 class="window subtitle">Calendar</h3>
        <p style="text-align: justify; margin-top:5px;">Make sure you keep track of what day it is. Certain days you will owe money for things that you need to live. Every day you need enough CASH to be able to pay for these other wise its game over for you.</p>
        <h3 class="window subtitle">Portfolio</h3>
        <p style="text-align: justify; margin-top:5px;">This is where you will learn how much you are worth. When stocks appear this is where you will see which stocks you own and how much they are worth. Make sure you stay positive in the money.</p>
        <h3 class="window subtitle">Other</h3>
        <p style="text-align: justify; margin-top:5px;">As the game goes on you more windows will appear. You will be able to buy and sell stocks as well as buy and upgrade robots to do the trading for you. The rest is up to you to figure out. Good luck</p>
        <button id="close-welcome-window" style="font-size: 20px;">Start Game</button>
      </div>
    `);

    $('#close-welcome-window').click(() => {
      this.loop.pause();
      $('#welcome-window').remove();
    })
  }
}
