

const stockUrl = (symbol) => `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=demo`;

const cachedData = {};

const fetchStockData = async (symbol) => {
  try {
    if (cachedData[symbol]) {
      return cachedData[symbol];
    }
    const response = await fetch(stockUrl(symbol));
    const data = await response.json();
    if (!data["Monthly Adjusted Time Series"]){ 
      throw "data format error";
    }
    cachedData[symbol] = data;
    return data;
  } catch (err) {
    console.log(err);
  }
  return null;
};


const fetchFilteredData = async (symbol, startYear, endYear) => {
  try {
    const data = await fetchStockData(symbol);
    const dataListed = Object.entries(data["Monthly Adjusted Time Series"]);
    return dataListed.filter((item) => {
      const year = new Date(item[0]).getFullYear();
      return year >= startYear && year <= endYear;
    });
  } catch (err) {
    console.log(err);
  }
  return null;
}

export {
  fetchStockData, fetchFilteredData
}