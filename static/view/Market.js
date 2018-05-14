module.exports = class{
  constructor(market, loop, calendar){
    this.calendar   = calendar
    this.market     = market;
    this.marketSize = 0;
    this.hidden     = true;
    this.repopulate();

    $('#market-title').click(() => {
      let desc = `The Stocks pane is a place where you can see all of the stock prices. It also lets you know if the stock is trending up or down right now. If you press 'select' it will then be the chosen stock in the buy/sell page.`;
      require('./Help.js')("Stocks Help", desc, loop);
    });
  }

  repopulate(){
    // Clear the viewer
    $('#stock-viewer').empty();

    $('#stock-viewer').append(`
      <tr>
        <th>Stock</th>
        <th>Price</th>
        <th>History</th>
        <th></th>
        <th></th>
      </tr>
    `);

    // Loop through all the stocks
    this.market.iterate((stock) => {
      // Set icon to up or down
      let icon = stock.getDiff() > 0 ? "green fas fa-chevron-up" : "red fas fa-chevron-down";

      // Add each stock to the list
      $('#stock-viewer').append(`
        <tr>
          <td>${ stock.name }</td>
          <td id="${ stock.name }Price">$${ stock.price.toFixed(2) }</td>
          <td id="${ stock.name }Diff">${ stock.getDiff().toFixed(2) }</td>
          <td><i id="${ stock.name }Icon" class="${ icon }"></i></td>
          <td><button id="buysellselect${ stock.name }">Select</button></td>"
        </tr>
        `);
      $('#buysellselect'+stock.name).click(() => { $('#stockSelecter').val(stock.name); });
    })

    // Set the stock length
    this.marketSize = this.market.stocks.length;
  }

  setCalendar(calendar){
    this.calendar = calendar;
  }

  update(){
    if(this.calendar.day > 3){
      $('#stock-viewer-window').css('visibility', 'visible');
    }

    // Only update if the stocks have changed
    if(this.marketSize != this.market.stocks.length){ this.repopulate() }

    // Update the price of each
    this.market.iterate(stock => {
      var icon = stock.getDiff()>0 ? "<i class='green fas fa-chevron-up'></i>" : "<i class='red fas fa-chevron-down'></i>";
      $('#'+stock.name+'Price').text("$"+stock.price.toFixed(2));
      $('#'+stock.name+'Diff').text(stock.getDiff().toFixed(2));
      $('#'+stock.name+'Icon').empty();
      $('#'+stock.name+'Icon').append(icon);
    })
  }
}
