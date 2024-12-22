"use client";

// src/context/LanguageContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LanguageContextProps {
  language: string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const userLang = navigator.language;
    if (userLang.startsWith("da")) {
      setLanguage("da");
    } else {
      setLanguage("en");
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "da" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};