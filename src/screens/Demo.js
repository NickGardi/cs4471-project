import React, { Component } from "react";
import Plot from "react-plotly.js";

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: null,
      timeValues: [],
      priceValues: [],
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var stock = this.state;
    const pointerToThis = this;
    let times = [];
    let prices = [];
    stock = stock["stock"];

    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=SOQQL2085F9JMWSF`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (var key in data["Time Series (5min)"]) {
          times.push(key);
          prices.push(data["Time Series (5min)"][key]["1. open"]);
        }

        pointerToThis.setState({
          timeValues: times,
          priceValues: prices,
        });
      });
  };

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { stock } = this.state;
    var { isLoaded, items } = this.state;
    return (
      <div>
        <h1>BREADCRUMBS</h1>
        <p>Enter the stock symbol you want to recieve information for:</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="TSLA"
            name="stock"
            onChange={this.handleInputChange}
          />
          <button> Enter </button>
        </form>

        <Plot
          data={[
            {
              x: this.state.timeValues,
              y: this.state.priceValues,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
          ]}
          layout={{ width: 720, height: 440, title: stock }}
        />
      </div>
    );
  }
}

export default Demo;
