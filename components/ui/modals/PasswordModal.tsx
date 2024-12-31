import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const { setIsModalOpen } = useModal();
  const { language } = useLanguage();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    setIsModalOpen(isOpen);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, setIsModalOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
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
            className="relative w-[95%] sm:w-full max-w-lg mx-auto bg-white dark:bg-[#212121] rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 z-50"
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
              <button
                onClick={onClose}
                className="absolute right-5 top-5 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none"
              >
                <RxCross2 className="h-4 w-4" />
                <span className="sr-only">{language === "en" ? "Close" : "Luk"}</span>
              </button>
              {title && (
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                  {title}
                </h2>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;