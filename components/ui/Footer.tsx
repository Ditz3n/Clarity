// components/ui/Footer.tsx | The footer of the application
"use client";
import LanguageToggleTransition from "@/components/themes_and_language/LanguageToggleTransition";

export const Footer = () => {
  return (
    <footer className="w-full py-4 text-center relative z-0">
      <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base">
        © {new Date().getFullYear()} Clarity, {' '}
        <LanguageToggleTransition
          en="by"
          da="af"
        />{' '}
        <a href="https://ditz3n.github.io" className="underline" target="_blank" rel="noopener noreferrer">
          Mads Villadsen
        </a>
        .{' '}
        <LanguageToggleTransition
          en="All rights reserved."
          da="Alle rettigheder forbeholdes."
        />
      </p>
      <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base">
        <LanguageToggleTransition
          en="Developed with"
          da="Udviklet med"
        />{' '}
        <span className="dark:hidden">💙</span>
        <span className="hidden dark:inline">🧡</span>
        {' '}
        <LanguageToggleTransition
          en="using"
          da="ved brug af"
        />{' '}
        <a href="https://reactjs.org" className="underline" target="_blank" rel="noopener noreferrer">React</a>,{' '}
        <a href="https://www.prisma.io" className="underline" target="_blank" rel="noopener noreferrer">Prisma</a>,{' '}
        <a href="https://www.mongodb.com" className="underline" target="_blank" rel="noopener noreferrer">MongoDB</a>,{' '}
        <a href="https://www.nodemailer.com/" className="underline" target="_blank" rel="noopener noreferrer">Nodemailer</a>,{' '}
        <a href="https://next-auth.js.org/" className="underline" target="_blank" rel="noopener noreferrer">NextAuth.js</a>,{' '}
        <LanguageToggleTransition
          en="and"
          da="og"
        />{' '}
        <a href="https://tailwindcss.com/" className="underline" target="_blank" rel="noopener noreferrer">TailwindCSS</a>
      </p>
    </footer>
  );
};