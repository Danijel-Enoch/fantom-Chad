$(document).ready(async function() {
  //await onConnect();

  await drawCharts();

	let marketCap = await getMarketCap();
	$('#marketcap').text(`$ ${marketCap}`);
	countDownNextRebase();

  await (async () => {
    let holders = 0;
    let lastCount = -1;
    let page = 1;

    while (lastCount != holders) {
      lastCount = holders;
      try {
        holders = await getHolders(page);
      }catch(e){}
      page += 24;
      $("#holderscount").text(holders + "+");
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
$(document).on('click', '.logout', async  function(){
    localStorage.clear();
    $('.wallet-app-address').text('Connect Wallet')
    closeApp();
});

let apikey = "ckey_3c1c99f5734f453892b7c305725";
let wallet = "0x6e6d88411000898ca77c54c4b512b8b05a128d26";
let testWallet = "0x6e6d88411000898ca77c54c4b512b8b05a128d26";

let cliffContractAddress = "0xC7d8515DE74e6d04D9ca0EB09e98079135488dF4";

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

async function getMarketCap(result=0)
{
  const data = await request(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=fantom&order=market_cap_desc&per_page=1000&page=1&sparkline=false"
  );

  data.forEach((item) => {
    if (item.id == "fantom") {
      result = item.market_cap.toLocaleString();
    }
  });

  return result;
}

async function drawCharts() {
  const areaChart = document.getElementById("fccAreaChart");
  const holderChart = document.getElementById("fccHolderChart");
  if (!areaChart || !holderChart) return;
  const labels = [];

  //get Todays Date
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  //console.log(today);

  const date = new Date();
  date.setDate(date.getDate() - 7);
  const dateString = date.toISOString().split("T")[0];

  // get monthly price list
  const { data: [{ prices }] } = await request(
      "https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/250/USD/0xC7d8515DE74e6d04D9ca0EB09e98079135488dF4/?quote-currency=USD&format=JSON&from=" +
        dateString +
        "&to=" +
        today +
        "&page-size=100000&page-number=1&prices-at-asc=true&key=ckey_3c1c99f5734f453892b7c305725"
    );

  new Chart(
    areaChart, {
    type: "line",
    data: {
    datasets: [
      {
        label: "30 days Price Overview of Fantom",
        backgroundColor: "rgb(220,220,220)",
        borderColor: "rgb(63, 59, 59)",
        data: prices.map(e => {
          labels.push(e.date);
          return e.price
        }),
      },
    ],
    labels: labels,
  },
    options: {},
  });
  new Chart(
    holderChart, {
    type: "doughnut",
    data: {
      datasets: [],
      labels: [""]
    },
    options: {},
  });
}

async function countDownNextRebase()
{
	setInterval(function () {
		var d = new Date();
		var seconds = d.getMinutes() * 60 + d.getSeconds(); //convet 00:00 to seconds for easier caculation
		var fiveMin = 60 * next_rebase_min; //five minutes is 300 seconds!
		var timeleft = fiveMin - seconds % fiveMin; // let's say 01:30, then current seconds is 90, 90%300 = 90, then 300-90 = 210. That's the time left!
		var timeleft1 = fiveMin - seconds % fiveMin; // let's say 01:30, then current seconds is 90, 90%300 = 90, then 300-90 = 210. That's the time left!
		timeleft = parseInt(timeleft / 60);
		var count = timeleft.toString().length;
		
		if(parseInt(timeleft) == 0){
			setupConnected()
		}
		if(count == 1){
			var result =  '00 : 0' + parseInt(timeleft) + ':' + timeleft1 % 60; //formart seconds into 00:00 
		}
		else{
			var result =  '00 : ' + parseInt(timeleft) + ':' + timeleft1 % 60;
		}
		// document.getElementById('tiles').innerHTML = result;
		$('#tiles span').text(result)

	}, 500) //calling it every 0.5 second to do a count down
}


async function getUserTokenBalance(address)
{
	return parseFloat((await request(
    "https://api.ftmscan.com/api?module=account&action=balance&address="+address+"&apikey=7593P9NKG91CKFW2GA5PT68RZ61GVEC7H2"
  )).result).toFixed(9);
}
