import { motion } from 'framer-motion';

const ContentTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div 
      className="flex-1 flex items-center justify-center px-4 md:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ContentTransition;