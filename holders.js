Moralis.start({ serverUrl, appId });
//var  user = Moralis.User.current();


 var apikey="ckey_3c1c99f5734f453892b7c305725";
 var cliffContractAddress="0xdac17f958d2ee523a2206206994597c13d831ec7";

        request('GET','https://api.covalenthq.com/v1/1/tokens/0x4e15361fd6b4bb609fa63c81a2be19d873717870/token_holders/?quote-currency=USD&format=JSON&page-size=1000000&key=ckey_3c1c99f5734f453892b7c305725')
        .then((resp1)=>{
            var rawData= JSON.parse(resp1.target.responseText);
         //console.log(resp1.target.responseText);
            //console.log("dfjkg");
            var arrayItems=rawData.data.items;
            var lenOfArray= arrayItems.length;
               // console.log(lenOfArray+'daniel; is trying')
                    //console.log(cliff.balance+'cliff balance');
                    const element = document.getElementById("holders-count");
                    element.innerHTML = lenOfArray;
            
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



