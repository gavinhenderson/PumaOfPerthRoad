class StockViewer{
  constructor(market){
    this.market = market;
  }

  update(){
    $('#stock-viewer').empty();
    this.market.sortStocks();
    this.market.iterate((stock) => {
      var icon = "";
      if(stock.getDiff()>0){
        icon="<i class='green fas fa-chevron-up'></i>";
      }else{
        icon="<i class='red fas fa-chevron-down'></i>";
      }
      var html = `
        <tr>
          <td><a href="#" onclick="buysell.select('`+stock.name+`')">`+stock.name+`</a></td>
          <td>$`+stock.price.toFixed(2)+`</td>
          <td>`+stock.getDiff().toFixed(2)+`</td>
          <td>`+icon+`</td>
        </tr>`

      //var html = "<li><p class='align-left'>"+stock.name+" $"+stock.price.toFixed(2)+" </p><p class='align-right'>"+stock.getDiff().toFixed(2)+"</p></li>";
      //html += "<div style='clear: both;'></div>"
      $('#stock-viewer').append(html);
    })
  }
}
