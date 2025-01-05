// components/layouts/PageWrapper.tsx | A wrapper component for pages to handle page transitions
"use client";
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Footer } from "@/components/ui/Footer";

// Page transition variants (initial, animate, exit)
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
};

// Page transition settings
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// PageWrapper component
export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#212121] flex flex-col">
      <main className="flex-1 flex flex-col">
        { /* AnimatePresence component for page transitions from framer-motion */ }
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            className="flex flex-1"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}