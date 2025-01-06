// components/modals/SuccessModal.tsx | A modal for displaying a success message (after updating your password, for example)
import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PiUserCircleCheckFill } from "react-icons/pi";
import { useModal } from '@/context/ModalContext';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: React.ReactNode;
  autoCloseDelay?: number;
}

const SuccessModal = ({ isOpen, onClose, message, autoCloseDelay = 3000 }: SuccessModalProps) => {
  const { addModal, removeModal } = useModal();
  const modalId = 'success-modal';

  // Cleanup function (to remove the modal from the DOM)
  const cleanup = useCallback(() => {
    removeModal(modalId);
    document.body.style.overflow = 'unset';
  }, [modalId, removeModal]);

  // useEffect to handle the modal's open and close states
  useEffect(() => {
    if (!isOpen) {
      cleanup();
      return;
    }

    addModal(modalId);
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      onClose();
    }, autoCloseDelay);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [isOpen, addModal, cleanup, onClose, autoCloseDelay]);

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="absolute inset-0 bg-black backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="relative w-[95%] sm:w-full max-w-lg mx-auto bg-white dark:bg-[#212121] rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 z-50"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ 
              scale: 0.95, 
              opacity: 0, 
              y: 20,
              transition: {
                duration: 0.2,
                ease: "easeInOut"
              }
            }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut" 
            }}
          >
            <motion.div 
              className="flex flex-col items-center justify-center p-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <PiUserCircleCheckFill className="w-16 h-16 text-[#6C63FF] dark:text-[#fb923c] mb-4" />
              <div className="text-lg text-center text-gray-700 dark:text-gray-200">
                {message}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SuccessModal;