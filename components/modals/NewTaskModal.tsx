// components/ui/modals/NewTaskModal.tsx | A modal for creating a new task on the home page
import React, { useState, useEffect, useRef } from 'react';
import { RxCross2 } from "react-icons/rx";
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaStar,
  FaCalendar,
  FaHome,
  FaShoppingCart,
  FaSmile,
  FaBook
} from 'react-icons/fa';
import { RiTodoFill } from "react-icons/ri";

import { useModal } from '@/context/ModalContext';
import LanguageToggleTransition from '@/components/themes_and_language/LanguageToggleTransition';
import AnimatedPlaceholderInput from '@/components/themes_and_language/AnimatedPlaceholderInput';

const icons = [
  {
    icon: FaStar,
    name: <LanguageToggleTransition en="Important" da="Vigtig" />,
    color: 'text-[#6C63FF] dark:text-[#fb923c]'
  },
  {
    icon: FaSmile,
    name: <LanguageToggleTransition en="General" da="Generelt" />,
    color: 'text-[#6C63FF] dark:text-[#fb923c]'
  },
  {
    icon: FaShoppingCart,
    name: <LanguageToggleTransition en="Shopping" da="Indkøb" />,
    color: 'text-[#6C63FF] dark:text-[#fb923c]'
  },
  {
    icon: FaCalendar,
    name: <LanguageToggleTransition en="Schedule" da="Planlæg" />,
    color: 'text-[#6C63FF] dark:text-[#fb923c]'
  },
  {
    icon: FaBook,
    name: <LanguageToggleTransition en="Study" da="Studer" />,
    color: 'text-[#6C63FF] dark:text-[#fb923c]'
  },
  {
    icon: FaHome,
    name: <LanguageToggleTransition en="Home" da="Hjem" />,
    color: 'text-[#6C63FF] dark:text-[#fb923c]'
  },
];

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; icon: string }) => void;
}

const NewTaskModal = ({ isOpen, onClose, onSubmit }: NewTaskModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(icons[0]); // Default to first icon
  const [isIconListOpen, setIsIconListOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [titleError, setTitleError] = useState<React.ReactNode | null>(null);
  const { addModal, removeModal } = useModal();
  const modalId = `new-task-modal`;

  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown
  const modalRef = useRef<HTMLDivElement>(null); // Reference to the entire modal

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

  // Close menu when clicking outside the dropdown but inside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        modalRef.current?.contains(event.target as Node) // Ensure click is inside the modal
      ) {
        setIsIconListOpen(false); // Close menu
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError(
        <LanguageToggleTransition
          en="Title cannot be empty"
          da="Titel kan ikke være tom"
        />
      );
      return;
    }

    setTitleError(null);
    onSubmit({
      title,
      description,
      icon: selectedIcon.name.props.en // Just send the English name as the icon identifier
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSelectedIcon(icons[0]);
    onClose();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setTitle(value);
      setShowWarning(false);
      setTitleError(null); // Clear error when user types
    } else {
      setShowWarning(true);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{ zIndex: 9999 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-[95%] sm:w-full max-w-lg mx-auto bg-white dark:bg-[#212121] rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
              <button
                onClick={onClose}
                className="absolute right-5 top-5 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none"
              >
                <RxCross2 className="h-4 w-4" />
                <span className="sr-only">
                  <LanguageToggleTransition en="Close Modal" da="Luk Modal" />
                </span>
              </button>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                <LanguageToggleTransition en="Create New Task" da="Opret ny opgave" />
              </h2>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Icon Selection */}
              <div className="relative space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <LanguageToggleTransition en="Select Icon" da="Vælg ikon" />
                </label>
                <div
                  onClick={() => setIsIconListOpen(!isIconListOpen)}
                  className="flex items-center gap-2 p-2 border border-gray-200 dark:border-neutral-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800"
                >
                  <selectedIcon.icon className={`h-5 w-5 ${selectedIcon.color}`} />
                  <span>{selectedIcon.name}</span>
                </div>

                {/* Icon List Dropdown */}
                <AnimatePresence>
                  {isIconListOpen && (
                    <motion.div
                      className="absolute z-10 mt-1 w-full bg-white dark:bg-[#212121] border border-gray-200 dark:border-neutral-800 rounded-lg shadow-lg"
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-2 grid grid-cols-3 gap-2">
                        {icons.map(({ icon: Icon, name, color }) => (
                          <div
                            key={name.props.en}
                            onClick={() => {
                              setSelectedIcon({ icon: Icon, name, color });
                              setIsIconListOpen(false);
                            }}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                              selectedIcon.name.props.en === name.props.en
                                ? 'bg-blue-50 dark:bg-orange-900/20'
                                : 'hover:bg-gray-50 dark:hover:bg-neutral-800'
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 ${
                                selectedIcon.name.props.en === name.props.en
                                  ? color
                                  : 'text-gray-700 dark:text-gray-200'
                              }`}
                            />
                            <span
                              className={`text-sm tracking-wide ${
                                selectedIcon.name.props.en === name.props.en
                                  ? 'text-gray-700 dark:text-gray-200 font-bold'
                                  : 'text-gray-700 dark:text-gray-200'
                              }`}
                            >
                              {name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <LanguageToggleTransition en="Title" da="Titel" />
                </label>
                <AnimatedPlaceholderInput
                  name="title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholderEn="Enter task title"
                  placeholderDa="Indtast opgavetitel"
                  className="w-full p-2 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-[#212121] focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-[#fb923c]"
                />
                <AnimatePresence>
                  {(showWarning || titleError) && (
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
                      {showWarning ? (
                        <LanguageToggleTransition
                          en="Maximum character count reached"
                          da="Maksimal antal tegn nået"
                        />
                      ) : titleError}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="text-sm text-gray-500">
                <LanguageToggleTransition
                  en={`Character count: ${title.length}/30`}
                  da={`Antal tegn: ${title.length}/30`}
                  transitionKey="character-count" // Add this stable key
                />
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <LanguageToggleTransition en="Description" da="Beskrivelse" />
                </label>
                <AnimatedPlaceholderInput
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholderEn="Enter task description"
                  placeholderDa="Indtast opgavebeskrivelse"
                  className="w-full p-2 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-[#212121] focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-[#fb923c]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type='submit'
                  className="flex items-center gap-2 py-2 bg-[#6C63FF] dark:bg-[#fb923c] text-white rounded-lg hover:bg-[#5953e1] dark:hover:bg-[#f59f0b] transition-colors justify-between px-4"
                >
                  <span className="text-sm mb-[1px] font-medium">
                    <LanguageToggleTransition
                      en="Create Task"
                      da="Opret Opgave"
                    />
                  </span>
                  <RiTodoFill className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default NewTaskModal;