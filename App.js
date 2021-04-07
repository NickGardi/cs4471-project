import "./App.css";
import Stocks from "./stocks";
import Indices from "./indices";
import Currencies from "./currencies";

function App() {
  return (
    <div className="App">
      <div id="header">
        <h1>BreadCrumbs</h1>
      </div>
      <div id="stock">
        <h1>Stock Tracker</h1>
        <Stocks />
      </div>
      <div id="index">
        <h1>Index Tracker</h1>
        <Indices />
      </div>
      <div id="currency">
        <h1>Currency Tracker</h1>
        <Currencies />
      </div>
    </div>
  );
}

export default App;
