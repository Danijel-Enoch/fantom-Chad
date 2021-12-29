Moralis.start({ serverUrl, appId });
//var  user = Moralis.User.current();


 var apikey="ckey_3c1c99f5734f453892b7c305725";
    var wallet=user.get('ethAddress');
    var testWallet="0x6e6d88411000898ca77c54c4b512b8b05a128d26";
    
    var cliffContractAddress="0x1B9BAF2A3EdeA91eE431f02d449a1044d5726669";

  









        request('GET','https://api.covalenthq.com/v1/1/address/'+wallet+'/balances_v2/?key='+apikey)
        .then((resp1)=>{
            var rawData= JSON.parse(resp1.target.responseText);
            //console.log(resp1.target.responseText);
            var arrayItems=rawData.data.items;
            for (let i = 0; i < arrayItems.length; i++) {
                console.log('daniel; is trying')
                if(rawData.data.items[i].contract_ticker_symbol=="CLIFF"){
                    const cliff=rawData.data.items[i];
                    //console.log(cliff.balance+'cliff balance');
                    const element = document.getElementById("Puffy-balance");
                    element.innerHTML = cliff.balance;
                }
                
            }
            //console.log(rawData.data);
            // const element = document.getElementById("Puffy-balance");
            // element.innerHTML = cliff.balance;
            
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



