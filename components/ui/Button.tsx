"use client";

import clsx from "clsx"; // Utility for constructing className strings conditionally
import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: string | ReactNode;
  onClick?: () => void;
  actionButton?: boolean;
  className?: string;
}

export const Button = ({ type, text, onClick, actionButton, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        actionButton ? 'bg-orange-400 rounded-full p-2 text-white' : 'rounded-md',
        'bg-orange-400 p-2 text-white shadow-md',
        className
      )}
    >
      {text}
    </button>
  );
};