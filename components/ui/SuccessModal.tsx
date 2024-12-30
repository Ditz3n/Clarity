import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PiUserCircleCheckFill } from "react-icons/pi";
import { useModal } from '@/context/ModalContext';  // Add this import

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: React.ReactNode;
  autoCloseDelay?: number;
}

const SuccessModal = ({ isOpen, onClose, message, autoCloseDelay = 3000 }: SuccessModalProps) => {
  const { setIsModalOpen } = useModal();  // Add this line

  useEffect(() => {
    if (isOpen) {
      setIsModalOpen(true);  // Add this line
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      
      return () => {
        clearTimeout(timer);
        setIsModalOpen(false);  // Add this line
      };
    }
  }, [isOpen, onClose, autoCloseDelay, setIsModalOpen]);  // Add setIsModalOpen to dependencies

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
          {/* Rest of your modal code stays the same */}
          <motion.div 
            className="absolute inset-0 bg-black backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div 
            className="relative w-full max-w-lg bg-white dark:bg-[#212121] rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 z-50"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center justify-center p-8">
              <PiUserCircleCheckFill className="w-16 h-16 text-green-500 mb-4" />
              <div className="text-lg text-center text-gray-700 dark:text-gray-200">
                {message}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SuccessModal;