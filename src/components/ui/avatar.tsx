"use client"

import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, size = 40, className, ...props }) => (
  <div
    className={cn('relative flex shrink-0 overflow-hidden rounded-full bg-muted', className)}
    style={{ width: size, height: size }}
    {...props}
  >
    {src ? (
      <img
        src={src}
        alt={alt}
        className="aspect-square h-full w-full object-cover rounded-full"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground">
        {fallback || (alt ? alt[0] : '?')}
      </div>
    )}
  </div>
);
