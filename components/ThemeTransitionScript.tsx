'use client';

import { useEffect } from 'react';

export function ThemeTransitionScript() {
  useEffect(() => {
    // Add no-transition class on load
    document.documentElement.classList.add('no-transition');

    // Remove no-transition class after a small delay
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}