// components/Tooltip.tsx
'use client';

import React from 'react';

interface TooltipProps {
  message: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  return (
    <div className="group relative flex justify-start items-center">
      {children}
      <span className="absolute bottom-full scale-0 translate-x-8 translate-y-7 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap">
        {message}
      </span>
    </div>
  );
};

export default Tooltip;
