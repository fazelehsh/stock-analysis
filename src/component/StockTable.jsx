import "../App.css";
import { useState, useEffect, useMemo } from 'react';

import { useTable } from "react-table";




function StockTable(props) {
  const stockSymbol = props.symbol;
  const API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${stockSymbol}&apikey=TBPPN699OUUSRAQF`;

  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const dataListed = Object.entries(data["Monthly Adjusted Time Series"]);
        const filteredData = filterDataByYear(dataListed, 2018, 2023);
        setStockData(filteredData);
      } catch (err) {
        setError('Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);



  const filterDataByYear = (data, startYear, endYear) => {
    return data.filter((item) => {
      const year = new Date(item[0]).getFullYear();
      return year >= startYear && year <= endYear;
    });
  };



  const calculateReturns = (data) => {
    let returns = [];

    for (let i = 0; i < data.length; i++) {
      const year = new Date(data[i][0]).getFullYear();
      const month = new Date(data[i][0]).toLocaleString('default', { month: 'long' });
      if (!returns.some((item) => item.year === year)) {
        returns.push({ year: year });
      }

      if (i + 1 >= data.length) {
        const currentMonth = data[i][1];
  
        const returnPercent = ((Number(currentMonth["5. adjusted close"]) - Number(currentMonth["1. open"])) / Number(currentMonth["5. adjusted close"])) * 100;
  
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



  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const returnsData = calculateReturns(stockData);

  return <Table data={returnsData} />;
};

const Table = (props) => {

  const columns = useMemo(
    () => [
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "January",
        accessor: "January",
      },
      {
        Header: "February",
        accessor: "February",
      },
      {
        Header: "March",
        accessor: "March",
      },
      {
        Header: "April",
        accessor: "April",
      },
      {
        Header: "May",
        accessor: "May",
      },
      {
        Header: "June",
        accessor: "June",
      },
      {
        Header: "July",
        accessor: "July",
      },
      {
        Header: "August",
        accessor: "August",
      },
      {
        Header: "September",
        accessor: "September",
      },
      {
        Header: "October",
        accessor: "October",
      },
      {
        Header: "November",
        accessor: "November",
      },
      {
        Header: "December",
        accessor: "December",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: props.data });

  return (
    <div className="App">
      <div className="container">
        <table {...getTableProps()}  className="w-full text-gray-700">

          <thead >

            {headerGroups.map((headerGroup) =>
            (
              <tr {...headerGroup.getHeaderGroupProps()}>

                {headerGroup.headers.map((column) =>
                (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))
                }

              </tr>
            )
            )}

          </thead>

          <tbody {...getTableBodyProps()}>

            {
              rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className={getCellColorClass(cell.value,cell) + " padding-cell"}> {cell.render("Cell")}{cell.column.Header !== "Year" ? "%" : ""} </td>
                   ))}
                  </tr>
                );
              })
            }

          </tbody>

        </table>
      </div>
    </div>
  );

}


const getCellColorClass = (value,cell) =>{
  if(cell.column.Header === "Year" ){
    return "cell-white";
  }
  if (value>0 && value<2)  {
    return "cell-green-1";
  }
  if(value>2 && value<4  ){
    return "cell-green-2";
  }
  if(value>4 && value<6  ){
    return "cell-green-3";
  }
  if(value>6 && value<8  ){
    return "cell-green-4";
  }
  if(value>8 && value<100  ){
    return "cell-green-5";
  }
  if(value<0 && value>-2  ){
    return "cell-red-1";
  }
  if(value<-2 && value>-4  ){
    return "cell-red-2";
  }
  if(value<-4 && value>-6  ){
    return "cell-red-3";
  }
  if(value<-6 && value>-100  ){
    return "cell-red-4";
  }
  
  return "cell-white";
}
export default StockTable;