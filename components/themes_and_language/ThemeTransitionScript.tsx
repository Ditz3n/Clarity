// components/themes_and_language/ThemeTransitionScript.tsx | A component for providing a smooth transition on theme changes
'use client';
import { useEffect } from 'react';

export function ThemeTransitionScript() {
  useEffect(() => {
    // Add no-transition class on initial load only
    document.documentElement.classList.add('no-transition');

    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}