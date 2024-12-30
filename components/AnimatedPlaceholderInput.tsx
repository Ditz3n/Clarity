import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "./ui/Input";
import { useLanguage } from "../context/LanguageContext";

const contentVariants = {
  initial: {
    opacity: 0,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    scale: 1
  },
  exit: {
    opacity: 0,
    scale: 0.98
  }
};

const contentTransition = {
  duration: 0.4,
  ease: [0.43, 0.13, 0.23, 0.96]
};

interface AnimatedPlaceholderInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderEn: string;
  placeholderDa: string;
  className?: string;
  type?: string;
}

const AnimatedPlaceholderInput = ({
  name,
  value,
  onChange,
  placeholderEn,
  placeholderDa,
  className = '',
  type = 'text'
}: AnimatedPlaceholderInputProps) => {
  const { language } = useLanguage();
  
  return (
    <div className="relative flex-1 min-w-0">
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full ${className}`}
      />
      {!value && (
        <div className="absolute inset-0 pointer-events-none flex items-center px-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={language}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={contentVariants}
              transition={contentTransition}
              className="text-gray-400 dark:text-gray-500"
            >
              {language === 'en' ? placeholderEn : placeholderDa}
            </motion.span>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AnimatedPlaceholderInput;