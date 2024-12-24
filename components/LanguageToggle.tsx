// components/LanguageToggle.tsx
"use client";

import { useLanguage } from "../context/LanguageContext";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button onClick={toggleLanguage} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
      {language === "en" ? "Switch to Danish" : "Switch to English"}
    </button>
  );
};