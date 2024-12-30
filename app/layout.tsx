import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Lobster } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageToggle } from "../components/LanguageToggle";
import { LanguageProvider } from "../context/LanguageContext";
import ClientSessionProvider from "../components/ClientSessionProvider";
import ScreenSizeIndicator from "../components/ui/ScreenSizeIndicator";
import { ThemeTransitionScript } from "../components/ThemeTransitionScript";
import { ModalProvider } from "../context/ModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Clarity - Tasks made simple",
  description: "Clarity - A simple TODO app made with Next.js",
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Clarity" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${lobster.variable} antialiased`}
      >
        <ClientSessionProvider>
          <LanguageProvider>
            <ModalProvider>
              <ThemeTransitionScript />
              <LanguageToggle />
              <ThemeToggle />
              {children}
              <ScreenSizeIndicator />
            </ModalProvider>
          </LanguageProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}