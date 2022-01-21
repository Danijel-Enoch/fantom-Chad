Moralis.start({
    serverUrl,
    appId
});
//var  user = Moralis.User.current();  0xa61f8c3da4d744826e371c431683adef2c3f9670


var wallet = user.get('ethAddress');
var testWallet = "0x6e6d88411000898ca77c54c4b512b8b05a128d26";
var cliffContractAddress = "0xC7d8515DE74e6d04D9ca0EB09e98079135488dF4";
let URIarry = [];

async function Da() {
    const options = {
        address: wallet
    };
    const fantomNFt = await Moralis.Web3API.account.getNFTs(options);
        const jsonNFT=JSON.stringify(fantomNFt);
        //console.log(jsonNFT)
    if (fantomNFt.result.length>0) {
        nftArray = fantomNFt.result;
        nftArray.forEach((element,index) => {
            console.log(element.token_uri)
            URIarry.push(element.token_uri)
            /////
                axios.get(element.token_uri).then(({ data: {name, image }})=>{
                    let clonedMenu = document.querySelector('#nftcard').content.cloneNode(true).children[0];
                    clonedMenu.id = 'menu-mobile'+index;
                    clonedMenu.querySelector('#title').innerText = name;
                    clonedMenu.querySelector('#image').src = image;
                  // document.body.appendChild(clonedMenu);
                    document.getElementById("nft-collection").appendChild(clonedMenu);
                }).catch(console.log)
            //
            //console.log(index);
        
        document.getElementById("menu-mobile"+index)

        });
    }else if(fantomNFt.result.length===null){
        document.getElementById("nftcard").innerHTML="You do not have any NFT";
    }

   // console.log(wallet);

}
 

        const getMetaData=()=>{
            axios.get().then(response=>{
                console.log(response)
            })
        }

Da()