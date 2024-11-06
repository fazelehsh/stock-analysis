"use client";

import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import React from 'react';
import styles from './StockChart.module.css';

Chart.register(...registerables);

interface AnnualReturn {
  annualReturn: number;
}

interface StockData {
  symbol: string;
  annualReturns: AnnualReturn[];
  calcData: Array<Record<string, number>>;
}

interface StockChartProps {
  stockDataList: StockData[];
}

interface DatasetEntry {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
  pointRadius: number[];
  pointStyle: string;
  backgroundColor: string;
  pointHoverRadius: number;
  showLine: boolean;
}

const StockChart: React.FC<StockChartProps> = ({ stockDataList }) => {
  const legendPaddingPlugin = {
    id: 'legendPadding',
    beforeInit(chart: any) {
      const originalFit = chart.legend.fit;
      chart.legend.fit = function () {
        originalFit.call(chart.legend);
        this.height += 50;
      };
    },
  };

  const pointStyles = ['circle', 'rect', 'triangle', 'cross', 'line'];

  const datasets: DatasetEntry[] = stockDataList.map((item, index) => {
    const dataEntries = Object.entries(item.calcData[0]).slice(1);

    return {
      label: `${item.symbol} : ${item.annualReturns[0]?.annualReturn || 0}%`,
      data: dataEntries.map(([_, value]) => value),
      fill: false,
      borderColor: getColorByIndex(index),
      tension: 0.1,
      pointRadius: dataEntries.map((_, idx) => (idx === dataEntries.length - 1 ? 5 : 0)),
      pointStyle: pointStyles[index % pointStyles.length],
      backgroundColor: getColorByIndex(index),
      pointHoverRadius: 5,
      showLine: true,
    };
  });

  const labels = stockDataList[0]?.calcData[0]
    ? Object.keys(stockDataList[0].calcData[0]).slice(1)
    : [];

  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full">
        <div className="flex-1">
          <div className={styles.chartContainer}>
            <Line
              data={{ labels, datasets }}
              options={{
                scales: {
                  x: {
                    grid: { display: false },
                  },
                  y: {
                    grid: { display: true },
                    ticks: {
                      callback: (tick) => (typeof tick === 'number' ? `%${tick}` : tick),
                      padding: 10,
                    },
                    title: {
                      display: true,
                      text: 'Return',
                      padding: { top: 10 },
                    },
                  },
                },
                elements: { line: { borderWidth: 2 } },
                plugins: { legend: { position: 'bottom' } },
                hover: { mode: 'index', intersect: false },
              }}
              plugins={[legendPaddingPlugin]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const getColorByIndex = (index: number): string => {
  const colors = ['#cd6a71', '#e09b47', '#05e26b', '#5c33fe', '#36cd84'];
  return colors[index % colors.length];
};

export default StockChart;
