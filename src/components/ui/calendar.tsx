import React, { useState } from 'react';
import { cn } from '../../lib/utils/cn';
import { Button } from './button';
import { ArrowIcon } from '../../icons';

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const Calendar: React.FC<CalendarProps> = ({ value, onChange, className }) => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(value || today);
  const [selected, setSelected] = useState<Date | undefined>(value);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };
  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };
  const handleSelect = (day: number) => {
    const date = new Date(year, month, day);
    setSelected(date);
    onChange?.(date);
  };

  // Generate calendar grid
  const days: (number | null)[] = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );
  while (days.length % 7 !== 0) days.push(null);

  return (
    <div className={cn('p-3 w-80 rounded-lg border bg-background', className)}>
      <div className="flex items-center justify-between mb-2">
        <Button variant="secondary" size="sm" onClick={handlePrevMonth} aria-label="Previous Month">
          <ArrowIcon variant='chevron' direction='left' className="w-4 h-4" />
        </Button>
        <span className="font-semibold text-lg">
          {viewDate.toLocaleString('default', { month: 'long' })} {year}
        </span>
        <Button variant="secondary" size="sm" onClick={handleNextMonth} aria-label="Next Month">
          <ArrowIcon variant='chevron' direction='right' className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs text-center mb-1">
        {WEEKDAYS.map((d) => (
          <span key={d} className="font-medium text-muted-foreground">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <Button
            key={i}
            disabled={day === null}
            className={cn(
              'h-9 w-9 rounded-md flex items-center justify-center',
              day && selected &&
                selected.getFullYear() === year &&
                selected.getMonth() === month &&
                selected.getDate() === day
                ? 'bg-primary text-primary-foreground' : 'hover:bg-accent',
              day === null && 'opacity-0 pointer-events-none'
            )}
            onClick={() => day && handleSelect(day)}
            aria-selected={!!(
              day &&
              selected &&
              selected.getFullYear() === year &&
              selected.getMonth() === month &&
              selected.getDate() === day
            )}
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
};
