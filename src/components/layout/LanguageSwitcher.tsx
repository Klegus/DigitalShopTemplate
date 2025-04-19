"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const switchLanguage = (lang: 'en' | 'pl') => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-full p-0.5 bg-gray-100 dark:bg-gray-700">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${ 
          language === 'en' 
          ? 'bg-white dark:bg-gray-500 text-gray-800 dark:text-white shadow' 
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200' 
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('pl')}
        className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${ 
          language === 'pl' 
          ? 'bg-white dark:bg-gray-500 text-gray-800 dark:text-white shadow' 
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200' 
        }`}
        aria-pressed={language === 'pl'}
      >
        PL
      </button>
    </div>
  );
} 