"use client";
import React, { createContext, useContext, useCallback, useState } from 'react';

type ModalContextType = {
  openModals: string[];
  addModal: (modalId: string) => void;
  removeModal: (modalId: string) => void;
  isAnyModalOpen: () => boolean;
};

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

  const removeModal = useCallback((modalId: string) => {
    setOpenModals(prev => prev.filter(id => id !== modalId));
  }, []);

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

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};