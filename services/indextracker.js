const fetch = require("node-fetch");
var admin = require("firebase-admin");
var serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://breadcrumbs-c382c-default-rtdb.firebaseio.com",
});

const getUpdate = async (index) => {
  fetch(
    "https://api.twelvedata.com/time_series?symbol=" +
      index +
      "&interval=1day&outputsize=12&apikey=34c0a53336434fe6af4ce3616e79d591"
  )
    .then((response) => response.json())
    .then((data) => {
      var indexRef = admin.database().ref("index-data/" + index);
      var priceChange = data.values[0].close - data.values[1].close;
      var percentChange = priceChange / data.values[1].close;
      indexRef.once("value", (snapshot) => {
        indexRef.update({
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

const indexList = ["IXIC", "SPX", "DJI", "DJT", "NDX", "GSPC", "SOX", "DOW"];

const sendUpdate = async () => {
  while (true) {
    for (var i = 0; i < indexList.length; i++) {
      await getUpdate(indexList[i]);
    }
    console.log("aaa");
    await sleep(62000);
  }
};

sendUpdate();
