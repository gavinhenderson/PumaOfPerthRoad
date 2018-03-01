class BuySellInterface{
  constructor(market){
    this.market = market;
    this.listSize = 0;
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

  buy(){
    console.log("So you want to buy "+$('#stockSelecter').val());
  }

  sell(){
    console.log("So you want to sell "+$('#stockSelecter').val());
  }
}
