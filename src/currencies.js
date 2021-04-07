import React, { Component } from "react";
import firebase from "./firebase";
import "./tables.css";

const currencyList = ["AUD", "CNY", "EUR", "GBP", "INR", "JPY", "MXN", "USD"];

class Currencies extends Component {
  state = {
    isSubscribed: true,
    currencyData: [],
  };

  componentDidMount() {
    var dataList = [];
    var currencyRef = firebase.database().ref("currency-data");
    currencyRef.once("value", (snapshot) => {
      for (let i = 0; i < currencyList.length; i++) {
        dataList.push({
          symbol: currencyList[i],
          rate: snapshot.val()[currencyList[i]].rate,
        });
      }
      this.setState({
        currencyData: dataList,
      });
    });
  }

  renderTableBody() {
    return this.state.currencyData.map((currency, index) => {
      const { symbol, rate } = currency;
      return (
        <tr>
          <td>{symbol}</td>
          <td>{Math.round(rate * 1000) / 1000}</td>
        </tr>
      );
    });
  }

  subscriptionHandler() {
    this.setState({ isSubscribed: !this.state.isSubscribed });
  }

  render() {
    return this.state.currencyData === [] ||
      this.state.isSubscribed === false ? (
      <div>
        <button onClick={this.subscriptionHandler.bind(this)}>subscribe</button>
      </div>
    ) : (
      <div>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Rate</th>
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
export default Currencies;
