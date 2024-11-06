// fetchData.ts

const stockUrl = (symbol: string): string => 
  `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=demo`;

const cachedData: { [symbol: string]: any } = {};

const fetchStockData = async (symbol: string): Promise<any | null> => {
  try {
    if (cachedData[symbol]) {
      return cachedData[symbol];
    }
    const response = await fetch(stockUrl(symbol));
    const data = await response.json();
    if (!data["Monthly Adjusted Time Series"]) { 
      throw new Error("Data format error");
    }
    cachedData[symbol] = data;
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

export { fetchStockData, fetchFilteredData };
