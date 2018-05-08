module.exports = class {
  constructor( portfolio ){
    this.portfolio      = portfolio;
    this.portfolioSize  = 0;
    this.repopulate();
  }

  repopulate(){
    // Set cash value
    $('#cash-value').text(this.portfolio.cash.toFixed(2));

    // Empty the list and add headers
    var portfolioListDOM = $('#portfolio-list');
    portfolioListDOM.empty();

    if(this.portfolio.stocks.length != 0){
      portfolioListDOM.append(`
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Total</th>
          <th>Amount</th>
        </tr>
      `);
    }

    // Loop through owned stocks and add them to table.
    this.portfolio.stocks.forEach((current) => {
      var total = current.quantity * current.stock.price;
      portfolioListDOM.append(`
        <tr>
          <td>${ current.stock.name }</td>
          <td id="${ current.stock.name }PortPrice">${ current.stock.price.toFixed(2) }</td>
          <td id="${ current.stock.name }PortTotal">${ (current.quantity * current.stock.price).toFixed(2) }</td>
          <td><p class="no-new-line" id="${ current.stock.name }PortQuant">${ current.quantity }</p>
          <button id="portfolioselect${ current.stock.name }">Select</button></td>
        </td>
      `);
      $('#portfolioselect'+current.stock.name).click(()=>{
        $('#stockSelecter').val(current.stock.name);
      });
    });

    // Reset the size of the portoflio
    this.portfolioSize = this.portfolio.stocks.length;
  }

  update(){
    // Always reset cash value
    let cashValue = this.portfolio.cash;
    let stockValue = this.portfolio.value();
    let totalValue = (cashValue + stockValue);
    $('#cash-value').text(cashValue.toFixed(2));
    $('#stock-value').text(stockValue.toFixed(2));
    $('#total-value').text(totalValue.toFixed(2));

    // Only repopulate if stocks have changed
    if(this.portfolioSize != this.portfolio.stocks.length){
      this.repopulate();
    }

    // Alwyas re price every stock
    this.portfolio.stocks.forEach(current => {
      $('#'+current.stock.name+'PortPrice').text(current.stock.price.toFixed(2));
      $('#'+current.stock.name+'PortTotal').text((current.quantity * current.stock.price).toFixed(2));
      $('#'+current.stock.name+'PortQuant').text(current.quantity);
    })
  }
}
