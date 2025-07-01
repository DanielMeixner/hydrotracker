import React from 'react';

const IntakeButtons: React.FC<{ onLog: (amount: number) => void }> = ({ onLog }) => (
  <div className="intake-buttons">
    <button onClick={() => onLog(250)}>Glass (250ml)</button>
    <button onClick={() => onLog(125)}>Half glass (125ml)</button>
    <button onClick={() => onLog(500)}>Bottle (500ml)</button>
  </div>
);

export default IntakeButtons;
