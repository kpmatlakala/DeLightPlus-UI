import React from "react";

type VolumeVariant = "mute" | "low" | "medium" | "high" | "max";

export const VolumeIcon = ({
  size = 24,
  color = "currentColor",
  className = "",
  variant = "medium",
}: {
  size?: number;
  color?: string;
  className?: string;
  variant?: VolumeVariant;
}) => {
  let paths: React.ReactNode;
  switch (variant) {
    case "mute":
      paths = (
        <>
          <path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4A.7.7 0 0 0 11 19.3V4.7z" />
          <line x1="16" y1="8" x2="22" y2="16" stroke={color} strokeWidth={2} />
          <line x1="22" y1="8" x2="16" y2="16" stroke={color} strokeWidth={2} />
        </>
      );
      break;
    case "low":
      paths = (
        <>
          <path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4A.7.7 0 0 0 11 19.3V4.7z" />
          <path d="M15 12a3 3 0 0 0-3-3" />
        </>
      );
      break;
    case "medium":
      paths = (
        <>
          <path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4A.7.7 0 0 0 11 19.3V4.7z" />
          <path d="M15 12a3 3 0 0 0-3-3" />
          <path d="M17.5 8.5a6 6 0 0 1 0 7" />
        </>
      );
      break;
    case "high":
      paths = (
        <>
          <path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4A.7.7 0 0 0 11 19.3V4.7z" />
          <path d="M15 12a3 3 0 0 0-3-3" />
          <path d="M17.5 8.5a6 6 0 0 1 0 7" />
          <path d="M20 6a9 9 0 0 1 0 12" />
        </>
      );
      break;
    case "max":
      paths = (
        <>
          <path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4A.7.7 0 0 0 11 19.3V4.7z" />
          <path d="M15 12a3 3 0 0 0-3-3" />
          <path d="M17.5 8.5a6 6 0 0 1 0 7" />
          <path d="M20 6a9 9 0 0 1 0 12" />
          <path d="M22 4a12 12 0 0 1 0 16" />
        </>
      );
      break;
    default:
      paths = null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      className={className}
      strokeWidth={2}
    >
      {paths}
    </svg>
  );
};


/*
Usage Examples:
<VolumeIcon variant="mute" />
<VolumeIcon variant="low" />
<VolumeIcon variant="medium" />
<VolumeIcon variant="high" />
<VolumeIcon variant="max" />
*/