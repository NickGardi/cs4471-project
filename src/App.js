import "./App.css";
import Stocks from "./stocks";
import Indices from "./indices";
import Currencies from "./currencies";

function App() {
  return (
    <div className="App">
      <h1>Stock Tracker</h1>
      <Stocks />
      <h1>Index Tracker</h1>
      <Indices />
      <h1>Currency Tracker</h1>
      <Currencies />
    </div>
  );
}

export default App;
