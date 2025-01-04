// ThemeToggle.tsx
"use client";
import { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useModal } from "../context/ModalContext";
import { createPortal } from 'react-dom';

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  const [isToggling, setIsToggling] = useState(false);
  const { isAnyModalOpen } = useModal();
  const shouldBeTransparent = !isAnyModalOpen();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("theme-transition");
      root.classList.add("dark");
    } else {
      root.classList.add("theme-transition");
      root.classList.remove("dark");
    }

    // Remove transition class after animation completes
    const timeout = setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 200); // Match this with your CSS transition duration

    return () => clearTimeout(timeout);
  }, [theme]);

  const toggleTheme = () => {
    if (isToggling) return;

    setIsToggling(true);
    setTheme(theme === "dark" ? "light" : "dark");

    setTimeout(() => {
      setIsToggling(false);
    }, 200);
  };

  if (!mounted) return null;

  return createPortal(
    <button
      onClick={toggleTheme}
      className={`
        fixed bottom-5 right-5 p-[6px]
        bg-white dark:bg-[#272727]
        ${shouldBeTransparent ? 'bg-opacity-5 dark:bg-opacity-5' : 'bg-opacity-100 dark:bg-opacity-100'}
        border border-gray-100 dark:border-gray-700
        transition-all duration-200 rounded-full
        flex items-center justify-center shadow-lg
        backdrop-filter backdrop-blur-lg bg-clip-padding
      `}
      style={{ zIndex: 100000 }}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <BsSun
          className={`absolute text-[#272727] transition-all duration-200 ${
            theme === "dark" ? "opacity-0 invisible scale-0" : "opacity-100 visible scale-100"
          } ${isToggling && theme === "light" ? "animate-spin-fade-out" : "animate-spin-fade-in"}`}
        />
        <BsMoon
          className={`absolute text-white transition-all duration-200 ${
            theme === "dark" ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"
          } ${isToggling && theme === "dark" ? "animate-spin-fade-out" : "animate-spin-fade-in"}`}
        />
      </div>
    </button>,
    document.body
  );
};