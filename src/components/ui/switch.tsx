import React from "react";
import { cn } from '../../lib/utils/cn';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onChange, ...props }, ref) => (
    <label className={cn("inline-flex items-center cursor-pointer", className)}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        {...props}
      />
      <span
        className={cn(
          "inline-block h-6 w-11 rounded-full border-2 border-transparent transition-colors",
          "bg-input peer-checked:bg-primary peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        <span
          className={cn(
            "block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
            "translate-x-0 peer-checked:translate-x-5"
          )}
        />
      </span>
    </label>
  )
);
Switch.displayName = "Switch";

export { Switch };
