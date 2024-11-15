import React from 'react';

export default function Button({ children, variant, className, ...props }) {
  return (
    <button 
      className={`px-4 py-2 rounded ${
        variant === 'outline' ? 'border border-gray-300 hover:bg-gray-50' : 'bg-blue-500 hover:bg-blue-600 text-white'
      } ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}