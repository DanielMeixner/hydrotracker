import React from 'react';

interface BarChartProps {
  data: number[];
  max: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, max }) => (
  <div className="bar-chart">
    {data.map((value, idx) => (
      <div
        key={idx}
        className="bar"
        style={{ height: `${(value / max) * 100}%` }}
        title={`${value} ml`}
      />
    ))}
  </div>
);

export default BarChart;
