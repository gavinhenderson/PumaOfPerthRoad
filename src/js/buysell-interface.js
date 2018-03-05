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
    this.updatePrices();
    this.updateButtons();
  }

  updatePrices(){
    var stock = market.getStock($('#stockSelecter').val());
    $('#stockPrice').text(stock.price.toFixed(2));
    $('#displayQuantity').text($('#buysell-quantity').val());
    $('#tempTotal').text("= $"+(stock.price*$('#buysell-quantity').val()).toFixed(2));
  }

  updateButtons(){
    var stock = market.getStock($('#stockSelecter').val());

    var sellable = false;
    for(var i=0;i<this.portfolio.stocks.length;i++){
      if(stock.name==this.portfolio.stocks[i].stock.name){
        if(this.portfolio.stocks[i].quantity-$('#buysell-quantity').val()>=0){
          sellable = true;
        }
      }
    }

    if($('#sellButton').prop('disabled')){
      if(sellable){ $('#sellButton').removeAttr('disabled'); }
    }else{
      if(!sellable){ $('#sellButton').attr('disabled',true); }
    }


    var buyable = false;
    if(stock.price*$('#buysell-quantity').val()<this.portfolio.cash){
      buyable=true;
    }
    if($('#buyButton').prop('disabled')){
      if(buyable){ $('#buyButton').removeAttr('disabled'); }
    }else{
      if(!buyable){ $('#buyButton').attr('disabled',true); }
    }
  }

  select(name){
    console.log(name)
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
