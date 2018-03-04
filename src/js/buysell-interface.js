class BuySellInterface{
  constructor(market, portfolio){
    this.market = market;
    this.listSize = 0;
    this.portfolio = portfolio;
  }

  update(){
    if(this.listSize != this.market.stocks.length){
      $('#stockSelecter').empty();
      this.market.iterate((stock)=>{
        this.listSize++;
        var html = "<option>"+stock.name+"</option>";
        $('#stockSelecter').append(html);
      })
    }
  }

  select(name){
    console.log(name);
    $('#stockSelecter').val(name);
  }

  buy(){
    var stock = market.getStock($('#stockSelecter').val());
    var quantity = $('#buysell-quantity').val();
    portfolio.buy(stock, quantity);
  }

  sell(){
    var stock = market.getStock($('#stockSelecter').val());
    var quantity = $('#buysell-quantity').val();
    portfolio.sell(stock, quantity);
  }
}
