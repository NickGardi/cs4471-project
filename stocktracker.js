const fetch = require("node-fetch");
var admin = require("firebase-admin");
var serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://breadcrumbs-c382c-default-rtdb.firebaseio.com",
});

const getUpdate = async (stock) => {
  fetch(
    "https://api.twelvedata.com/time_series?symbol=" +
      stock +
      "&interval=1day&outputsize=12&apikey=e475431af1274bae8c6bdca57d37c196"
  )
    .then((response) => response.json())
    .then((data) => {
      var stockRef = admin.database().ref("stock-data/" + stock);
      var priceChange = data.values[0].close - data.values[1].close;
      var percentChange = priceChange / data.values[1].close;
      stockRef.once("value", (snapshot) => {
        stockRef.update({
          price: data.values[0].close,
          change: priceChange,
          "percent-change": percentChange,
        });
      });
    });
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const stockList = [
  "IBM",
  "AAPL",
  "GOOGL",
  "AMZN",
  "TSLA",
  "FB",
  "NFLX",
  "SPOT",
];

const sendUpdate = async () => {
  while (true) {
    for (var i = 0; i < stockList.length; i++) {
      await getUpdate(stockList[i]);
    }
    console.log("aaa");
    await sleep(62000);
  }
};

sendUpdate();
