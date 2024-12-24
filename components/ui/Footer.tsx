"use client";
import { useLanguage } from "../../context/LanguageContext";

export const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="w-full py-4 text-center">
      <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base">
        © {new Date().getFullYear()} Clarity. All rights reserved.
      </p>
      <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base">
        {language === "en"
          ? <>
              Developed with <span className="dark:hidden">💙</span><span className="hidden dark:inline">🧡</span> using <a href="https://reactjs.org" className="underline" target="_blank" rel="noopener noreferrer">React</a>, <a href="https://www.prisma.io" className="underline" target="_blank" rel="noopener noreferrer">Prisma</a>, <a href="https://www.mongodb.com" className="underline" target="_blank" rel="noopener noreferrer">MongoDB</a>, and <a href="https://tailwindcss.com" className="underline" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>.
            </>
          : <>
              Udviklet med <span className="dark:hidden">💙</span><span className="hidden dark:inline">🧡</span> ved hjælp af <a href="https://reactjs.org" className="underline" target="_blank" rel="noopener noreferrer">React</a>, <a href="https://www.prisma.io" className="underline" target="_blank" rel="noopener noreferrer">Prisma</a>, <a href="https://www.mongodb.com" className="underline" target="_blank" rel="noopener noreferrer">MongoDB</a> og <a href="https://tailwindcss.com" className="underline" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>.
            </>
        }
      </p>
    </footer>
  );
};