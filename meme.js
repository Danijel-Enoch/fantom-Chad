Moralis.start({ serverUrl, appId });
//var  user = Moralis.User.current();


 var apikey="NK9R49A2S5RQ55BA4SXWC3AZ2ZRWCH5IF4";
    var wallet=user.get('ethAddress');
  Moralis.initPlugins();
  var covalent=Moralis.Plugins;
  console.log(Moralis.Plugins);
  
  //var rawform=JSON.parse(covalent);
  









        // request('GET','https://api-rinkeby.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x15f0ca26781c3852f8166ed2ebce5d18265cceb7&address='+wallet+'&tag=latest&apikey='+apikey)
        // .then((resp1)=>{
        //     var rawData= JSON.parse(resp1.target.responseText);
        //     console.log(resp1.target.responseText);
        //     const element = document.getElementById("Puffy-balance");
        //     element.innerHTML = rawData.result;
            
        // })
        //     .catch()

        // function request(method,url){
        //     return new Promise (function (resolve, reject){
        //         var xhr=new XMLHttpRequest();
        //         xhr.open(method,url);
        //         xhr.onload=resolve;
        //         xhr.onerror=reject;
        //         xhr.send();
        //     });
        // }



