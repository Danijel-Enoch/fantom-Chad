//Moralis.start({ serverUrl, appId });
//var  user = Moralis.User.current();
const axios = require('axios')

var apikey="ckey_3c1c99f5734f453892b7c305725";
var cliffContractAddress="0xdac17f958d2ee523a2206206994597c13d831ec7";

module.exports = async (req, resp) => {
    return await axios.get('https://api.covalenthq.com/v1/1/tokens/0x4e15361fd6b4bb609fa63c81a2be19d873717870/token_holders/?quote-currency=USD&format=JSON&page-size=1000000&key=ckey_3c1c99f5734f453892b7c305725')
    .then((resp1)=>{
        console.log(resp1.data.data.items);
        var rawData= resp1.data;
        var arrayItems=rawData.data.items;
        var lenOfArray= arrayItems.length;
        return lenOfArray;
    }).catch(console.log)
}
