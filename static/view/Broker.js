module.exports = class{
  constructor(market, portfolio){
    this.market     = market;
    this.listSize   = 0;
    this.portfolio  = portfolio;

    $('#buyButton').click(() => {
      this.buy()
    });

    $('#sellButton').click(() => {
      this.sell();
    });
  }

  update(){
    // Only clear if new stocks
    if(this.listSize != this.market.stocks.length){
      // Clear stocks
      $('#stockSelecter').empty();

      // Loop through stocks
      this.market.iterate((stock)=>{
        this.listSize++;
        $('#stockSelecter').append(`<option>${ stock.name }</option>`);
      })
    }
    this.updatePrices();
    this.updateButtons();
  }

  updatePrices(){
    let stock = this.market.getStock($('#stockSelecter').val());
    $('#stockPrice').text(stock.price.toFixed(2));
    $('#displayQuantity').text($('#buysell-quantity').val());
    $('#tempTotal').text("= $"+(stock.price*$('#buysell-quantity').val()).toFixed(2));
  }

  updateButtons(){
    let stock = this.market.getStock($('#stockSelecter').val());

    let sellable = false;
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


    let buyable = false;
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
    $('#stockSelecter').val(name);
    this.updateButtons();
  }

  buy(){
    var stock = this.market.getStock($('#stockSelecter').val());
    var quantity = $('#buysell-quantity').val();
    this.portfolio.buy(stock, quantity);
  }

  sell(){
    var stock = this.market.getStock($('#stockSelecter').val());
    var quantity = $('#buysell-quantity').val();
    this.portfolio.sell(stock, quantity);
  }
}
