import "./App.css";
import { useState } from 'react';

import StockDetail from './component/StockDetail';

function App() {
  const allSymbols = ["MSFT" , "TSCO.LON" , "IBM"]
  const [symbol, setSymbol] = useState(allSymbols[0]);

  return <>
  {allSymbols.map((item) =>{return <button onClick={() => setSymbol(item)} className="open && 'bg-gray-100',
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700  focus:outline-none active:bg-gray-100'font-medium justify-around">
      {item}
    </button>})}
    
    <StockDetail key={`${symbol}-Table`} symbol={symbol} allSymbols={allSymbols} />
  </>;
};

export default App;