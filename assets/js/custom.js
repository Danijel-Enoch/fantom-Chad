$(document).ready(async function() {
  //await onConnect();
  setInterval(async (marketCap, holders) => {
    marketCap = await getMarketCap();
    $("#marketcap").text(`$${marketCap}`);
  }, 1500);
  
  await (async () => {
    let holders = 0;
    let lastCount = -1;
    let page = 1;

    while (lastCount != holders) {
      lastCount = holders;
      holders = await getHolders(page);
      page += 24;
      $("#holderscount").text(holders);
    }
  })();
});

async function setupConnected(first=null){
  let chainid = await getchainId();
  
	if(chainid == network_id){
		if(localStorage.getItem(ADDRESS) != null && localStorage.getItem(ADDRESS).length > 0){
			web3.eth.defaultAccount = localStorage.getItem(ADDRESS)
			$('.connectToNetwork').remove();
	    	$(".connectWallet").html(
          '<button class="btn btn-lg bg-chad btn-block text-center connected logout"><i class="ti-credit-card mr-1"></i> ' +
            shortText(localStorage.getItem(ADDRESS)) +
            "</button>"
        );
   			$('.wallet-app-address').text(shortText(localStorage.getItem(ADDRESS)))

			let user_balance = await getUserTokenBalance(localStorage.getItem(ADDRESS));
			$('#user_balance').text(user_balance);
		}
	}
	else{
		localStorage.clear()
		closeApp();
		if(first !== true ){
			toastr.error('Connect To Fantom  Opera !');
		}
	}

}

$(document).on('click', '.connectToNetwork', async  function(){
    localStorage.clear()
	onConnect()
});

$(document).on("click", ".logout", async function () {
  localStorage.clear();
  $(".wallet-app-address").text("Connect Wallet");
  closeApp();
});

async function onConnect(){
	try {
		const Web3Modal = window.Web3Modal.default;
		const WalletConnectProvider = window.WalletConnectProvider.default;
	
		const providerOptions = {
		  walletconnect: {
			package: WalletConnectProvider,
			options: {
			  infuraId: "d85fda7b424b4212ba72f828f48fbbe1",
			},
		  },
		};
		let web3Modal, provider;
	
		web3Modal = new Web3Modal({
		  providerOptions,
		  cacheProvider: false,
		  disableInjectedProvider: false,
		});	
	
		provider = await web3Modal.connect();
		let localWeb3 = new Web3(provider);
    let connect = await localWeb3.eth.getAccounts();
    
		if(connect.length){
	
			localStorage.setItem(ADDRESS, connect[0])
			localStorage.setItem(LIST_ADDRESS, JSON.stringify(connect))
			setupConnected()
	
			provider.on("accountsChanged", (accounts) => {
				localStorage.setItem(ADDRESS, accounts[0])
				localStorage.setItem(LIST_ADDRESS, JSON.stringify(connect))
				setupConnected()
			});
			
			provider.on("chainChanged", (chainId) => {
				console.log(chainId);
				localStorage.setItem(ADDRESS, accounts[0])
				localStorage.setItem(LIST_ADDRESS, JSON.stringify(connect))
				setupConnected()
			});
		}
	} catch (e) {
		console.log("Could not get a wallet connection", e);
		return;
	}
}

function request(url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = (resp) => {
      resolve(JSON.parse(resp.target.responseText));
    };
    xhr.onerror = reject;
    xhr.send();
  });
}

async function getchainId()
{
	let chainId = await web3.eth.getChainId();
	return 250;
}

function shortText(str){
    return str.substr(0,5)+"...."+str.substr(-5);
}


function closeApp()
{
	$('#user_balance').text('0');
	$('.connected').remove();
	$(".connectWallet").html(
    '<button class="btn btn-lg bg-chad btn-block text-center ml-2 connectToNetwork"><i class="ti-wallet mr-1"></i> Connect Wallet</button>'
  );
}

async function getHolders(page) {
  const { data: { items } } = await request(
    "https://api.covalenthq.com/v1/250/tokens/0xC7d8515DE74e6d04D9ca0EB09e98079135488dF4/token_holders/?quote-currency=USD&format=JSON&page-size="+page+"&key=ckey_3c1c99f5734f453892b7c305725"
    );

  return items.length;
}

async function getUSDPrice() {
  // get monthly price list
  const {
    data: [{ prices }],
  } = await request(
    "https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/250/USD/0xC7d8515DE74e6d04D9ca0EB09e98079135488dF4/?quote-currency=USD&format=JSON&key=ckey_3c1c99f5734f453892b7c305725"
    );
  return prices[0].price;
}

async function getTokenSupply() {
  const { result } = await request(
    "https://api.ftmscan.com/api?module=stats&action=tokensupply&contractaddress=0xC7d8515DE74e6d04D9ca0EB09e98079135488dF4&apikey=7593P9NKG91CKFW2GA5PT68RZ61GVEC7H2"
  );

  return parseInt(result) / 10**18;
}

async function getMarketCap()
{
  /** @type {number} */
  const supply = await getTokenSupply();
  const price = parseFloat(await getUSDPrice()).toFixed(6);

  $("#token_price").text(`$${price}`);
  $("#circulating_supply").text((supply * 1).toLocaleString());

  return ((supply - 100000000) * price).toLocaleString();
}

async function getUserTokenBalance(address)
{
	return parseFloat((await request(
    "https://api.ftmscan.com/api?module=account&action=balance&address="+address+"&apikey=7593P9NKG91CKFW2GA5PT68RZ61GVEC7H2"
  )).result).toFixed(9);
}
