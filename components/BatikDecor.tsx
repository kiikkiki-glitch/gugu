
import React from 'react';

export const BatikDecor: React.FC<{ position: 'top-right' | 'bottom-left' }> = ({ position }) => {
  const classes = position === 'top-right' 
    ? 'top-0 right-0 -mr-20 -mt-20' 
    : 'bottom-0 left-0 -ml-20 -mb-20';

  return (
    <div className={`fixed ${classes} opacity-5 rotate-12 pointer-events-none transition-all duration-700`}>
      <svg width="400" height="400" viewBox="0 0 200 200">
         <path d="M100 0 L120 80 L200 100 L120 120 L100 200 L80 120 L0 100 L80 80 Z" fill="#2d5a27" />
         <circle cx="100" cy="100" r="20" fill="#d4a373" />
      </svg>
    </div>
  );
};
