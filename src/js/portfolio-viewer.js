class PortfolioViewer{
  constructor(portfolio){
    this.portfolio = portfolio;
  }

  update(){
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
          <td>`+current.stock.price.toFixed(2)+`</td>
          <td>`+(current.quantity*current.stock.price).toFixed(2)+`</td>
          <td>`+current.quantity+`
          <button onclick="buysell.select('`+current.stock.name+`')">Select</button></td>
        </td>
      `

      //var html = '<li class="portfolio">'+current.stock.name+' '+current.quantity+' '+total.toFixed(2)+'</li>';
      portfolioListDOM.append(html);
    })
  }
}
