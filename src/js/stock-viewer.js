class StockViewer{
  constructor(market){
    this.market = market;
  }

  update(){
    $('#stock-viewer').empty();
    this.market.sortStocks();
    this.market.iterate((stock) => {
      var html = "<li><p class='align-left'>"+stock.name+" $"+stock.price.toFixed(2)+" </p><p class='align-right'>"+stock.getDiff().toFixed(2)+"</p></li>";
      html += "<div style='clear: both;'></div>"
      $('#stock-viewer').append(html);
    })
  }
}
