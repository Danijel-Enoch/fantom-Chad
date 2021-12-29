const serverUrl = "https://gkhkhetunpll.usemoralis.com:2053/server";
const appId = "SfAsVLLbYHL7YlRex9flXKXowIP2igx3qO8rKpRX";
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Puffy Inu" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        console.log(Moralis.user.Address);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
async function loginWalletConnect() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ provider: "walletconnect"})
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        console.log(Moralis.user.Address);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

document.getElementById("btn-connect").onclick = login;
document.getElementById("btn-walletconnect").onclick = loginWalletConnect ;

let user = Moralis.User.current();
if (user) {
  const element = document.getElementById("btn-popup");
            element.innerHTML = "Wallet Connected";
}