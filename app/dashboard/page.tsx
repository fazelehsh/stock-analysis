


import React from 'react';
import StockDetail from '../components/StockDetail';
import { stockUrl } from '../utils/stockUrl';
import { calculateStockDataForTable } from '../utils/stockCalc';

interface StockData {
  symbol: string;
  list: any[];
}

interface CalculatedData {
  symbol: string;
  calcData: any[];
  annualReturns: any[];
}

export const allSymbols = ["MSFT", "TSCO.LON", "IBM"];

const fetchStockData = async (symbol: string): Promise<any | null> => {
  try {
    const response = await fetch(stockUrl(symbol));
    const data = await response.json();
    if (!data["Monthly Adjusted Time Series"]) { 
      throw new Error("Data format error");
    }
    return data;
  } catch (err) {
    console.error(err);
  }
  return null;
};

const fetchFilteredData = async (symbol: string, startYear: number, endYear: number): Promise<[string, any][]> => {
  try {
    const data = await fetchStockData(symbol);
    if (data) {
      const dataListed = Object.entries(data["Monthly Adjusted Time Series"]);
      return dataListed.filter(([date]) => {
        const year = new Date(date).getFullYear();
        return year >= startYear && year <= endYear;
      });
    }
  } catch (err) {
    console.error(err);
  }
  return [];
};

const getDataFromRepo = async (symbol: string): Promise<StockData> => {
  const data = await fetchFilteredData(symbol, 2018, 2023);
  return { symbol, list: data || [] };
};

export default async function Page() {
  const stockData: StockData[] = await Promise.all(allSymbols.map(getDataFromRepo));

  const calculatedDataList: CalculatedData[] = stockData.map((data) => {
    const dataForTable = calculateStockDataForTable(data.list);
    return { symbol: data.symbol, calcData: dataForTable.returns, annualReturns: dataForTable.annualReturns };
  });

  return (
    <section className="py-10">
      <h2 className="text-3xl font-semibold mb-4">Stock Dashboard</h2>
      <div className="container mx-auto">
        <StockDetail calculatedDataList={calculatedDataList} /> 
      </div>
    </section>
  );
}
