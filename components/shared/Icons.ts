import {
    FaStar,
    FaCalendar,
    FaHome,
    FaShoppingCart,
    FaSmile,
    FaBook,
  } from 'react-icons/fa';
  import LanguageToggleTransition from '@/components/LanguageToggleTransition';
  
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