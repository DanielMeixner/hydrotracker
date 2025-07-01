import React, { useState } from 'react';

const CustomIntakeInput: React.FC<{ onLog: (amount: number) => void }> = ({ onLog }) => {
  const [value, setValue] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const amount = parseInt(value, 10);
        if (!isNaN(amount) && amount > 0) {
          onLog(amount);
          setValue('');
        }
      }}
    >
      <input
        type="number"
        min="1"
        placeholder="Custom (ml)"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CustomIntakeInput;
