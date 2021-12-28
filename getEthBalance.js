var apikey="NK9R49A2S5RQ55BA4SXWC3AZ2ZRWCH5IF4";
        var wallet="0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";

        request('GET','https://api-rinkeby.etherscan.io/api?module=stats&action=ethprice&apikey='+apikey)
        .then((resp1)=>{
            var rawData= JSON.parse(resp1.target.responseText);
            console.log(rawData.result.ethusd);
            const element = document.getElementById("eth-balance");
                element.innerHTML = rawData.result.ethusd;
        })
            .catch()

        function request(method,url){
            return new Promise (function (resolve, reject){
                var xhr=new XMLHttpRequest();
                xhr.open(method,url);
                xhr.onload=resolve;
                xhr.onerror=reject;
                xhr.send();
            });
        }
const element = document.getElementById("eth-balance");
element.innerHTML = rawData.result.ethusd;