import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PiUserCircleCheckFill } from "react-icons/pi";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  autoCloseDelay?: number;
}

const SuccessModal = ({ isOpen, onClose, message, autoCloseDelay = 3000 }: SuccessModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, autoCloseDelay]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div 
            className="relative w-full max-w-lg bg-white dark:bg-[#212121] rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 z-50"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center justify-center p-8">
              <PiUserCircleCheckFill className="w-16 h-16 text-green-500 mb-4" />
              <p className="text-lg text-center text-gray-700 dark:text-gray-200">
                {message}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SuccessModal;