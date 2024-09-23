
import { Line } from "react-chartjs-2";

const StockChart = (props) => {
  return (
    <div>
      <Line
        data={{
          datasets: props.stockDataList.map((item, index) => {
            return {
              label: `${item.symbol} ${item.calcData[0].year}`,
              data: Object.entries(item.calcData[0]).slice(1),
              fill: false,
              borderColor: getColorByIndex(index),
              tension: 0.1
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

      {/* Display Annual Returns as Text */}
      {props.stockDataList.map((stockData) => {
        return <div className="mt-6 text-left w-full">
            <p className="text-lg">
              <strong>{stockData.symbol} Annual Returns:</strong> {stockData.annualReturns[0].annualReturn}%
            </p>
        </div>
      })}

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

