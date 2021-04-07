import React, { Component } from "react";
import firebase from "./firebase";
import "./tables.css";

const stockList = [
  "AAPL",
  "AMZN",
  "FB",
  "GOOGL",
  "IBM",
  "NFLX",
  "SPOT",
  "TSLA",
];

class Stocks extends Component {
  state = {
    isSubscribed: true,
    stockData: [],
  };

  componentDidMount() {
    var dataList = [];
    var stockRef = firebase.database().ref("stock-data");
    stockRef.once("value", (snapshot) => {
      for (let i = 0; i < stockList.length; i++) {
        dataList.push({
          symbol: stockList[i],
          price: snapshot.val()[stockList[i]].price,
          change: snapshot.val()[stockList[i]].change,
          percent: snapshot.val()[stockList[i]]["percent-change"],
        });
      }
      this.setState({
        stockData: dataList,
      });
    });
  }

  renderTableBody() {
    return this.state.stockData.map((stock, index) => {
      const { symbol, price, change, percent } = stock;
      return (
        <tr>
          <td>{symbol}</td>
          <td>{Math.round(price * 1000) / 1000}</td>
          <td>{Math.round(change * 1000) / 1000}</td>
          <td>{Math.round(percent * 1000) / 1000}</td>
        </tr>
      );
    });
  }

  subscriptionHandler() {
    this.setState({ isSubscribed: !this.state.isSubscribed });
  }

  render() {
    return this.state.stockData === [] || this.state.isSubscribed === false ? (
      <div>
        <button onClick={this.subscriptionHandler.bind(this)}>subscribe</button>
      </div>
    ) : (
      <div>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Change</th>
              <th>% Change</th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
        </table>
        <button onClick={this.subscriptionHandler.bind(this)}>
          unsubscribe
        </button>
      </div>
    );
  }
}
export default Stocks;
