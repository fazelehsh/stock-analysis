'use client';

import { useState, useMemo } from 'react';
import { useTable, Column, Cell } from 'react-table';
import styles from './StockTable.module.css';

interface StockDataEntry {
  year: number | string;
  January?: string | number;
  February?: string | number;
  March?: string | number;
  April?: string | number;
  May?: string | number;
  June?: string | number;
  July?: string | number;
  August?: string | number;
  September?: string | number;
  October?: string | number;
  November?: string | number;
  December?: string | number;
}

interface StockTableProps {
  stockData: StockDataEntry[];
}

const StockTable: React.FC<StockTableProps> = (props) => {
  return <Table data={props.stockData} />;
};

interface TableProps {
  data: StockDataEntry[];
}

const Table: React.FC<TableProps> = (props) => {
  const columns: Column<StockDataEntry>[] = useMemo(
    () => [
      { Header: "Year", accessor: "year" as const },
      { Header: "January", accessor: "January" as const },
      { Header: "February", accessor: "February" as const },
      { Header: "March", accessor: "March" as const },
      { Header: "April", accessor: "April" as const },
      { Header: "May", accessor: "May" as const },
      { Header: "June", accessor: "June" as const },
      { Header: "July", accessor: "July" as const },
      { Header: "August", accessor: "August" as const },
      { Header: "September", accessor: "September" as const },
      { Header: "October", accessor: "October" as const },
      { Header: "November", accessor: "November" as const },
      { Header: "December", accessor: "December" as const },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: props.data.filter(
        (item) => item.year !== "average" && item.year !== "standard deviation"
      ),
    });
  
  const [hoveredHeaderGroupIndex, setHoveredHeaderGroupIndex] = useState<number | null>(null);  
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [hoveredColumnIndex, setHoveredColumnIndex] = useState<number | null>(null);

  return (
    <div className="App relative">
      <div className={`container ${styles.table_container} overflow-x-auto`}>
        <table {...getTableProps()} className={`min-w-full table items-center text-black ${styles.customTable}`}>
          <thead className={`${styles.headLayout}  items-center w-full  rounded-lg`}>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex} className={`p-3 items-center w-1/12 rounded-md `}>
                {headerGroup.headers.map((column, index) => (
                  <th
                  onMouseEnter={() => {
                    setHoveredHeaderGroupIndex(index);
                    setHoveredColumnIndex(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredHeaderGroupIndex(null);
                    setHoveredColumnIndex(null);
                  }}
                    {...column.getHeaderProps()}
                    
                    className={`p-3 text-center text-sm table-container sm:text-base w-1/12 ${styles.yearHeaderCell } ${styles.hovereddd} ${styles[`column-${index}`]} 
                    ${hoveredColumnIndex !== 0 && hoveredColumnIndex === index ? styles.hovered : ""} 
                    ${hoveredHeaderGroupIndex !== 0 && hoveredHeaderGroupIndex === index ? styles.hovered : "" }
                    ${index === 0 ? styles.firstHeaderth : ""}   
                    ${index === headerGroup.headers.length - 1 ? styles.lastHeaderTh : ""}
                    ${hoveredColumnIndex !== 0 && hoveredColumnIndex === index   ? styles.hoveredMonth : ""}`}
                    
                    key={index}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          
          <tbody {...getTableBodyProps()} className={`p-3  ${styles.tableBody} ${styles.cellMargin} ${styles.tableBodyBefore} bg-white`}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);

              return (
                <tr
                  {...row.getRowProps()}
                  className={`${styles.hoveredRow} ${hoveredRowIndex === rowIndex ? styles.hoveredRow : ''}`}
                  onMouseEnter={() => setHoveredRowIndex(rowIndex)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
                  key={rowIndex}
                >
                  {row.cells.map((cell, columnIndex) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`${styles.paddingCell} w-1/12 p-[2px] sm:table-cell`}
                        onMouseEnter={() => setHoveredColumnIndex(columnIndex)}
                        onMouseLeave={() => setHoveredColumnIndex(null)}
                        key={columnIndex}
                      >
                        <div
                          className={`${getCellColorClass(Number(cell.value), cell)} ${styles.paddingCell} rounded-lg
                          ${columnIndex === 0 && hoveredRowIndex === rowIndex  ? styles.yearhover : ''}
                          ${ hoveredHeaderGroupIndex === columnIndex &&  hoveredRowIndex=== rowIndex  ? styles.yearhover : ''}
                          ${hoveredColumnIndex === 0 && hoveredRowIndex !== rowIndex ? styles.hoveredd : ''}
                          ${hoveredHeaderGroupIndex !== null && hoveredHeaderGroupIndex !== columnIndex ? styles.hoveredd : ''}
                          `}
                        >
                          {cell.column.Header !== "Year" ? `%${cell.value}` : cell.render("Cell")}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot className={`mt-4 ${styles.cellmargin} p-3 ${styles.tableFooterBefore}`}>
            <tr>
              {columns.map((column) => {
                const averageRow = props.data.find(item => item.year === "average");
                const averageValue = averageRow ? averageRow[column.accessor as keyof StockDataEntry] : "";

                return (
                  <td key={String(column.accessor)} className={`${styles.paddingcell} p-[4px] rounded-lg`}>
                    <div className={`${getCellColorClass(Number(averageValue) || 0, column)} ${styles.paddingcell} rounded-lg`}>
                      {averageValue !== "average" ? `%${averageValue}` : "average"}
                    </div>
                  </td>
                );
              })}
            </tr>

            <tr>
              {columns.map((column) => {
                const standardDeviationRow = props.data.find(item => item.year === "standard deviation");
                const standardDeviationValue = standardDeviationRow ? standardDeviationRow[column.accessor as keyof StockDataEntry] : "";

                return (
                  <td key={String(column.accessor)} className={`${styles.paddingcell} p-[4px] rounded-lg`}>
                    <div className={`rounded-lg p-[4px] ${standardDeviationValue !== "standard deviation" ? styles.hovereddd : ''}`}>
                      <span className="sd-font">{standardDeviationValue !== "standard deviation" ? `%${standardDeviationValue}` : "standard deviation"}</span>
                    </div>
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

// Utility function to determine cell color
const getCellColorClass = (value: number, cellOrColumn: Cell<StockDataEntry> | Column<StockDataEntry>): string => {
  const header = "column" in cellOrColumn ? cellOrColumn.column.Header : cellOrColumn.Header;
  const headerText = typeof header === 'string' ? header : '';

  if (headerText === "Year") return styles.StockTable_cellWhite;
  if (value > 0 && value < 2) return styles.StockTable_cellgreen1;
  if (value > 2 && value < 4) return styles.StockTable_cellgreen2;
  if (value > 4 && value < 6) return styles.StockTable_cellgreen3;
  if (value > 6 && value < 8) return styles.StockTable_cellgreen4;
  if (value > 8) return styles.StockTable_cellgreen5;
  if (value < 0 && value > -2) return styles.StockTable_cellred1;
  if (value < -2 && value > -4) return styles.StockTable_cellred2;
  if (value < -4 && value > -6) return styles.StockTable_cellred3;
  if (value < -6) return styles.StockTable_cellred4;

  return styles.StockTable_cellWhite;
};

export default StockTable;




