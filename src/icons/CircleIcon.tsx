import React from 'react';

export const CircleIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="8" />
  </svg>
); 