import React from 'react';

const TodayTotal: React.FC<{ total: number; threshold: number }> = ({ total, threshold }) => (
  <div className="today-total">
    <span>Today: {total} ml</span>
    <span style={{ color: total >= threshold ? 'green' : 'red' }}>
      / {threshold} ml
    </span>
  </div>
);

export default TodayTotal;
