// context/ModalContext.tsx | A context provider for all modals in the application
"use client";
import React, { createContext, useContext, useCallback, useState } from 'react';

type ModalContextType = {
  openModals: string[];
  addModal: (modalId: string) => void;
  removeModal: (modalId: string) => void;
  isAnyModalOpen: () => boolean;
};

// Create a context for the modal
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModals, setOpenModals] = useState<string[]>([]);

  // Memoize these functions to prevent unnecessary rerenders
  const addModal = useCallback((modalId: string) => {
    setOpenModals(prev => {
      if (prev.includes(modalId)) return prev;
      return [...prev, modalId];
    });
  }, []);

  // Remove the modal from the openModals array
  const removeModal = useCallback((modalId: string) => {
    setOpenModals(prev => prev.filter(id => id !== modalId));
  }, []);

  // Check if any modal is open
  const isAnyModalOpen = useCallback(() => {
    return openModals.length > 0;
  }, [openModals]);

  const value = {
    openModals,
    addModal,
    removeModal,
    isAnyModalOpen
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};