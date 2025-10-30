"use client";

import React from "react";
import { cn } from '../../lib/utils/cn';

interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, label, ...props }, ref) => (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <span
        className={cn(
          "relative flex items-center justify-center aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <input
          ref={ref}
          type="radio"
          className="appearance-none w-full h-full rounded-full focus:outline-none"
          {...props}
        />
        {props.checked && (
          <span className="absolute left-1/2 top-1/2 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  )
);
RadioGroupItem.displayName = "RadioGroupItem";

function isRadioGroupItemElement(child: any): child is React.ReactElement<RadioGroupItemProps> {
  return (
    React.isValidElement(child) &&
    (child.type as any).displayName === 'RadioGroupItem' &&
    child.type === RadioGroupItem
  );
}

const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ className, name, value, onChange, children, style }, ref) => (
    <fieldset ref={ref} className={cn("grid gap-2", className)} style={style}>
      {React.Children.map(children, (child) => {
        if (isRadioGroupItemElement(child)) {
          // Only pass known props to input elements
          return React.cloneElement(child, {
            name,
            checked: value !== undefined ? child.props.value === value : undefined,
            onChange: onChange
              ? (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
              : child.props.onChange,
          });
        }
        return child;
      })}
    </fieldset>
  )
);
RadioGroup.displayName = "RadioGroup";

export { RadioGroup, RadioGroupItem };
