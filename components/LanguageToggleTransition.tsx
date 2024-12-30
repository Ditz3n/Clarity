'use client';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface TranslatedContentProps {
  en: string;
  da: string;
  className?: string;
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

const LanguageToggleTransition = ({ en, da, className = '' }: TranslatedContentProps) => {
  const { language } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={language}
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
  );
};

export default LanguageToggleTransition;