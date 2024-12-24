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
        actionButton ? 'p-2 text-white bg-[#6C63FF] rounded-lg hover:bg-[#5953e1] dark:bg-orange-400 dark:hover:bg-[#f59f0b]' : 'rounded-md',
        'dark:bg-orange-400 dark:hover:bg-[#f59f0b] bg-[#6C63FF] rounded-lg hover:bg-[#5953e1] transition-colors p-2 text-white shadow-md',
        className
      )}
    >
      {text}
    </button>
  );
};