"use client";
// components/PageWrapper.tsx
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Footer } from "./ui/Footer";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    // The outer div ensures the background color spans the full height
    <div className="min-h-screen bg-gray-50 dark:bg-[#212121] flex flex-col">
      {/* The main content area will grow to fill available space */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <div key={pathname} className="flex flex-1">
            {children}
          </div>
        </AnimatePresence>
      </main>
      {/* Footer now inherits the background color context */}
      <Footer />
    </div>
  );
};