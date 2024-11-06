"use client";

import { useState, useEffect } from 'react';
import StockChart from './StockChart';
import StockTable from './StockTable';
import { fetchFilteredData } from '../utils/fetchStockData';
import { calculateStockDataForTable } from '../utils/stockCalc';

interface StockData {
  symbol: string;
  list: any[]; // Replace 'any[]' with the specific type of your stock data
}

interface CalculatedData {
  symbol: string;
  calcData: any[]; // Replace 'any[]' with the specific type of calculated data
  annualReturns: any[]; // Change this type based on your implementation
}

function StockDetail() {
  const allSymbols = ["MSFT", "TSCO.LON", "IBM"];
  const [selectedSymbol, setSelectedSymbol] = useState<string>(allSymbols[0]);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getDataFromRepo = async (symbol: string): Promise<StockData> => {
    const list = await fetchFilteredData(symbol, 2018, 2023);
    return { symbol, list };
  };

  const loadData = async () => {
    setLoading(true);
    const allStocksData = await Promise.all(allSymbols.map((symbol) => getDataFromRepo(symbol)));
    setLoading(false);
    if (allStocksData.every((item) => item.list !== null)) {
      setStockData(allStocksData);
    } else {
      setError('Failed to fetch stock data');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return (
    <>
      <p>{error}</p>
      <button onClick={() => loadData()}>Reload</button>
    </>
  );

  const calculatedDataList: CalculatedData[] = stockData.map((data) => {
    const dataForTable = calculateStockDataForTable(data.list);
    return { symbol: data.symbol, calcData: dataForTable.returns, annualReturns: dataForTable.annualReturns };
  });

  return (
    <div className="container mx-auto">
      {/* Horizontal button layout */}
      <div className="flex justify-center space-x-4 mb-4">
        {allSymbols.map((item) => (
          <button
            key={item}
            onClick={() => setSelectedSymbol(item)}
            className={`group inline-flex items-center rounded-sm px-4 py-2 text-gray-700 focus:outline-none active:bg-gray-100 font-medium ${selectedSymbol === item ? 'bg-gray-100' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="space-y-0.5">
        <div className="flex-1">
          {/* Apply a fixed table layout for consistent cell sizes */}
          <StockTable stockData={calculatedDataList.find((item) => item.symbol === selectedSymbol)?.calcData || []} />
        </div>
        <div className="flex-1">
          <StockChart stockDataList={calculatedDataList} />
        </div>
      </div>
    </div>
  );
}

export default StockDetail;
