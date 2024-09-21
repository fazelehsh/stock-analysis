
import { Line } from "react-chartjs-2";



const StockChart = (props) => {
  return <Line data={{
    datasets: [{
      label: props.stockData.year,
      data: Object.entries(props.stockData).slice(1),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }} options={{
    parsing: {
      xAxisKey: '[0]',
      yAxisKey: '[1]'
    }
  }} />
}

export default StockChart;

