import React, { Component } from "react";
import firebase from "./firebase";
import "./tables.css";

const indexList = ["DJI", "DJT", "DOW", "GSPC", "IXIC", "NDX", "SOX", "SPX"];

class Indices extends Component {
  state = {
    isSubscribed: true,
    indexData: [],
  };

  componentDidMount() {
    var dataList = [];
    var indexRef = firebase.database().ref("index-data");
    indexRef.once("value", (snapshot) => {
      for (let i = 0; i < indexList.length; i++) {
        dataList.push({
          symbol: indexList[i],
          price: snapshot.val()[indexList[i]].price,
          change: snapshot.val()[indexList[i]].change,
          percent: snapshot.val()[indexList[i]]["percent-change"],
        });
      }
      this.setState({
        indexData: dataList,
      });
    });
  }

  renderTableBody() {
    return this.state.indexData.map((index, i) => {
      const { symbol, price, change, percent } = index;
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
    return this.state.indexData === [] || this.state.isSubscribed === false ? (
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
        <br></br>
        <button onClick={this.subscriptionHandler.bind(this)}>
          unsubscribe
        </button>
      </div>
    );
  }
}
export default Indices;
