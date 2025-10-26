"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "../../lib/utils/cn"
import { Slot } from "./slot"

// Drawer Context
interface DrawerContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DrawerContext = React.createContext<DrawerContextValue | undefined>(undefined)

const useDrawerContext = () => {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer")
  }
  return context
}

// Main Drawer Component
interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  shouldScaleBackground?: boolean
}

const Drawer = ({ 
  open: controlledOpen, 
  onOpenChange, 
  children, 
  shouldScaleBackground = true 
}: DrawerProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  
  const setOpen = React.useCallback((newOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newOpen)
    } else {
      setInternalOpen(newOpen)
    }
  }, [isControlled, onOpenChange])

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const contextValue = React.useMemo(() => ({
    open,
    setOpen
  }), [open, setOpen])

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  )
}
Drawer.displayName = "Drawer"

// Drawer Trigger
interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: React.ReactNode
}

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ children, asChild = false, onClick, ...props }, ref) => {
    const { setOpen } = useDrawerContext()
    const Comp = asChild ? Slot : "button"
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(true)
      onClick?.(e)
    }
    
    return (
      <Comp ref={ref} onClick={handleClick} {...props}>
        {children}
      </Comp>
    )
  }
)
DrawerTrigger.displayName = "DrawerTrigger"

// Drawer Portal
interface DrawerPortalProps {
  children: React.ReactNode
}

const DrawerPortal = ({ children }: DrawerPortalProps) => {
  const { open } = useDrawerContext()
  
  if (!open) return null
  
  return createPortal(children, document.body)
}
DrawerPortal.displayName = "DrawerPortal"

// Drawer Close
interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: React.ReactNode
}

const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ children, asChild = false, onClick, ...props }, ref) => {
    const { setOpen } = useDrawerContext()
    const Comp = asChild ? Slot : "button"
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false)
      onClick?.(e)
    }
    
    return (
      <Comp ref={ref} onClick={handleClick} {...props}>
        {children}
      </Comp>
    )
  }
)
DrawerClose.displayName = "DrawerClose"

// Drawer Overlay
interface DrawerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { setOpen } = useDrawerContext()
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      setOpen(false)
      onClick?.(e)
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black/80 transition-opacity",
          className
        )}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
DrawerOverlay.displayName = "DrawerOverlay"

// Drawer Content
interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  children: React.ReactNode
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    
    return (
      <DrawerPortal>
        <DrawerOverlay />
        <Comp
          ref={ref}
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mt-16 flex h-auto flex-col rounded-t-[8px] border bg-background transition-transform",
            className
          )}
          {...props}
        >
          {!asChild && (
            <div 
              className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" 
            />
          )}
          {children}
        </Comp>
      </DrawerPortal>
    )
  }
)
DrawerContent.displayName = "DrawerContent"

// Drawer Header
interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-1.5 p-4 text-center sm:text-left",
          className
        )}
        {...props}
      />
    )
  }
)
DrawerHeader.displayName = "DrawerHeader"

// Drawer Footer
interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mt-auto flex flex-col gap-2 p-4 bg-secondary/50",
          className
        )}
        {...props}
      />
    )
  }
)
DrawerFooter.displayName = "DrawerFooter"

// Drawer Title
interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          "text-lg font-semibold leading-none tracking-tight text-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
DrawerTitle.displayName = "DrawerTitle"

// Drawer Description
interface DrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "text-sm text-muted-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
