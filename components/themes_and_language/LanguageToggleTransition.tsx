// components/themes_and_language/LanguageToggleTransition.tsx | A component for providing a smooth transition on text changes when toggling between languages
'use client';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface TranslatedContentProps {
  en: string;
  da: string;
  className?: string;
  transitionKey?: string;
}

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

const LanguageToggleTransition = ({ en, da, className = '', transitionKey }: TranslatedContentProps) => {
  const { language } = useLanguage();
  
  // Generate a stable key based on the content and language
  const stableKey = transitionKey || `${en}-${da}`;
  const uniqueKey = `${stableKey}-${language}`;

  return (
    <span className="inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={uniqueKey}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={contentVariants}
          transition={contentTransition}
          className={className}
        >
          {language === 'en' ? en : da}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default LanguageToggleTransition;