// components/Container.tsx
import React from "react";
import { clsx } from "clsx";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const Container: React.FC<ContainerProps> = ({ children, className, style, ...props }) => {
  const tailwindClass = clsx("max-w-4xl mx-auto px-4", className);

  const fallbackStyle: React.CSSProperties = {
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "0 1rem",
    ...style,
  };

  return (
    <div className={tailwindClass} style={fallbackStyle} {...props}>
      {children}
    </div>
  );
};
