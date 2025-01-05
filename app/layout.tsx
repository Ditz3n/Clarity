// app/layout.tsx | The layout component for the entire Next.js application
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Lobster } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/themes_and_language/ThemeToggle";
import { LanguageToggle } from "@/components/themes_and_language/LanguageToggle";
import { LanguageProvider } from "@/context/LanguageContext";
import ClientSessionProvider from "@/components/layouts/ClientSessionProvider";
import ScreenSizeIndicator from "@/components/debug/ScreenSizeIndicator";
import { ThemeTransitionScript } from "@/components/themes_and_language/ThemeTransitionScript";
import { ModalProvider } from "@/context/ModalContext";

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

// layout.tsx
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#212121" }
  ],
}

export const metadata: Metadata = {
  title: "Clarity - Tasks made simple",
  description: "Clarity - A simple TODO app made with Next.js",
  icons: {
    icon: "/favicon-32x32.png",
    apple: [
      { url: "/apple-touch-icon.png" }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Clarity",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="apple-mobile-web-app-title" content="Clarity" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${lobster.variable} antialiased h-full`}
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