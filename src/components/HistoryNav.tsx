import React from 'react';

const HistoryNav: React.FC<{ onPrev: () => void; onNext: () => void; canPrev: boolean; canNext: boolean }> = ({ onPrev, onNext, canPrev, canNext }) => (
  <div className="history-nav">
    <button onClick={onPrev} disabled={!canPrev}>&lt; Prev</button>
    <button onClick={onNext} disabled={!canNext}>Next &gt;</button>
  </div>
);

export default HistoryNav;
