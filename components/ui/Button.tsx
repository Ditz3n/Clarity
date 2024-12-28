"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

type ButtonVariant = "default" | "logout" | "profile";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string | ReactNode;
  onClick?: () => void;
  actionButton?: boolean;
  className?: string;
  variant?: ButtonVariant;
  language?: string;
}

export const Button = ({ 
  type = "button",
  text,
  onClick,
  actionButton,
  className,
  variant = "default",
  language,
}: ButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (variant === "logout") {
      signOut({ callbackUrl: "/login" });
    } else if (variant === "profile") {
      router.push("/profile");
    } else if (onClick) {
      onClick();
    }
  };

  const getButtonContent = () => {
    switch (variant) {
      case "logout":
        return (
          <>
            {language === "en" ? "Logout" : "Log ud"}
            <FaSignOutAlt className="ml-2" />
          </>
        );
      case "profile":
        return (
          <>
            <CgProfile className="w-5 h-5" />
            <span className="ml-2">{language === "en" ? "Profile" : "Profil"}</span>
          </>
        );
      default:
        return text;
    }
  };

  const getButtonStyles = () => {
    switch (variant) {
      case "logout":
        return "mt-4 px-4 py-2 shadow-md flex items-center dark:bg-[#fb923c] dark:hover:bg-[#f59f0b] bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors";
      case "profile":
        return clsx(
          "flex items-center space-x-2 px-4 mt-4 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors",
        );
      default:
        return clsx(
          actionButton ? 'p-2 text-white bg-[#6C63FF] rounded-lg hover:bg-[#5953e1] dark:bg-orange-400 dark:hover:bg-[#f59f0b]' : 'rounded-md',
          'dark:bg-orange-400 dark:hover:bg-[#f59f0b] bg-[#6C63FF] rounded-lg hover:bg-[#5953e1] transition-colors p-2 text-white shadow-md'
        );
    }
  };

  return (
    <button
      onClick={handleClick}
      type={type}
      className={clsx(getButtonStyles(), className)}
    >
      {getButtonContent()}
    </button>
  );
};