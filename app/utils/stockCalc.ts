type StockDataEntry = [string, { "5. adjusted close": string; "1. open": string }];
type MonthlyReturns = { [month: string]: string | number };
type AnnualReturns = { year: string; annualReturn: string };

interface CalculatedReturns extends MonthlyReturns {
  year: number | string;
}

const calculateStockDataForTable = (data: StockDataEntry[]): { returns: CalculatedReturns[]; annualReturns: AnnualReturns[] } => {
  let returns: CalculatedReturns[] = [];

  for (let i = 0; i < data.length; i++) {
    const year = new Date(data[i][0]).getFullYear();
    const month = new Date(data[i][0]).toLocaleString('default', { month: 'long' });
    if (!returns.some((item) => item.year === year)) {
      returns.push({ year });
    }

    const currentMonth = data[i][1];
    let returnPercent: number;

    if (i + 1 >= data.length) {
      returnPercent = ((Number(currentMonth["5. adjusted close"]) - Number(currentMonth["1. open"])) / Number(currentMonth["1. open"])) * 100;
    } else {
      const previousMonth = data[i + 1][1];
      returnPercent = ((Number(previousMonth["5. adjusted close"]) - Number(currentMonth["5. adjusted close"])) / Number(currentMonth["5. adjusted close"])) * 100;
    }

    const targetYear = returns.find((item) => item.year === year);
    if (targetYear) {
      targetYear[month] = returnPercent.toFixed(2);
    }
  }

  const av: CalculatedReturns = { year: "average" };
  returns.forEach((item) => {
    for (const month in item) {
      if (month !== "year") {
        av[month] = typeof av[month] === "undefined" ? Number(item[month]) : Number(av[month]) + Number(item[month]);
      }
    }
  });

  for (const month in av) {
    if (month !== "year") {
      av[month] = (Number(av[month]) / returns.length).toFixed(2);
    }
  }

  const sd: CalculatedReturns = { year: "standard deviation" };
  returns.forEach((item) => {
    for (const month in item) {
      if (month !== "year") {
        sd[month] = typeof sd[month] === "undefined" ? Math.pow(Number(item[month]) - Number(av[month]), 2) : Number(sd[month]) + Math.pow(Number(item[month]) - Number(av[month]), 2);
      }
    }
  });

  for (const month in sd) {
    if (month !== "year") {
      sd[month] = Math.sqrt(Number(sd[month]) / (returns.length - 1)).toFixed(2);
    }
  }

  const annualReturns: AnnualReturns[] = returns.map((item) => {
    const months = Object.keys(item).filter((key) => key !== "year");

    const annualReturn = months.reduce((acc, month) => {
      const monthValue = parseFloat(item[month] as string);
      return !isNaN(monthValue) ? acc * (1 + monthValue / 100) : acc;
    }, 1) - 1;

    return { year: item.year as string, annualReturn: (annualReturn * 100).toFixed(2) };
  });

  returns.push(av);
  returns.push(sd);

  return { returns, annualReturns };
};

export { calculateStockDataForTable };
