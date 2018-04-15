module.exports = class{
  constructor(market, buysell){
    this.buysell = buysell;
    this.market = market;
    this.marketSize = 0;
    this.repopulate()
  }

  repopulate(){
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
          <td><button id="buysellselect`+stock.name+`">Select</button></td>"
        </tr>`
      $('#stock-viewer').append(html);
      $('#buysellselect'+stock.name).click(() => { this.buysell.select(stock.name) });
    })
    this.marketSize = this.market.stocks.length;
  }

  update(){
    if(this.marketSize != this.market.stocks.length){ repopulate() }

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