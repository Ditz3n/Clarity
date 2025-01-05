// components//layouts/ContentTransition.tsx | A content transition component for the application (the one that makes it looks cool to switch between pages)
import { motion } from 'framer-motion';

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
  duration: 0.2, // Reduced to match theme transition
  ease: [0.43, 0.13, 0.23, 0.96]
};

const ContentTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div 
      className="flex-1 flex items-center justify-center px-4 md:px-0"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={contentVariants}
      transition={contentTransition}
    >
      {children}
    </motion.div>
  );
};

export default ContentTransition;