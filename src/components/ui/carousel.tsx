import React, { useState } from 'react';
import { cn } from '../../lib/utils/cn';
import { Button } from './button';
import { ArrowIcon } from '../../icons';

export interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({ children, className }) => {
  const [current, setCurrent] = useState(0);
  const total = React.Children.count(children);

  const goTo = (idx: number) => setCurrent((idx + total) % total);

  return (
    <div className={cn('relative w-full', className)}>
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${current * 100}%)` }}>
          {React.Children.map(children, (child, idx) => (
            <div className="w-full flex-shrink-0">{child}</div>
          ))}
        </div>
      </div>
      <Button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
        variant="secondary"
        size="sm"
        onClick={() => goTo(current - 1)}
        aria-label="Previous"
      >
        <ArrowIcon variant='chevron' direction='left' className="w-5 h-5" />
      </Button>
      <Button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
        variant="secondary"
        size="sm"
        onClick={() => goTo(current + 1)}
        aria-label="Next"
      >
        <ArrowIcon variant='chevron' direction='right' className="w-5 h-5" />
      </Button>
      <div className="flex justify-center mt-2 gap-2">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            className={cn(
              'w-2 h-2 rounded-full',
              idx === current ? 'bg-primary' : 'bg-muted'
            )}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
