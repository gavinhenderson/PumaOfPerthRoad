class PortfolioViewer{
  constructor(portfolio){
    this.portfolio = portfolio;
    this.portfolioSize = 0;
    this.repopulate();
  }

  repopulate(){
    $('#cash-value').text(this.portfolio.cash.toFixed(2));

    var portfolioListDOM = $('#portfolio-list');
    portfolioListDOM.empty();

    var html = `
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Total</th>
        <th>Amount</th>
      </tr>
    `

    portfolioListDOM.append(html);

    this.portfolio.stocks.forEach((current) => {
      var total = current.quantity*current.stock.price;

      var html = `
        <tr>
          <td>`+current.stock.name+`</td>
          <td id="`+current.stock.name+`PortPrice">`+current.stock.price.toFixed(2)+`</td>
          <td id="`+current.stock.name+`PortTotal">`+(current.quantity*current.stock.price).toFixed(2)+`</td>
          <td><p class="no-new-line" id="`+current.stock.name+`PortQuant">`+current.quantity+`</p>
          <button onclick="buysell.select('`+current.stock.name+`')">Select</button></td>
        </td>
      `
      portfolioListDOM.append(html);
    })
    this.portfolioSize = this.portfolio.stocks.length;
  }

  update(){
    $('#cash-value').text(this.portfolio.cash.toFixed(2));
    if(this.portfolioSize != this.portfolio.stocks.length){ this.repopulate(); }
    this.portfolio.stocks.forEach(current => {
      $('#'+current.stock.name+'PortPrice').text(current.stock.price.toFixed(2));
      $('#'+current.stock.name+'PortTotal').text((current.quantity*current.stock.price).toFixed(2));
      $('#'+current.stock.name+'PortQuant').text(current.quantity);
    })
  }
}
