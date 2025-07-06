import React from 'react';

type IconVariant = 'line' | 'solid';

export const HeartIcon = ({
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
        <path d="M12 21s-6.2-4.35-9.2-7.35A5.5 5.5 0 0 1 12 5.5a5.5 5.5 0 0 1 9.2 8.15C18.2 16.65 12 21 12 21z" />
      </svg>
    );
  }
  // Default: line
  return (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-6.2-4.35-9.2-7.35A5.5 5.5 0 0 1 12 5.5a5.5 5.5 0 0 1 9.2 8.15C18.2 16.65 12 21 12 21z" />
    </svg>
  );
}; 