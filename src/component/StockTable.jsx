import "../App.css";
import { useState, useEffect, useMemo } from 'react';

import { useTable } from "react-table";




function StockTable(props) {

  return <Table data={props.stockData} />;
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
    useTable({ columns, data: props.data.filter((item) => item.year !== "average" && item.year !== "standard deviation") });

  //const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredHeaderGroupIndex, setHoveredHeaderGroupIndex] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [hoveredColumnIndex, setHoveredColumnIndex] = useState(null);
  return (
    <div className="App  relative ">
      <div className="container table-container ">
        <table {...getTableProps()} className="custom-table table fixed-table items-center w-full text-black  1,280  ">

          <thead className="p-3 items-center w-full border-2 border-black head-layout rounded-lg head-layout ">

            {headerGroups.map((headerGroup, headerGroupIndex) =>
            (
              <tr {...headerGroup.getHeaderGroupProps()} className=" p-3 items-center w-1/12  cell-margin "
                onMouseEnter={() => setHoveredHeaderGroupIndex(headerGroupIndex)}
                onMouseLeave={() => setHoveredHeaderGroupIndex(null)} >
                {headerGroup.headers.map((column, index) =>
                (
                  <th 
                    {...column.getHeaderProps()}
                    className={`p-3 text-center border-b border-black rounded-md w-1/12 column-${index} ${hoveredColumnIndex === index ? 'hovered' : ''
                      }
                      
                       `}

                  >
                    {column.render("Header")}
                  </th>
                ))
                }

              </tr>
            )
            )}

          </thead>

          <tbody {...getTableBodyProps()} className="p-3 cell-margin  ">


            {rows.map((row, rowIndex,) => {
              prepareRow(row);

              return (

                <tr
                  {...row.getRowProps()}
                  className={`${hoveredRowIndex === rowIndex ? 'hovered-row' : ''}
                  
                              `}
                  onMouseEnter={() => setHoveredRowIndex(rowIndex)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
                >
                  {row.cells.map((cell, columnIndex) => (
                    <td
                      {...cell.getCellProps()}
                      className={`${getCellColorClass(cell.value, cell)} padding-cell w-1/12 rounded-lg
                                ${columnIndex === 0 && hoveredRowIndex === rowIndex ? "year-hover" : ''}
                                ${hoveredColumnIndex == 0 && hoveredRowIndex !== rowIndex ? 'hoveredd' : ''}
                                ${hoveredHeaderGroupIndex !== null && hoveredHeaderGroupIndex !== columnIndex ? 'hoveredd' : ''}
                                
                               `}
                      onMouseEnter={() => setHoveredColumnIndex(columnIndex)}
                      onMouseLeave={() => setHoveredColumnIndex(null)}
                    >
                      {cell.column.Header !== "Year" ? `%${cell.value}` : cell.render("Cell")}
                    </td>
                  ))}
                </tr>

              );
            })}

          </tbody>




          <tfoot className="mt-4">
            <tr>


              {columns.map((column) => {
                const averageRow = props.data.find(item => item.year === "average");
                const averageValue = averageRow ? averageRow[column.accessor] : "";

                return (
                  <td
                    key={column.accessor}
                    className={`padding-cell  rounded-md ${getCellColorClass(averageValue, { column })}`}
                  >
                    {averageValue !== "average" ? `%${averageValue}` : "average"}


                  </td>
                );
              })}



            </tr>

            <tr>
              {columns.map((column) => (
                <td key={column.accessor} className="padding-cell ">
                  {props.data.find(item => item.year === "standard deviation")?.[column.accessor] || ""}{column.Header !== "Year" ? "%" : ""}
                </td>
              ))}
            </tr>
          </tfoot>



        </table>
      </div>
    </div>
  );

}


const getCellColorClass = (value, cell) => {
  if (cell.column.Header === "Year") {
    return "cell-white";
  }
  if (value > 0 && value < 2) {
    return "cell-green-1";
  }
  if (value > 2 && value < 4) {
    return "cell-green-2";
  }
  if (value > 4 && value < 6) {
    return "cell-green-3";
  }
  if (value > 6 && value < 8) {
    return "cell-green-4";
  }
  if (value > 8 && value < 100) {
    return "cell-green-5";
  }
  if (value < 0 && value > -2) {
    return "cell-red-1";
  }
  if (value < -2 && value > -4) {
    return "cell-red-2";
  }
  if (value < -4 && value > -6) {
    return "cell-red-3";
  }
  if (value < -6 && value > -100) {
    return "cell-red-4";
  }

  return "cell-white";
}
export default StockTable;