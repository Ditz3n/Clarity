import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "../../components/ThemeToggle";
import { LanguageProvider } from "../context/LanguageContext";
import ClientSessionProvider from "../../components/ClientSessionProvider";
import ScreenSizeIndicator from "../../components/ui/ScreenSizeIndicator";

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
  weight: "400", // Specify the available weight
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
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased`}
      >
        <ClientSessionProvider>
          <LanguageProvider>
            <ThemeToggle />
            {children}
            <ScreenSizeIndicator />
          </LanguageProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}