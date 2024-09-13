import React, { useState } from 'react';

// Sample data (Adjusted Close prices for each month)
const stockData = [
  { month: 'September 2024', adjustedClose: 401.7000 },
  { month: 'August 2024', adjustedClose: 417.1400 },
  { month: 'July 2024', adjustedClose: 420.6300 },
  { month: 'June 2024', adjustedClose: 420.2900 },
  { month: 'May 2024', adjustedClose: 412.7000 },
  { month: 'April 2024', adjustedClose: 398.8200 },
  { month: 'March 2024', adjustedClose: 392.7900 },
  { month: 'February 2024', adjustedClose: 391.7600 },
  { month: 'January 2024', adjustedClose: 403.0100 },
  { month: 'December 2023', adjustedClose: 405.7400 },
  { month: 'November 2023', adjustedClose: 399.7900 },
  { month: 'October 2023', adjustedClose: 378.4700 },
  { month: 'September 2023', adjustedClose: 373.6800 },
];

const StockReturns = () => {
  const calculateReturns = (data) => {
    let returns = [];

    for (let i = 1; i < data.length; i++) {
      const currentMonth = data[i];
      const previousMonth = data[i - 1];

      // Calculate return percentage
      const returnPercent = ((previousMonth.adjustedClose - currentMonth.adjustedClose) / currentMonth.adjustedClose) * 100;

      // Push the calculated return percentage with the month
      returns.push({
        month: previousMonth.month,
        returnPercent: returnPercent.toFixed(2), // Format to 2 decimal places
      });
    }

    return returns;
  };

  const returnsData = calculateReturns(stockData);

  return (
    <div>
      <h1>Monthly Stock Return Percentages</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Month</th>
            <th>Return (%)</th>
          </tr>
        </thead>
        <tbody>
          {returnsData.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.returnPercent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockReturns;
