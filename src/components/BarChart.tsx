import React from 'react';

interface BarChartProps {
  data: number[];
  labels: string[];
}

const BarChart: React.FC<BarChartProps> = ({ data, labels }) => (
  <div className="bar-chart">
    {data.map((value, i) => (
      <div key={i} className="bar-container">
        <div className="bar" style={{ height: `${value / 10}px` }} />
        <span className="bar-label">{labels[i]}</span>
      </div>
    ))}
  </div>
);

export default BarChart;
