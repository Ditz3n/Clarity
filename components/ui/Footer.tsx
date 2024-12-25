"use client";
import { useLanguage } from "../../context/LanguageContext";

export const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="w-full py-4 text-center">
      <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base">
        {language === "en"
        ? <> 
            © {new Date().getFullYear()} Clarity, by <a href="https://ditz3n.github.io" className="underline" target="_blank" rel="noopener noreferrer">Mads Villadsen</a>. All rights reserved.
          </>
        : <>
            © {new Date().getFullYear()} Clarity, af <a href="https://ditz3n.github.io" className="underline" target="_blank" rel="noopener noreferrer">Mads Villadsen</a>. Alle rettigheder forbeholdes.
          </>
        }
      </p>
      <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base">
        {language === "en"
          ? <>
              Developed with <span className="dark:hidden">💙</span><span className="hidden dark:inline">🧡</span> using <a href="https://reactjs.org" className="underline" target="_blank" rel="noopener noreferrer">React</a>, <a href="https://www.prisma.io" className="underline" target="_blank" rel="noopener noreferrer">Prisma</a>, <a href="https://www.mongodb.com" className="underline" target="_blank" rel="noopener noreferrer">MongoDB</a>, <a href="https://www.nodemailer.com/" className="underline" target="_blank" rel="noopener noreferrer">Nodemailer</a>, <a href="https://next-auth.js.org/" className="underline" target="_blank" rel="noopener noreferrer">NextAuth.js</a>, and <a href="https://tailwindcss.com/" className="underline" target="_blank" rel="noopener noreferrer">TailwindCSS</a>
            </>
          : <>
              Udviklet med <span className="dark:hidden">💙</span><span className="hidden dark:inline">🧡</span> ved brug af <a href="https://reactjs.org" className="underline" target="_blank" rel="noopener noreferrer">React</a>, <a href="https://www.prisma.io" className="underline" target="_blank" rel="noopener noreferrer">Prisma</a>, <a href="https://www.mongodb.com" className="underline" target="_blank" rel="noopener noreferrer">MongoDB</a>, <a href="https://www.nodemailer.com/" className="underline" target="_blank" rel="noopener noreferrer">Nodemailer</a>, <a href="https://next-auth.js.org/" className="underline" target="_blank" rel="noopener noreferrer">NextAuth.js</a>, og <a href="https://tailwindcss.com/" className="underline" target="_blank" rel="noopener noreferrer">TailwindCSS</a>
            </>
        }
      </p>
    </footer>
  );
};