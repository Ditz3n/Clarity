// context/ModalContext.tsx | A context for managing the state of a modal
"use client";
import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context
type ModalContextType = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create the provider
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

// Create a hook for using the context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};