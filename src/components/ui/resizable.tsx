"use client"

import React, { useRef, useState } from "react";
import { cn } from '../../lib/utils/cn';

interface ResizablePanelGroupProps {
  className?: string;
  children: [React.ReactNode, React.ReactNode];
  initial?: number; // initial left panel width percent
  min?: number; // min percent for left panel
  max?: number; // max percent for left panel
}

const ResizablePanelGroup: React.FC<ResizablePanelGroupProps> = ({
  className,
  children,
  initial = 50,
  min = 10,
  max = 90,
}) => {
  const [leftPercent, setLeftPercent] = useState(initial);
  const dragging = useRef(false);

  const onMouseDown = () => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
  };
  const onMouseUp = () => {
    dragging.current = false;
    document.body.style.cursor = "";
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const parent = document.getElementById("resizable-group");
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    let percent = ((e.clientX - rect.left) / rect.width) * 100;
    percent = Math.max(min, Math.min(max, percent));
    setLeftPercent(percent);
  };
  React.useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <div
      id="resizable-group"
      className={cn("flex h-full w-full", className)}
      style={{ userSelect: dragging.current ? "none" : undefined }}
    >
      <div style={{ width: `${leftPercent}%`, minWidth: 0, height: "100%" }}>{children[0]}</div>
      <ResizableHandle onMouseDown={onMouseDown} />
      <div style={{ width: `${100 - leftPercent}%`, minWidth: 0, height: "100%" }}>{children[1]}</div>
    </div>
  );
};

const ResizablePanel: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

const ResizableHandle: React.FC<{ onMouseDown?: React.MouseEventHandler<HTMLDivElement> }> = ({ onMouseDown }) => (
  <div
    onMouseDown={onMouseDown}
    className={cn(
      "relative flex w-2 cursor-col-resize items-center justify-center bg-border hover:bg-accent transition-colors z-10 select-none"
    )}
    style={{ height: "100%" }}
    tabIndex={0}
    role="separator"
    aria-orientation="vertical"
  >
    <svg width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="2" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="11" width="2" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="18" width="2" height="2" rx="1" fill="currentColor" />
    </svg>
  </div>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
