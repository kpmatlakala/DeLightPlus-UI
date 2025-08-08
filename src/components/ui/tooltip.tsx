"use client"

import React, { useState, useRef, useEffect } from "react"

type TooltipProps = {
  children: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  offset?: number
}

export function Tooltip({
  children,
  content,
  side = "top",
  offset = 8,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current) return

    const trigger = triggerRef.current
    const tooltip = tooltipRef.current
    const triggerRect = trigger.getBoundingClientRect()

    let top = 0
    let left = 0

    const tooltipRect = tooltip.getBoundingClientRect()

    switch (side) {
      case "top":
        top = triggerRect.top - tooltipRect.height - offset
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case "bottom":
        top = triggerRect.bottom + offset
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case "left":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left - tooltipRect.width - offset
        break
      case "right":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + offset
        break
    }

    tooltip.style.top = `${top}px`
    tooltip.style.left = `${left}px`
  }, [visible, side, offset])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{ display: "inline-block" }}
      >
        {children}
      </div>
      {visible && (
        <div
          ref={tooltipRef}
          style={{
            position: "fixed",
            zIndex: 9999,
            backgroundColor: "black",
            color: "white",
            padding: "6px 10px",
            fontSize: "0.875rem",
            borderRadius: "4px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s ease",
          }}
        >
          {content}
        </div>
      )}
    </>
  )
}
