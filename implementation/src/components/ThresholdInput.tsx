import React, { useState } from 'react';

interface ThresholdInputProps {
  threshold: number;
  onSet: (value: number) => void;
}

const ThresholdInput: React.FC<ThresholdInputProps> = ({ threshold, onSet }) => {
  const [value, setValue] = useState(threshold.toString());

  const handleSet = () => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      onSet(num);
    }
  };

  return (
    <div className="threshold-input">
      <input
        type="number"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Set daily threshold (ml)"
        min={0}
        aria-label="Set daily threshold in milliliters"
      />
      <button onClick={handleSet} aria-label="Set threshold">Set</button>
    </div>
  );
};

export default ThresholdInput;
