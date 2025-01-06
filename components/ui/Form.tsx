// components/ui/Form.tsx | A form component to handle form submission
"use client";
import { useRef, ReactNode } from "react";

// Interface to define the props for the Form component
interface FormProps {
  children: ReactNode;
  action: (FormData: FormData) => Promise<void | boolean>;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void; 
}

// Form component to handle form submission
export const Form = ({children, action, className, onSubmit}: FormProps) => {

  // useRef to reference the form element
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
    className={className}
    ref={ref}
    onSubmit={onSubmit}
    action={async (formData) => {
      await action(formData);
      ref.current?.reset(); // Reset the form after submission
    }}
    >
      {children}
    </form>
  )
}
