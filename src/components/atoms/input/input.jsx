import React from 'react'
import './input.css'

function Input({ type, id, name, placeholder, value, className, checked, onChange }) {
  if (type === 'checkbox') {
    return (
      <input
        type={type}
        id={id}
        name={name}
        className={className}
        checked={checked}
        onChange={onChange}
        required
      />
    );
  }
  if (type === 'submit') {
    return (
      <input
        type={type}
        value={value}
      />
    );
  }
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      autoComplete="off"
    />
  );
}

export default Input;