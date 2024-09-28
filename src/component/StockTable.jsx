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
      <div className="container table-container  ">
        <table {...getTableProps()} className="custom-table table fixed-table items-center w-full text-black  1,280  ">

          <thead className="p-3 items-center w-full border-2 border-black  rounded-lg head-layout  ">

            {headerGroups.map((headerGroup, headerGroupIndex) =>
            (
              <tr {...headerGroup.getHeaderGroupProps()} className=" p-3 items-center w-1/12  cell-margin rounded-md border-b ">
                {headerGroup.headers.map((column, index) =>
                (
                  <th
                    onMouseEnter={() => setHoveredHeaderGroupIndex(index)}
                    onMouseLeave={() => setHoveredHeaderGroupIndex(null)}
                    {...column.getHeaderProps()}
                    className={`p-3 text-center text-sm table-container  w-1/12 column-${index} 
                               ${hoveredColumnIndex !== 0 && hoveredColumnIndex === index ? 'hovered' : ''}
                               ${hoveredHeaderGroupIndex !== 0 && hoveredHeaderGroupIndex === index ? 'hovered' : ''}
                               ${index === 0 ? 'first-header-th' : ''}
                               ${index === headerGroup.headers.length - 1 ? 'last-header-th' : ''}
                       `}style={index === 0 ? { width: '140px' } : {}}

                  >
                    {column.render("Header")}
                  </th>
                ))
                }

              </tr>
            )
            )}

          </thead>
          <br />
          <tbody {...getTableBodyProps()} className="p-3 cell-margin  bg-white">


            {rows.map((row, rowIndex,) => {
              prepareRow(row);

              return (

                <tr
                  {...row.getRowProps()}
                  className={`${hoveredRowIndex === rowIndex ? 'hovered-row' : ''}`}
                  onMouseEnter={() => setHoveredRowIndex(rowIndex)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
                >
                  {row.cells.map((cell, columnIndex) => (
                    <td
                      {...cell.getCellProps()}
                      className="w-1/12 p-[4px]"
                      onMouseEnter={() => setHoveredColumnIndex(columnIndex)}
                      onMouseLeave={() => setHoveredColumnIndex(null)}
                    >
                      <div className={`${getCellColorClass(cell.value, cell)} padding-cell  rounded-lg
                                ${columnIndex === 0 && hoveredRowIndex === rowIndex ? "year-hover" : ''}
                                ${hoveredColumnIndex == 0 && hoveredRowIndex !== rowIndex ? 'hoveredd' : ''}
                                ${hoveredHeaderGroupIndex !== null && hoveredHeaderGroupIndex !== columnIndex ? 'hoveredd' : ''}
                                
                               `}
                      >{cell.column.Header !== "Year" ? `%${cell.value}` : cell.render("Cell")}</div>

                    </td>
                  ))}
                </tr>

              );
            })}


            {/* Add a separator row */}
            <tr className="border-none">
              <td colSpan={columns.length} className="separator-line "></td>
            </tr>

          </tbody>




          <tfoot className="mt-4  cell-margin p-3 ">

            <tr className="">


              {columns.map((column) => {
                const averageRow = props.data.find(item => item.year === "average");
                const averageValue = averageRow ? averageRow[column.accessor] : "";

                return (
                  <td
                    key={column.accessor}
                    className="padding-cell  rounded-lg"
                  >
                    <div className={`${getCellColorClass(averageValue, { column })} padding-cell  rounded-lg

                  
                 `}
                    >
                      {averageValue !== "average" ? `%${averageValue}` : "average"}</div>


                  </td>
                );
              })}



            </tr >

            <tr  >

            
              {columns.map((column ) => {
        // Find the 'standard deviation' row in your data
        const standardDeviationRow = props.data.find(item => item.year === "standard deviation");
        const standardDeviationValue = standardDeviationRow ? standardDeviationRow[column.accessor] : "";

        return (
          <td
            key={column.accessor}
            className={`padding-cell  rounded-lg ${standardDeviationValue!== "standard deviation" ? 'hovereddd' : ''}`}
            // Apply the background color here
          >
            {standardDeviationValue !== "standard deviation" ? `%${standardDeviationValue}` : "standard deviation"}
          </td>
        );
      })}
                
                  
                
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