// components/modals/CompletionConfirmModal.tsx | A component for confirming task completion (the warning modal that appears when completing a task from the ShowTaskModal component)
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { RxCross2 } from "react-icons/rx";
import { MdCheck, MdDelete } from "react-icons/md";
import { useSession } from "next-auth/react";
import LanguageToggleTransition from '@/components/themes_and_language/LanguageToggleTransition';
import { useModal } from '@/context/ModalContext';
import { updateUserCompletionPreference } from '@/lib/database/taskActions';

interface CompletionConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (hideInFuture: boolean, shouldDelete: boolean) => void;
}

const CompletionConfirmModal = ({ isOpen, onClose, onConfirm }: CompletionConfirmModalProps) => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [hideInFuture, setHideInFuture] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { addModal, removeModal } = useModal();
  const modalId = 'completion-confirm';
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleConfirmation = async (shouldDelete: boolean) => {
    setIsClosing(true);
    
    if (hideInFuture && session?.user?.id) {
      const formData = new FormData();
      formData.append('userId', session.user.id);
      formData.append('hideCompletionModal', 'true');
      formData.append('completionPreference', shouldDelete ? 'complete_delete' : 'complete');
      await updateUserCompletionPreference(formData);
    }

    await onConfirm(hideInFuture, shouldDelete);
    
    setTimeout(() => {
      setIsClosing(false);
    }, 200);
  };

  useEffect(() => {
    if (isOpen) {
      addModal(modalId);
      document.body.style.overflow = 'hidden';
    } else {
      removeModal(modalId);
      document.body.style.overflow = 'unset';
    }
  
    return () => {
      removeModal(modalId);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, modalId, addModal, removeModal]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && !isClosing && (
        <motion.div
          key="completion-confirm-modal"
          className="fixed inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          style={{ zIndex: 99999 }}
        >
          <motion.div
            className="absolute inset-0 bg-black backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative w-[95%] sm:w-full max-w-md mx-auto bg-white dark:bg-[#212121] rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Modal Header */}
            <div className="flex-none h-16 px-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="h-full flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
                  <LanguageToggleTransition 
                    transitionKey="completion-modal-title"
                    en="Complete Task" 
                    da="Færdiggør opgave" 
                  />
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <RxCross2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                <LanguageToggleTransition 
                  transitionKey="completion-modal-description"
                  en="How would you like to complete this task?" 
                  da="Hvordan vil du færdiggøre denne opgave?" 
                />
              </p>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="hideInFuture"
                  checked={hideInFuture}
                  onChange={(e) => setHideInFuture(e.target.checked)}
                  className="h-4 w-4 text-[#6C63FF] dark:text-[#fb923c] rounded border-gray-300 dark:border-gray-600 
                    focus:ring-2 focus:ring-[#6C63FF] dark:focus:ring-[#fb923c] focus:ring-offset-0
                    bg-white dark:bg-[#272727]"
                />
                <label 
                  htmlFor="hideInFuture" 
                  className="ml-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer"
                >
                  <LanguageToggleTransition 
                    transitionKey="completion-modal-checkbox-label"
                    en="Don't show this message again" 
                    da="Vis ikke denne besked igen" 
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleConfirmation(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 
                    bg-gray-100 dark:bg-[#272727] rounded-lg hover:bg-gray-200 
                    dark:hover:bg-[#323232] transition-colors border border-gray-200 
                    dark:border-neutral-700"
                >
                  <span>
                    <LanguageToggleTransition 
                      transitionKey="completion-modal-complete-only"
                      en="Complete Only" 
                      da="Kun færdiggør" 
                    />
                  </span>
                  <MdCheck className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleConfirmation(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
                    bg-[#6C63FF] dark:bg-[#fb923c] rounded-lg hover:bg-[#5953e1] 
                    dark:hover:bg-[#f59f0b] transition-colors"
                >
                  <span>
                    <LanguageToggleTransition 
                      transitionKey="completion-modal-complete-delete"
                      en="Complete & Delete" 
                      da="Færdiggør & Slet" 
                    />
                  </span>
                  <MdDelete className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CompletionConfirmModal;