import React, { useState, useEffect, useRef } from 'react';
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle, FaUndoAlt } from "react-icons/fa";
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from "next-auth/react";
import LanguageToggleTransition from '@/components/LanguageToggleTransition';
import CompletionConfirmModal from './CompletionConfirmModal';
import { 
  editTask, 
  deleteTask, 
  updateTask,
  getUserCompletionPreference, 
  completeAndDeleteTask, 
  updateUserCompletionPreference 
} from '@/lib/database/taskActions';
import { icons } from '@/components/shared/Icons';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';

interface ShowTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    title: string;
    description?: string;
    icon?: string;
    createdAt?: Date;
    isCompleted: boolean; // Make this required since we need it for the toggle functionality
  };
}

const ShowTaskModal = ({ isOpen, onClose, task }: ShowTaskModalProps) => {
  const { language } = useLanguage();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [editingField, setEditingField] = useState<'title' | 'description' | 'icon' | null>(null);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [showWarning, setShowWarning] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [hideCompletionModal, setHideCompletionModal] = useState(false);
  const [completionPreference, setCompletionPreference] = useState<'ask' | 'complete' | 'complete_delete'>('ask');
  const [isClosing, setIsClosing] = useState(false);
  const { addModal, removeModal } = useModal();
  const modalId = `show-task-${task.id}`;
  

  // Ensure language is a valid key
  const validLanguages = ['en', 'da'] as const;
  type ValidLanguage = typeof validLanguages[number];

  // Type guard to check if language is valid
  const isValidLanguage = (lang: string): lang is ValidLanguage => {
    return validLanguages.includes(lang as ValidLanguage);
  };

  // Default to 'en' if language is not valid
  const safeLanguage = isValidLanguage(language) ? language : 'en';

  const [selectedIconName, setSelectedIconName] = useState(
    task.icon || icons[0].name.props[safeLanguage]
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      addModal(modalId);
      document.body.style.overflow = 'hidden';
    } else {
      removeModal(modalId);
      document.body.style.overflow = 'unset';
    }
  
    // Cleanup function
    return () => {
      removeModal(modalId);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, modalId, addModal, removeModal]); // Only re-run the effect if `isOpen` or `modalId` changes

  // Update selected icon name when language changes
  useEffect(() => {
    if (task.icon) {
      const icon = icons.find(icon => 
        Object.values(icon.name.props).includes(task.icon!)
      );
      
      if (icon) {
        setSelectedIconName(icon.name.props[safeLanguage]);
      }
    }
  }, [task.icon, safeLanguage]);

  // Check user preference for completion modal
  useEffect(() => {
    const checkPreferences = async () => {
      if (session?.user?.id) {
        const formData = new FormData();
        formData.append('userId', session.user.id);
        const preferences = await getUserCompletionPreference(formData);
        setHideCompletionModal(preferences.hideCompletionModal);
        setCompletionPreference(preferences.completionPreference as 'ask' | 'complete' | 'complete_delete');
      }
    };
    checkPreferences();
  }, [session?.user?.id]);

  const handleSaveField = async (field: 'title' | 'description' | 'icon') => {
    const formData = new FormData();
    formData.append('inputId', task.id);
    
    switch (field) {
      case 'title':
        if (!title?.trim()) return;
        formData.append('newTitle', title);
        await editTask(formData);
        break;
      case 'description':
        formData.append('newDescription', description);
        await editTask(formData);
        break;
      case 'icon':
        formData.append('newIcon', selectedIconName);
        await editTask(formData);
        break;
    }
  };

  const handleFieldClick = (newField: 'title' | 'description' | 'icon') => {
    if (editingField && editingField !== newField) {
      handleSaveField(editingField);
    }
    setEditingField(newField);
  };

  const handleBlur = async (e: React.FocusEvent, field: 'title' | 'description') => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    
    if (relatedTarget && 
        (relatedTarget.classList.contains('title-field') || 
         relatedTarget.classList.contains('description-field'))) {
      return;
    }

    if (editingField === field) {
      await handleSaveField(field);
      setEditingField(null);
    }
  };

  const handleIconSelect = async (icon: typeof icons[number]) => {
    setSelectedIconName(icon.name.props[safeLanguage]);
    const formData = new FormData();
    formData.append('inputId', task.id);
    formData.append('newIcon', icon.name.props[safeLanguage]);
    formData.append('newTitle', title || '');
    await editTask(formData);
  };

  // Function to handle closing with animation
  const handleAnimatedClose = async () => {
    setIsClosing(true);
    await new Promise(resolve => setTimeout(resolve, 200)); // Wait for animation
    setIsClosing(false);
    onClose();
  };

  const handleDelete = async () => {
    setIsClosing(true);
    const formData = new FormData();
    formData.append('inputId', task.id);
    await deleteTask(formData);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleComplete = async () => {
    if (task.isCompleted) {
      // If task is already completed, mark it as incomplete
      const formData = new FormData();
      formData.append('inputId', task.id);
      await updateTask(formData);
      onClose();
    } else if (hideCompletionModal) {
      // If warnings are disabled, handle according to saved preference
      const formData = new FormData();
      formData.append('inputId', task.id);
      setIsClosing(true);
      
      if (completionPreference === 'complete_delete') {
        await completeAndDeleteTask(formData);
      } else if (completionPreference === 'complete') {
        await updateTask(formData);
      }
      
      setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, 200);
    } else {
      setShowCompletionModal(true);
    }
  };

  const handleCompletionConfirm = async (hideInFuture: boolean, shouldDelete: boolean) => {
    const formData = new FormData();
    formData.append('inputId', task.id);
    
    // Start closing the completion modal
    setShowCompletionModal(false);
    
    // Wait for the completion modal to finish its exit animation
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Then handle the task action and start the ShowTaskModal exit animation
    setIsClosing(true);
    
    if (shouldDelete) {
      await completeAndDeleteTask(formData);
      if (hideInFuture) {
        setCompletionPreference('complete_delete');
      }
    } else {
      await updateTask(formData);
      if (hideInFuture) {
        setCompletionPreference('complete');
      }
    }
    
    // If user chose to hide future warnings, update their preferences
    if (hideInFuture && session?.user?.id) {
      const userFormData = new FormData();
      userFormData.append('userId', session.user.id);
      userFormData.append('hideCompletionModal', 'true');
      userFormData.append('completionPreference', shouldDelete ? 'complete_delete' : 'complete');
      await updateUserCompletionPreference(userFormData);
      setHideCompletionModal(true);
    }
    
    // Wait for ShowTaskModal's exit animation
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Finally close the modal
    setIsClosing(false);
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && !isClosing && (
        <motion.div
          key="show-task-modal"
          className="fixed inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleAnimatedClose}
          style={{ zIndex: 9999 }}
        >
          <motion.div
            className="absolute inset-0 bg-black backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative w-[95%] sm:w-full max-w-lg mx-auto bg-white dark:bg-[#212121] rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
          >
            {/* Modal Header */}
            <div className="flex-none h-16 px-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="h-full flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
                  <LanguageToggleTransition
                    transitionKey={`show-task-modal-title-${task.id}`}
                    en="Task Details"
                    da="Opgavedetaljer"
                  />
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <RxCross2 className="h-5 w-5" />
                </button>
              </div>
            </div>
  
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Title Section */}
              <div className="px-6 pt-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    <LanguageToggleTransition
                      transitionKey={`show-task-title-label-${task.id}`}
                      en="Title"
                      da="Titel"
                    />
                  </h3>
                  <div className="h-[60px]">
                    {editingField === 'title' ? (
                      <div className="h-full flex items-center">
                        <textarea
                          ref={titleRef}
                          value={title ?? ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 30) {
                              setTitle(value);
                              setShowWarning(false);
                            } else {
                              setShowWarning(true);
                            }
                          }}
                          onBlur={(e) => handleBlur(e, 'title')}
                          className="title-field w-full px-4 font-bold rounded-lg text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-[#272727] border border-gray-200 dark:border-neutral-700 resize-none overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent dark:focus:ring-[#fb923c]"
                          style={{
                            height: '60px',
                            paddingTop: '16px',
                            paddingBottom: '16px',
                            lineHeight: '28px',
                            fontSize: `clamp(16px, ${30 / Math.max(title?.length || 1, 1)}vw, 30px)`,
                            whiteSpace: 'nowrap',
                            overflowX: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                          rows={1}
                          autoFocus
                          tabIndex={1}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => handleFieldClick('title')}
                        className="title-field w-full h-full flex items-center px-4 font-bold text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-[#272727] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#323232] transition-colors"
                        style={{
                          lineHeight: '28px',
                          fontSize: `clamp(16px, ${30 / Math.max(title?.length || 1, 1)}vw, 30px)`,
                          whiteSpace: 'nowrap',
                          overflowX: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        tabIndex={1}
                      >
                        {title || (
                          <span className="text-gray-400 italic">
                            <LanguageToggleTransition
                              transitionKey={`show-task-no-title-${task.id}`}
                              en="No title provided"
                              da="Ingen titel tilføjet"
                            />
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {showWarning && (
                      <motion.div
                        className="mt-1 text-red-500 dark:text-red-400 text-sm"
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: 'easeInOut',
                        }}
                      >
                        <LanguageToggleTransition
                          transitionKey={`show-task-character-warning-${task.id}`}
                          en="Maximum character count reached"
                          da="Maksimal antal tegn nået"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="text-sm text-gray-500">
                    <LanguageToggleTransition
                      transitionKey={`show-task-character-count-${task.id}`}
                      en={`Character count: ${title?.length || 0}/30`}
                      da={`Antal tegn: ${title?.length || 0}/30`}
                    />
                  </div>
                </div>
              </div>
  
              {/* Description Section */}
              <div className="px-6 pt-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    <LanguageToggleTransition
                      transitionKey={`show-task-description-label-${task.id}`}
                      en="Description"
                      da="Beskrivelse"
                    />
                  </h3>
                  <div className="h-[100px]">
                    {editingField === 'description' ? (
                      <textarea
                        ref={descriptionRef}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={(e) => handleBlur(e, 'description')}
                        className="description-field w-full h-full p-4 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-[#272727] resize-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent dark:focus:ring-[#fb923c]"
                        autoFocus
                        tabIndex={2}
                      />
                    ) : (
                      <div
                        onClick={() => handleFieldClick('description')}
                        className="description-field w-full h-full p-4 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-[#272727] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#323232] transition-colors overflow-y-auto whitespace-pre-wrap break-words"
                        tabIndex={2}
                        style={{ wordBreak: 'break-word' }}
                      >
                        {description || (
                          <span className="text-gray-400 italic">
                            <LanguageToggleTransition
                              transitionKey={`show-task-no-description-${task.id}`}
                              en="No description provided"
                              da="Ingen beskrivelse tilføjet"
                            />
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
  
                {/* Icon Selection */}
                <div className='pt-6'>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      <LanguageToggleTransition
                        transitionKey={`show-task-icon-label-${task.id}`}
                        en="Icon"
                        da="Ikon"
                      />
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {icons.map((icon) => (
                        <div
                          key={`${icon.name.props.en}-${task.id}`}
                          onClick={() => handleIconSelect(icon)}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                            task.icon && Object.values(icon.name.props).includes(task.icon)
                              ? 'bg-blue-50 dark:bg-orange-900/20'
                              : 'hover:bg-gray-50 dark:hover:bg-neutral-800'
                          }`}
                        >
                          <icon.icon
                            className={`h-5 w-5 ${
                              task.icon && Object.values(icon.name.props).includes(task.icon)
                                ? icon.color
                                : 'text-gray-700 dark:text-gray-200'
                            }`}
                          />
                          <span className={`text-sm ${
                            selectedIconName === icon.name.props[safeLanguage]
                              ? 'text-gray-700 dark:text-gray-200 font-bold'
                              : 'text-gray-700 dark:text-gray-200'
                          }`}>
                            <LanguageToggleTransition
                              transitionKey={`show-task-icon-${icon.name.props.en}-${task.id}`}
                              en={icon.name.props.en}
                              da={icon.name.props.da}
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
  
                  {/* Footer */}
                  <div className="flex-none h-16 mt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="h-full flex justify-between items-center">
                      {/* Date Display */}
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {task.createdAt ? (
                          <LanguageToggleTransition
                            transitionKey={`show-task-date-display-${task.id}`}
                            en={task.createdAt.toLocaleString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                            da={task.createdAt.toLocaleString('da-DK', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          />
                        ) : (
                          <span>No date provided</span>
                        )}
                      </div>
  
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleComplete}
                          className="flex items-center gap-2 px-4 py-2 bg-[#6C63FF] dark:bg-[#fb923c] text-white rounded-lg hover:bg-[#5953e1] dark:hover:bg-[#f59f0b] transition-colors"
                        >
                          {task.isCompleted ? (
                            <>
                              <FaUndoAlt className="h-5 w-5" />
                            </>
                          ) : (
                            <FaCheckCircle className="h-5 w-5" />
                          )}
                        </button>
  
                        <button
                          onClick={handleDelete}
                          className="flex items-center gap-2 px-4 py-2 bg-[#6C63FF] dark:bg-[#fb923c] text-white rounded-lg hover:bg-[#5953e1] dark:hover:bg-[#f59f0b] transition-colors"
                        >
                          <span className="text-sm font-medium">
                            <LanguageToggleTransition
                              transitionKey={`show-task-delete-button-${task.id}`}
                              en="Delete Task"
                              da="Slet opgave"
                            />
                          </span>
                          <MdDelete className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <CompletionConfirmModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onConfirm={handleCompletionConfirm}
      />
    </AnimatePresence>,
    document.body
  );
}

export default ShowTaskModal;