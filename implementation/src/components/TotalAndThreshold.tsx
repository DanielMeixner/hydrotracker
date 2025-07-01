import React from 'react';

interface TotalAndThresholdProps {
  total: number;
  threshold: number;
}


const TotalAndThreshold: React.FC<TotalAndThresholdProps> = ({ total, threshold }) => {
  const status = total >= threshold ? 'over' : total >= threshold * 0.8 ? 'near' : 'under';
  return (
    <div className="total-threshold">
      <div>
        Today: <strong className={`threshold-status ${status}`}>{total} ml</strong>
      </div>
      <div>Threshold: <strong>{threshold} ml</strong></div>
    </div>
  );
};

export default TotalAndThreshold;
