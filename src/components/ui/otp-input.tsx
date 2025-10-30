"use client";

import React, { useRef } from "react";

export const OtpInput = ({
  length = 6,
  value = "",
  onChange,
  ...props
}: {
  length?: number;
  value?: string;
  onChange?: (val: string) => void;
}) => {
  const inputs = Array.from({ length });
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (i: number, v: string) => {
    const chars = value.split("");
    chars[i] = v.replace(/[^0-9a-zA-Z]/, "").slice(-1);
    const newValue = chars.join("");
    onChange?.(newValue);

    // Move focus to next input if value entered
    if (v && i < length - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowRight" && i < length - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text").slice(0, length);
    onChange?.(pasted);
    // Focus last input
    setTimeout(() => {
      inputRefs.current[pasted.length - 1]?.focus();
    }, 0);
    e.preventDefault();
  };

  return (
    <div className="flex gap-2">
      {inputs.map((_, i) => (
        <input
          key={i}
          ref={el => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          className="w-10 h-10 text-center border rounded focus:ring-2 focus:ring-blue-500"
          value={value[i] || ""}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          aria-label={`Digit ${i + 1}`}
          {...props}
        />
      ))}
    </div>
  );
};