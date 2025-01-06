// context/LanguageContext.tsx | A context for managing the language of the app
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LanguageContextProps {
  language: string;
  toggleLanguage: () => void;
}

// Create a context for the language
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");

  // Set the language based on the user's browser language
  useEffect(() => {
    const userLang = navigator.language;
    if (userLang.startsWith("da")) {
      setLanguage("da");
    } else {
      setLanguage("en");
    }
  }, []);

  // Function to toggle the language
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "da" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};