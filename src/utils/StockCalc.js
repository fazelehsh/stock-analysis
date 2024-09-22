
const calculateStockDataForTable = (data) => {
  let returns = [];

  for (let i = 0; i < data.length; i++) {
    const year = new Date(data[i][0]).getFullYear();
    const month = new Date(data[i][0]).toLocaleString('default', { month: 'long' });
    if (!returns.some((item) => item.year === year)) {
      returns.push({ year: year });
    }

    if (i + 1 >= data.length) {
      const currentMonth = data[i][1];

      const returnPercent = ((Number(currentMonth["5. adjusted close"]) - Number(currentMonth["1. open"])) / Number(currentMonth["1. open"])) * 100;

      returns.find((item) => item.year === year)[month] = returnPercent.toFixed(2);
      break;
    }

    const currentMonth = data[i][1];
    const previousMonth = data[i + 1][1];

    const returnPercent = ((Number(previousMonth["5. adjusted close"]) - Number(currentMonth["5. adjusted close"])) / Number(currentMonth["5. adjusted close"])) * 100;

    returns.find((item) => item.year === year)[month] = returnPercent.toFixed(2);
  }

  const av = { year: "average" };
  returns.forEach((item) => {
    for (const i in item) {
      if (i !== "year") {
        if (typeof av[i] === "undefined") {
          av[i] = Number(item[i]);
        }
        else {
          av[i] = Number(av[i]) + Number(item[i])
        }
      }
    }
  })
  for (const m in av) {
    if (m !== "year") {
      av[m] = (av[m] / returns.length).toFixed(2)
    }

  }



  const sd = { year: "standard deviation" };
  returns.forEach((item) => {
    for (const i in item) {
      if (i !== "year") {
        if (typeof sd[i] === "undefined") {
          sd[i] = Math.pow(Number(item[i]) - (av[i]), 2);
        }
        else {
          sd[i] = Number(sd[i]) + Math.pow(Number(item[i]) - (av[i]), 2);
        }
      }
    }
  })
  for (const m in sd) {
    if (m !== "year") {
      sd[m] = Math.sqrt(sd[m] / (returns.length - 1)).toFixed(2)
    }
  }

  returns.push(av);
  returns.push(sd);
  return returns;
};

export {calculateStockDataForTable}

