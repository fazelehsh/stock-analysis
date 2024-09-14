import "./App.css";
import StockTable from './component/StockTable';
import { useState } from 'react';


function App() {
  const [symbol, setSymbol] = useState("MSFT");

  return <>
    <button onClick={() => setSymbol("MSFT")}>
      Microsoft
    </button>
    <button onClick={() => setSymbol("AAPL")}>
      Apple
    </button>
    
    <button onClick={() => setSymbol("IBM")}>
      IBM
    </button>
    <StockTable key={symbol} symbol={symbol} />
  </>;
};

export default App;