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
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setIsToggling(false);
    }, 500); // Duration of the animation
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 p-2 bg-gray-200 dark:bg-gray-800 rounded-full transition duration-300 flex items-center justify-center"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <BsSun
          className={`absolute transition-opacity duration-500 ${theme === "dark" ? "opacity-0" : "opacity-100"} ${isToggling ? "animate-spin-fade-out" : ""}`}
          style={{ color: "yellow" }}
        />
        <BsMoon
          className={`absolute transition-opacity duration-500 ${theme === "dark" ? "opacity-100" : "opacity-0"} ${isToggling ? "animate-spin-fade-in" : ""}`}
          style={{ color: "black" }}
        />
      </div>
    </button>
  );
};