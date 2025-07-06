import React from 'react';

export const AnalyticsIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="8" />
    <rect x="9" y="8" width="4" height="12" />
    <rect x="15" y="4" width="4" height="16" />
  </svg>
); 