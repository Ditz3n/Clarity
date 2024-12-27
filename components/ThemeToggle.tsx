"use client";

import { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    if (isToggling) return;

    setIsToggling(true);

    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 300);

    setTimeout(() => {
      setIsToggling(false);
    }, 600);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 p-[6px] bg-white bg-opacity-5 dark:bg-[#272727] dark:bg-opacity-5 bg-clip-padding backdrop-filter backdrop-blur-lg border border-gray-100 dark:border-gray-700 transition duration-300 rounded-full flex items-center justify-center shadow-lg"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <BsSun
          className={`absolute text-[#272727] transition-all duration-300 ${
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
          className={`absolute text-white transition-all duration-300 ${
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