import React from 'react';

export default function Checkbox({ handleChange, className = '', ...props }) {
    const base = "rounded border-neutral-400 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";
    return (
        <input
            type="checkbox"
            {...props}
            onChange={handleChange ? (e) => handleChange(e) : props.onChange}
            className={`${base} ${className}`.trim()}
        />
    );
}
