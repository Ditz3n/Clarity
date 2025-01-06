// components/shared/Icons.ts | A file for defining icons and their colors and translations
import {
    FaStar,
    FaCalendar,
    FaHome,
    FaShoppingCart,
    FaSmile,
    FaBook,
  } from 'react-icons/fa';
  import LanguageToggleTransition from '@/components/themes_and_language/LanguageToggleTransition';
  
  interface IconConfig {
    icon: typeof FaStar;
    name: {
      type: typeof LanguageToggleTransition;
      props: {
        en: string;
        da: string;
      };
    };
    color: string;
  }
  
  // Array of icons with their translations and colors (The ones used in the tasks)
  export const icons: IconConfig[] = [
    {
      icon: FaStar,
      name: {
        type: LanguageToggleTransition,
        props: { en: "Important", da: "Vigtig" }
      },
      color: 'text-[#6C63FF] dark:text-[#fb923c]'
    },
    {
      icon: FaSmile,
      name: {
        type: LanguageToggleTransition,
        props: { en: "General", da: "Generelt" }
      },
      color: 'text-[#6C63FF] dark:text-[#fb923c]'
    },
    {
      icon: FaShoppingCart,
      name: {
        type: LanguageToggleTransition,
        props: { en: "Shopping", da: "Indkøb" }
      },
      color: 'text-[#6C63FF] dark:text-[#fb923c]'
    },
    {
      icon: FaCalendar,
      name: {
        type: LanguageToggleTransition,
        props: { en: "Schedule", da: "Planlæg" }
      },
      color: 'text-[#6C63FF] dark:text-[#fb923c]'
    },
    {
      icon: FaBook,
      name: {
        type: LanguageToggleTransition,
        props: { en: "Study", da: "Studer" }
      },
      color: 'text-[#6C63FF] dark:text-[#fb923c]'
    },
    {
      icon: FaHome,
      name: {
        type: LanguageToggleTransition,
        props: { en: "Home", da: "Hjem" }
      },
      color: 'text-[#6C63FF] dark:text-[#fb923c]'
    },
  ];