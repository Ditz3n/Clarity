"use client";

import { on } from "events";
import { useRef, ReactNode } from "react";

// Interface to define the props for the Form component
interface FormProps {
  children: ReactNode;
  action: (FormData: FormData) => Promise <void | boolean>;
  className?: string;
  OnSubmit?: () => void;
}

// Form component to handle form submission
export const Form = ({children, action, className, OnSubmit}: FormProps) => {

  // useRef to reference the form element
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
    className={className}
    ref={ref}
    onSubmit={OnSubmit}
    action={async (formData) => {
      await action(formData);
      ref.current?.reset(); // Reset the form after submission
    }}
    >
      {children}
    </form>
  )
}
