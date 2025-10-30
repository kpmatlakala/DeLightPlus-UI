"use client"

import * as React from "react"
import { cn } from "../../lib/utils/cn"
import { Label } from "./label"
import { Slot } from "./slot"

// --------------------
// Form Context
// --------------------
type FormContextValue = {
  values: Record<string, any>
  setValue: (name: string, value: any) => void
}

const FormContext = React.createContext<FormContextValue | undefined>(undefined)

const Form: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [values, setValues] = React.useState<Record<string, any>>({})

  const setValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <FormContext.Provider value={{ values, setValue }}>
      <form>{children}</form>
    </FormContext.Provider>
  )
}

// --------------------
// FormItem
// --------------------
type FormItemContextValue = { id: string }
const FormItemContext = React.createContext<FormItemContextValue | undefined>(
  undefined
)

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId()
    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    )
  }
)
FormItem.displayName = "FormItem"

// --------------------
// FormField
// --------------------
type FormFieldProps = {
  name: string
  children: React.ReactNode
}

const FormFieldContext = React.createContext<{ name: string } | undefined>(
  undefined
)

const FormField: React.FC<FormFieldProps> = ({ name, children }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const formContext = React.useContext(FormContext)

  if (!fieldContext) throw new Error("useFormField must be inside <FormField>")
  if (!itemContext) throw new Error("useFormField must be inside <FormItem>")
  if (!formContext) throw new Error("useFormField must be inside <Form>")

  const { name } = fieldContext
  const { id } = itemContext
  const value = formContext.values[name]

  return {
    id,
    name,
    value,
    setValue: (val: any) => formContext.setValue(name, val),
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  }
}

// --------------------
// UI Components
// --------------------
const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    const { formItemId } = useFormField()
    return <Label ref={ref} htmlFor={formItemId} className={className} {...props} />
  }
)
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ ...props }, ref) => {
    const { formItemId } = useFormField()
    return <Slot ref={ref} id={formItemId} {...props} />
  }
)
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()
  return <p ref={ref} id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { formMessageId } = useFormField()
  return <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props} />
})
FormMessage.displayName = "FormMessage"

// --------------------
// Exports
// --------------------
export {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
}
