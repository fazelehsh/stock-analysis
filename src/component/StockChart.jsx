import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

// Register necessary components from Chart.js
Chart.register(...registerables);

const StockChart = (props) => {
  const legendPaddingPlugin = {
    id: 'legendPadding',
    beforeInit(chart) {
      const originalFit = chart.legend.fit;
      chart.legend.fit = function () {
        originalFit.call(chart.legend);
        this.height += 50; // Adjust this value for more or less space
      };
    }
  };

  // Define different shapes for each line
  const pointStyles = ['circle', 'rect', 'triangle', 'cross', 'line'];

  const datasets = props.stockDataList.map((item, index) => {
    const isTSCO = item.symbol === "TSCO-LON";
    const annualReturn = item.annualReturns[0] ? item.annualReturns[0].annualReturn : 0;

    // Get the data entries for the dataset
    const dataEntries = Object.entries(item.calcData[0]).slice(1);
    const lastIndex = dataEntries.length - 1;

    return {
      label: `${item.symbol} : ${annualReturn}%`, // Show stock symbol and annual return percentage in the legend
      data: dataEntries,
      fill: false,
      borderColor: getColorByIndex(index),
      tension: 0.1,
      pointRadius: dataEntries.map((_, idx) => (idx === lastIndex ? 5 : 0)), // Show only the last point
      pointStyle: isTSCO && index === datasets.length - 1 ? 'rect' : pointStyles[index % pointStyles.length], // Different shapes
      backgroundColor: getColorByIndex(index), // Set background color for solid shapes
      pointHoverRadius: 5,
      showLine: true,
    };
  });

  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full">
        <div className="flex-1">
          <div style={{ marginBottom: '20px' }}>
            <Line
              data={{
                datasets: datasets
              }}
              options={{
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
                      callback: (value) => `%${value}`,
                      padding: 10,
                    },
                    title: {
                      display: true,
                      text: 'Return',
                      padding: { top: 10 },
                    },
                    border: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2
                  },
                },
                plugins: {
                  legend: {
                    position: 'bottom',  // Moves the legend to the bottom
                    padding: 50,
                  },
                },
              }}
              plugins={[legendPaddingPlugin]} // Register the custom plugin
            />
          </div>
        </div>
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
    case 4:
      return '#36cd84';
    default:
      return '#000'; // Fallback color
  }
}

export default StockChart;
