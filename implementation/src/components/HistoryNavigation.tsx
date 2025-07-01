import React from 'react';

interface HistoryNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

const HistoryNavigation: React.FC<HistoryNavigationProps> = ({ onPrev, onNext, canPrev, canNext }) => (
  <div className="history-navigation">
    <button onClick={onPrev} disabled={!canPrev}>&lt; Prev</button>
    <button onClick={onNext} disabled={!canNext}>Next &gt;</button>
  </div>
);

export default HistoryNavigation;
