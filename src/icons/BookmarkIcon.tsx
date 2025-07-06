import React from 'react';

type IconVariant = 'line' | 'solid';

export const BookmarkIcon = ({
  size = 24,
  color = 'currentColor',
  className = '',
  variant = 'line',
}: {
  size?: number;
  color?: string;
  className?: string;
  variant?: IconVariant;
}) => {
  if (variant === 'solid') {
    return (
      <svg width={size} height={size} fill={color} viewBox="0 0 24 24" className={className}>
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  // Default: line
  return (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}; 