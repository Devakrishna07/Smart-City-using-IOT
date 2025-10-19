// components/Input_field1.jsx
import React from 'react';

function Input_field1({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div className="flex flex-col items-start justify-start w-[80%] m-2">
      <label className="text-xs font-azonix font-bold mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-400 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400 hover:rounded-xl"
      />
    </div>
  );
}

export default Input_field1;
