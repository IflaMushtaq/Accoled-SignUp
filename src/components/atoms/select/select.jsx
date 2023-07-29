import React from 'react';
import './select.css'

const Select = ({ id, name, value, onChange, options }) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange} 
      required
    >
      <option value="">Select Country</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
