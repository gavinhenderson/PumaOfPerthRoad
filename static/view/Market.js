module.exports = class{
  constructor(market){
    this.market     = market;
    this.marketSize = 0;
    this.repopulate()
  }

  repopulate(){
    // Clear the viewer
    $('#stock-viewer').empty();

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

  update(){
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
