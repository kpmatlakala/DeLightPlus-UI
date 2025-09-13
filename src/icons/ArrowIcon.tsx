import React from "react";

type ArrowDirection = "up" | "down" | "left" | "right";
type ArrowVariant = "chevron" | "arrow-small" | "arrow-big";

export const ArrowIcon = ({
  size = 24,
  color = "currentColor",
  className = "",
  direction = "right",
  variant = "chevron",
}: {
  size?: number;
  color?: string;
  className?: string;
  direction?: ArrowDirection;
  variant?: ArrowVariant;
}) => {
  let element: React.ReactNode;

  // Define the SVG for each variant
  switch (variant) {
    case "chevron":
      element = <polyline points="6 9 12 15 18 9" />;
      break;
    case "arrow-small":
      element = (
        <>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </>
      );
      break;
    case "arrow-big":
      element = (
        <>
          <line x1="4" y1="12" x2="20" y2="12" />
          <polyline points="14 6 20 12 14 18" />
        </>
      );
      break;
    default:
      element = <polyline points="6 9 12 15 18 9" />;
  }

  // Rotation for direction
  let rotation = 0;
  switch (direction) {
    case "up":
      rotation = -90;
      break;
    case "down":
      rotation = 90;
      break;
    case "left":
      rotation = 180;
      break;
    case "right":
    default:
      rotation = 0;
  }

  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      className={className}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {element}
    </svg>
  );
};

/* Usage Examples:
<ArrowIcon direction="right" variant="chevron" />
<ArrowIcon direction="left" variant="arrow-small" />
<ArrowIcon direction="down" variant="arrow-big" />*/