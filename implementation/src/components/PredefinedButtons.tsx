import React from 'react';

interface PredefinedButtonsProps {
  onClick: (amount: number) => void;
}

const buttons = [200, 300, 500];

const PredefinedButtons: React.FC<PredefinedButtonsProps> = ({ onClick }) => (
  <div className="predefined-buttons">
    {buttons.map((amount) => (
      <button key={amount} onClick={() => onClick(amount)} aria-label={`Add ${amount} milliliters`}>
        {amount} ml
      </button>
    ))}
  </div>
);

export default PredefinedButtons;
