import React from 'react';

interface TotalAndThresholdProps {
  total: number;
  threshold: number;
}

const TotalAndThreshold: React.FC<TotalAndThresholdProps> = ({ total, threshold }) => (
  <div className="total-threshold">
    <div>Today: <strong>{total} ml</strong></div>
    <div>Threshold: <strong>{threshold} ml</strong></div>
  </div>
);

export default TotalAndThreshold;
