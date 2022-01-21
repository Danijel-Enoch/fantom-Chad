
const labels = [
];
const priceArray=[];

//get Todays Date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
//console.log(today);

var date = new Date();
date.setDate(date.getDate() - 7);
var dateString = date.toISOString().split('T')[0];
//console.log(dateString);

//send api reques from last year september to today

axios.get("https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/250/USD/0xC7d8515DE74e6d04D9ca0EB09e98079135488dF4/?quote-currency=USD&format=JSON&from=" + dateString + "&to=" + today + "&page-size=100000&page-number=1&prices-at-asc=true&key=ckey_3c1c99f5734f453892b7c305725")
  .then(response => {
    let cryptoArray = response.data.data[0].prices;
    cryptoArray.forEach(element => {
      //console.log(element.price);
      priceArray.push(element.price)
     // console.log(element.date);
      labels.push(element.date);
    });
    //console.log( cryptoArray );
    //console.log(cryptoArray.prices[0].date);
    //console.log(cryptoArray.prices[0].price);

  }).catch(console.log);
//get price array
//get date Array

// console.log(labels);
// console.log(priceArray);



const data = {
  labels: labels,
  datasets: [{
    label: '30 days Price Overview of Fantom',
    backgroundColor: 'rgb(220,220,220)',
    borderColor: 'rgb(63, 59, 59)',
    data: priceArray,
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};



const myChart = new Chart(
  document.getElementById('myAreaChart'),
  config
)