import * as React from "react";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * The `Slot` component allows passing props (and ref) to a child element via `asChild`.
 * Useful for polymorphic components like Button, Badge, etc.
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      // Merge ref if the child already has one
      const existingRef = (children as any).ref;

      return React.cloneElement(children, {
        ...children.props,
        ...props,
        ref: mergeRefs(ref, existingRef),
      });
    }

    return <>{children}</>;
  }
);

Slot.displayName = "Slot";

/**
 * Merges multiple refs into one — useful when cloning elements.
 */
function mergeRefs<T = any>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null && typeof ref === "object") {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
