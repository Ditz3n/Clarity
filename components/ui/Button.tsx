"use client";

import clsx from "clsx"; // Utility for constructing className strings conditionally
import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: string | ReactNode;
  OnClick?: () => void;
  actionButton?: boolean;
  className?: string;
}

export const Button = ({ type, text, OnClick, actionButton, className }: ButtonProps) => {
  return (
    <button
      onClick={OnClick}
      type={type}
      className={clsx(
        actionButton && 'bg-orange-400 rounded-full p-2 text-white',
        'bg-orange-400 p-2 text-white',
        className
      )}
    >
      {text}
    </button>
  );
};