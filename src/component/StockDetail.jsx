import "../App.css";
import { useState, useEffect, useMemo } from 'react';
import StockChart from './StockChart';
import StockTable from './StockTable';
import { fetchFilteredData } from '../repo/DataRepo';
import { calculateStockDataForTable } from '../utils/StockCalc'



function StockDetail() {
  const allSymbols = ["MSFT", "TSCO.LON", "IBM"]
  const [selectedSymbol, setSelectedSymbol] = useState(allSymbols[0]);

  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDataFromRepo = async (symbol) => {
    return { symbol: symbol, list: await fetchFilteredData(symbol, 2018, 2023) };
  }

  const loadData = async () => {
    setLoading(true);
    /*await  (new Promise(function(resolve) {
      setTimeout(resolve, 200);
    }));*/
    const allStocksData = await Promise.all(allSymbols.map((symbol) => getDataFromRepo(symbol)));
    setLoading(false);
    if (allStocksData.every((item) => item.list !== null)) {
      setStockData(allStocksData)
    } else {
      setError('Failed to fetch stock data');
    }
  }

  useEffect(() => {
    loadData();
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <><p>{error}</p>
    <button onClick={() => loadData()}>Reload</button>
  </>



  const calculatedDataList = stockData.map((data) => {
    const dataForTable = calculateStockDataForTable(data.list);
    return { symbol: data.symbol, calcData: dataForTable.returns, annualReturns: dataForTable.annualReturns }
  });

  return <div className="container mx-auto ">
    <div className=" flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      {allSymbols.map((item) => {
        return <button onClick={() => setSelectedSymbol(item)} className="open && 'bg-gray-100',
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700  focus:outline-none active:bg-gray-100'font-medium justify-around">
          {item}
        </button>
      })}
      <div className="space-y-0.5 ">
        <div className=" flex-1">
          <StockTable stockData={calculatedDataList.find((item) => item.symbol === selectedSymbol).calcData} />
        </div>
        <div>
          <StockChart stockDataList={calculatedDataList} className=" flex-1" />
        </div>
      </div>
    </div>

  </div>
};


export default StockDetail;