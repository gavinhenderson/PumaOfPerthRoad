class PortfolioViewer{
  constructor(portfolio){
    this.portfolio = portfolio;
  }

  update(){
    $('#cash-value').text(this.portfolio.cash.toFixed(2));

    var portfolioListDOM = $('#portfolio-list');
    portfolioListDOM.empty();

    this.portfolio.stocks.forEach((current) => {
      var total = current.quantity*current.stock.price;
      var html = '<li class="portfolio">'+current.stock.name+' '+current.quantity+' '+total.toFixed(2)+'</li>';
      portfolioListDOM.append(html);
    })
  }
}
