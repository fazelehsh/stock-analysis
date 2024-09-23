import "../App.css";
import { useState, useEffect, useMemo } from 'react';
import StockChart from './StockChart';
import StockTable from './StockTable';
import { fetchFilteredData } from '../repo/DataRepo';
import { calculateStockDataForTable } from '../utils/StockCalc'



function StockDetail(props) {
  const stockSymbol = props.symbol;
  const allSymbols = props.allSymbols;

  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDataFromRepo = async (symbol) => {
    return { symbol: symbol, list: await fetchFilteredData(symbol, 2018, 2023) };
  }

  const loadData = async () => {
    setLoading(true);
    const allStocksData = await Promise.all(allSymbols.map((symbol) => getDataFromRepo(symbol)));
    setLoading(false);
    if (allStocksData) {
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



  const calculatedDataList = stockData.map((data) => { return { symbol: data.symbol, calcData: calculateStockDataForTable(data.list) } });

  return <div className="container mx-auto ">
    <div className=" flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      <div className=" flex-1">
        <StockTable stockData={calculatedDataList.find((item) => item.symbol === stockSymbol).calcData} />
      </div>
      <div >
        <StockChart stockDataList={calculatedDataList} className=" flex-1" />
      </div>
    </div>
  </div>
};


export default StockDetail;