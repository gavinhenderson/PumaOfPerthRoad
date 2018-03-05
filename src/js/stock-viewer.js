class StockViewer{
  constructor(market){
    this.market = market;

    $('#stock-viewer').empty();
    //this.market.sortStocks();
    this.market.iterate((stock) => {
      var icon = "";
      if(stock.getDiff()>0){
        icon="green fas fa-chevron-up";
      }else{
        icon="red fas fa-chevron-down";
      }
      var html = `
        <tr>
          <td>`+stock.name+`</td>
          <td id="`+stock.name+`Price">$`+stock.price.toFixed(2)+`</td>
          <td id="`+stock.name+`Diff">`+stock.getDiff().toFixed(2)+`</td>
          <td><i id="`+stock.name+`Icon" class="`+icon+`"></i></td>
          <td><button onclick="buysell.select('`+stock.name+`')">Select</button></td>"
        </tr>`
      $('#stock-viewer').append(html);
    })
  }

  update(){
    this.market.iterate(stock => {
      var icon = "";
      if(stock.getDiff()>0){
        icon="<i class='green fas fa-chevron-up'></i>";
      }else{
        icon="<i class='red fas fa-chevron-down'></i>";
      }
      $('#'+stock.name+'Price').text("$"+stock.price.toFixed(2));
      $('#'+stock.name+'Diff').text(stock.getDiff().toFixed(2));
      $('#'+stock.name+'Icon').empty();
      $('#'+stock.name+'Icon').append(icon);
    })
  }
}
