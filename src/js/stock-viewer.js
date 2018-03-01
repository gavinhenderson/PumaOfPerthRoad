class StockViewer{
  constructor(market){
    this.market = market;
  }

  update(){
    $('#stock-viewer').empty();
    this.market.iterate((stock) => {
      var html = "<li>"+stock.name+" $"+stock.price.toFixed(2)+" "+stock.getDiff().toFixed(2)+"</li>";
      $('#stock-viewer').append(html);
    })
  }
}
