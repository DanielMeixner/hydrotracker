import React, { useState } from 'react';

interface CustomInputProps {
  onAdd: (amount: number) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      onAdd(num);
      setValue('');
    }
  };

  return (
    <div className="custom-input">
      <input
        type="number"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Custom amount (ml)"
        aria-label="Custom amount in milliliters"
      />
      <button onClick={handleAdd} aria-label="Add custom amount">Add</button>
    </div>
  );
};

export default CustomInput;
