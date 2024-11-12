// fetchData.ts

export const stockUrl = (symbol: string): any =>
  `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=demo`;

