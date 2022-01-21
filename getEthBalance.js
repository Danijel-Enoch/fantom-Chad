  let price;
        //Get token price on PancakeSwap v2 BSC
        async function getprice(){
            const options = {
                address: "0xC7d8515DE74e6d04D9ca0EB09e98079135488dF4",
                chain: "ftm",
              };
              const token = await Moralis.Web3API.token.getTokenPrice(options);
              //console.log(token.usdPrice);
              
             // console.log(token.usdPrice.toFixed(2))
             price=token.usdPrice.toFixed(2);
             const element = document.getElementById("eth-balance");
                element.innerHTML = token.usdPrice.toFixed(2);


        }

        getprice()


  //////////////

//   console.log(String(price));
// const element = document.getElementById("eth-balance");
// element.innerHTML = price;