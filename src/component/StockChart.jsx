
import { Line } from "react-chartjs-2";

const StockChart = (props) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full">
      <div className="flex-1">
      <Line
        data={{
          datasets: props.stockDataList.map((item, index) => {
            const isTSCO = item.symbol === "TSCO-LON"; 
            return {
              label: `${item.symbol} ${item.calcData[0].year}`,
              data: Object.entries(item.calcData[0]).slice(1),
              fill: false,
              borderColor: getColorByIndex(index),
              tension: 0.1,
              //pointRadius: 0,
              pointRadius: item.symbol === "isTSCO" ? 5 : 0,  
              pointStyle: (ctx) => {
                if (isTSCO && ctx.dataIndex === ctx.dataset.data.length - 1) {
                  return 'rect';  // Square at the last point for TSCO-LON
                }
                return 'circle';
              },
              pointHoverRadius: 5,
              showLine: true,
            };
          })
        }} options={{
          parsing: {
            xAxisKey: '[0]',
            yAxisKey: '[1]'
          },
          scales: {
            x: {

              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                display: true,
                callback: (value) => `%${value}`
              },
              title: {
                display: true,
                text: 'Return',
              },
              border: {
                display: false,
              },

            },
          },
          elements: {
            line: {
              borderWidth: 2
            }
          }
        }} />
        </div>
      </div>


<div className="flex justify-start items-center  w-full  items-start space-x-44 flex flex-row mt-4">
{props.stockDataList.map((stockData) => (
          <div key={stockData.symbol} className={`text-lg ${stockData.symbol === 'MSFT' ? 'ml-6' : ''}`}>
            <strong>{stockData.symbol} Annual Return:</strong> {stockData.annualReturns[0].annualReturn}%
          </div>
        ))}
      </div>
    </div>
  );
}


const getColorByIndex = (index) => {
  switch (index) {
    case 0:
      return '#cd6a71';
    case 1:
      return '#e09b47';
    case 2:
      return '#05e26b';
    case 3:
      return '#5c33fe';
    case 4



      :
      return '#36cd84';
  }
}

export default StockChart;

