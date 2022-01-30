const serverUrl = "https://1rwfep58uoos.usemoralis.com:2053/server";
const appId = "8r6otXdm3zWSl8ga7zNK4fEg8VzihNhwYC0A9qnp";
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Fantom Chad",chainId: 56})
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        console.log(Moralis.user.Address);
        alert("You are Logged In");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
async function loginWalletConnect() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ provider: "walletconnect",chainId: 56})
      .then(function (user) {
        console.log("logged in user:", user);
        //console.log(user.get("ethAddress"));
        //console.log(Moralis.user.Address);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  alert("You are Logged Out");
}

document.getElementById("btn-connect").onclick = login;
document.getElementById("btn-walletconnect").onclick = loginWalletConnect ;
document.getElementById("btn-logout").onclick=logOut;

let user = Moralis.User.current();
let useradd=user.get("ethAddress").toString();
let firstpart=[];
let secondpart=[];
for (let i = 0; i < useradd.length; i++) {
   //el = useradd[i];
   if(i<=6){
     firstpart.push(useradd[i]);
   }
   if(i>35 && i<=42){
    secondpart.push(useradd[i]);
   }
  
}
firstpart.push(".....")
firstpart.push(secondpart.join(""));
//console.log(firstpart.join(""));
//console.log(secondpart);

if (user) {
  const element = document.getElementById("btn-popup");
            element.innerHTML =firstpart.join("");
}