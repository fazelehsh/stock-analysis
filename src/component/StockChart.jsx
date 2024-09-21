
import { Line } from "react-chartjs-2";



const StockChart = () => {
  return <Line data={{
    labels: ["a" , "b" , "c" , "d" ,"e" , "f" , "g"],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'My First Dataset',
      data: [75, 69, 90, 91, 66, 65, 50],
      fill: false,
      borderColor: 'rgb(20, 20, 192)',
      tension: 0.1
    } , 
    {
      label: 'My First Dataset',
      data: [75, 1, 88, 91, 66, 100, 50],
      fill: false,
      borderColor: 'rgb(30, 920, 192)',
      tension: 0.1
    }]
  }} />
}

export default StockChart;

