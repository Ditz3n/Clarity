// components/ui/Button.tsx | A button component with different variants for the application
"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import LanguageToggleTransition from "@/components/themes_and_language/LanguageToggleTransition";

type ButtonVariant = "default" | "logout" | "profile";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string | ReactNode;
  onClick?: () => void;
  actionButton?: boolean;
  className?: string;
  variant?: ButtonVariant;
  children?: ReactNode; // Add children prop
}

export const Button = ({ 
  type = "button",
  text,
  onClick,
  actionButton,
  className,
  variant = "default",
  children, // Add children prop
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
            <LanguageToggleTransition en="Logout" da="Log ud" /> {/* Text on the left */}
            <FaSignOutAlt className="w-5 h-5 ml-2" /> {/* Icon on the right */}
          </>
        );
      case "profile":
        return (
          <>
            <LanguageToggleTransition en="Profile" da="Profil" /> {/* Text on the left */}
            <CgProfile className="w-5 h-5 ml-2" /> {/* Icon on the right */}
          </>
        );
      default:
        return children || text; // Use children if provided, otherwise fallback to text
    }
  };

  const getButtonStyles = () => {
    switch (variant) {
      case "logout":
        return "mt-4 w-[112px] py-2 shadow-md dark:bg-[#fb923c] dark:hover:bg-[#f59f0b] bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors flex items-center justify-between px-4"; 
      case "profile":
        return clsx(
          "mt-4 w-[112px] py-2 shadow-md dark:bg-[#fb923c] dark:hover:bg-[#f59f0b] bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors flex items-center justify-between px-4" 
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