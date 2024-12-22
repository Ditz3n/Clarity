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
    setIsToggling(true);
    document.documentElement.classList.toggle("dark", theme !== "dark");
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setTimeout(() => {
        setIsToggling(false);
      }, 300); // Duration of the fade-in animation
    }, 300); // Duration of the fade-out animation
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 p-[6px] bg-gray-200 dark:bg-[#272727] rounded-full transition duration-300 flex items-center justify-center"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <BsSun
          className={`absolute text-[#272727] transition-opacity duration-500 ${theme === "dark" ? "opacity-0" : "opacity-100"} ${isToggling && theme === "light" ? "animate-spin-fade-out" : ""}`}
        />
        <BsMoon
          className={`absolute text-white transition-opacity duration-500 ${theme === "dark" ? "opacity-100" : "opacity-0"} ${isToggling && theme === "dark" ? "animate-spin-fade-out" : ""}`}
        />
      </div>
    </button>
  );
};