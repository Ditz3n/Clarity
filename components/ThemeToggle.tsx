"use client";

import { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useModal } from "../context/ModalContext";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  const [isToggling, setIsToggling] = useState(false);
  const { isModalOpen } = useModal();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    if (isToggling) return;

    setIsToggling(true);
    // Immediately set the theme without delay
    setTheme(theme === "dark" ? "light" : "dark");

    // Only use one timeout to reset the toggling state
    setTimeout(() => {
      setIsToggling(false);
    }, 200); // Reduced to match the global transition duration
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        z-[100] fixed bottom-5 right-5 p-[6px] 
        bg-white dark:bg-[#272727]
        ${!isModalOpen ? 'bg-opacity-5 dark:bg-opacity-5 backdrop-filter backdrop-blur-lg bg-clip-padding' : 'bg-opacity-100 dark:bg-opacity-100'}
        border border-gray-100 dark:border-gray-700 
        transition-all duration-200 rounded-full 
        flex items-center justify-center shadow-lg
      `}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <BsSun
          className={`absolute text-[#272727] transition-all duration-200 ${
            theme === "dark" 
              ? "opacity-0 invisible scale-0" 
              : "opacity-100 visible scale-100"
          } ${
            isToggling && theme === "light" 
              ? "animate-spin-fade-out" 
              : "animate-spin-fade-in"
          } pointer-events-none`}
        />
        <BsMoon
          className={`absolute text-white transition-all duration-200 ${
            theme === "dark" 
              ? "opacity-100 visible scale-100" 
              : "opacity-0 invisible scale-0"
          } ${
            isToggling && theme === "dark" 
              ? "animate-spin-fade-out" 
              : "animate-spin-fade-in"
          } pointer-events-none`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;