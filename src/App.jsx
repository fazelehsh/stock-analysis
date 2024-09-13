import "./App.css";
import { useState, useEffect, useMemo } from 'react';

import { useTable } from "react-table";

const API_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=MSFT&apikey=demo';


function App() {


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

      if(i+1 >= data.length){
        returns.find((item) => item.year === year)[month] = "";
        break;
      }

      const currentMonth = data[i][1];
      const previousMonth = data[i + 1][1];

      const returnPercent = ((Number(previousMonth["5. adjusted close"]) - Number(currentMonth["5. adjusted close"])) / Number(currentMonth["5. adjusted close"])) * 100;

      returns.find((item) => item.year === year)[month] = returnPercent.toFixed(2);
    }
    return returns;
  };



  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const returnsData = calculateReturns(stockData);

  return <Table data={returnsData} />;
};

const Table = (data) => {

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
    useTable({ columns, data:data.data });

  return (
    <div className="App">
      <div className="container">
        <table {...getTableProps()}>

          <thead>

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
                      <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
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

export default App;