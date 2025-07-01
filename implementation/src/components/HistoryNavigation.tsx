import React from 'react';

interface HistoryNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

const HistoryNavigation: React.FC<HistoryNavigationProps> = ({ onPrev, onNext, canPrev, canNext }) => (
  <div className="history-navigation">
    <button onClick={onPrev} disabled={!canPrev} aria-label="Previous day">&lt; Prev</button>
    <button onClick={onNext} disabled={!canNext} aria-label="Next day">Next &gt;</button>
  </div>
);

export default HistoryNavigation;
