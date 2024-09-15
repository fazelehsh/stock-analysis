import "./App.css";
import StockTable from './component/StockTable';
import { useState } from 'react';


function App() {
  const [symbol, setSymbol] = useState("MSFT");

  return <>
    <button onClick={() => setSymbol("MSFT")} className="open && 'bg-gray-100',
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'font-medium justify-around">
      Microsoft
    </button>
    <button onClick={() => setSymbol("TSCO")} className="open && 'bg-gray-100',
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100' font-medium justify-around">
      TSCO
    </button>
    
    <button onClick={() => setSymbol("IBM")} className="open && 'bg-gray-100',
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'font-medium justify-around">
      IBM
    </button>
    <StockTable key={symbol} symbol={symbol} />
  </>;
};

export default App;