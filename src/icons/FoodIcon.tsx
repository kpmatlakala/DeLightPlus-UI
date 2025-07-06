import React from 'react';

export const FoodIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 3v7a4 4 0 0 0 4 4v7" />
    <path d="M8 3v7a4 4 0 0 1-4 4v7" />
    <path d="M20 21V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v14" />
  </svg>
); 