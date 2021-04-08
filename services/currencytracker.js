const fetch = require("node-fetch");
var admin = require("firebase-admin");
var serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://breadcrumbs-c382c-default-rtdb.firebaseio.com",
});

const getUpdate = async (currency) => {
  fetch(
    "https://api.twelvedata.com/exchange_rate?symbol=CAD/" +
      currency +
      "&apikey=d078c58fb6d74dea9ffd9191aab15c22"
  )
    .then((response) => response.json())
    .then((data) => {
      var currencyRef = admin.database().ref("currency-data/" + currency);
      currencyRef.once("value", (snapshot) => {
        currencyRef.update({
          rate: data.rate,
        });
      });
    });
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const currencyList = ["USD", "JPY", "AUD", "EUR", "GBP", "INR", "MXN", "CNY"];

const sendUpdate = async () => {
  while (true) {
    for (var i = 0; i < currencyList.length; i++) {
      await getUpdate(currencyList[i]);
    }
    console.log("aaa");
    await sleep(62000);
  }
};

sendUpdate();
