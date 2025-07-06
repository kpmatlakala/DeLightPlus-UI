import React from 'react';

type IconVariant = 'line' | 'solid';

export const StarIcon = ({
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
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }
  // Default: line
  return (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}; 