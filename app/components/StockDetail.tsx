"use client";

import { useState } from 'react';
import StockChart from './StockChart';
import StockTable from './StockTable';

interface CalculatedData {
  symbol: string;
  calcData: any[];
  annualReturns: any[];
}

interface StockDetailProps {
  calculatedDataList: CalculatedData[];
}

export const allSymbols = ["MSFT", "TSCO.LON", "IBM"];

function StockDetail({ calculatedDataList }: StockDetailProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(allSymbols[0]);

  return (
    <div className="container mx-auto">
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
