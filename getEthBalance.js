  let price;
        //Get token price on PancakeSwap v2 BSC
        async function getprice(){
            const options = {
                address: "0x4e15361fd6b4bb609fa63c81a2be19d873717870",
                chain: "eth",
              };
              const token = await Moralis.Web3API.token.getTokenPrice(options);
              console.log(token.usdPrice);
              
              console.log(token.usdPrice.toFixed(2))
             price=token.usdPrice.toFixed(2);
             const element = document.getElementById("eth-balance");
                element.innerHTML = token.usdPrice.toFixed(2);


        }

        getprice()


  //////////////

//   console.log(String(price));
// const element = document.getElementById("eth-balance");
// element.innerHTML = price;