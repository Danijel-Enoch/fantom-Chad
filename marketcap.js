

var daniel;

axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false")
.then(response => {
    let cryptoArray=response.data;
    cryptoArray.forEach(element => {
        if(element.id==="fantom"){
           // console.log(element.id+"market value is this"+element.market_cap);
           // console.log(new Intl.NumberFormat().format(element.market_cap));
            var marketvalue=element.market_cap.toLocaleString()
           // daniel=element.market_cap.toLocaleString();
           // console.log(element.market_cap.toLocaleString())
          //  console.log(marketvalue);
            document.getElementById("marketcapValue").innerText=marketvalue;
        }
        //console.log(element);
    });
 // console.log(response.data[0]);
}).catch(console.log);

console.log(daniel)