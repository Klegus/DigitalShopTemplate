"use client"; // Keep as client if other interactions are planned

import { STORE_NAME } from '@/config/constants'; // Import constant
import { useLanguage } from "@/contexts/LanguageContext"; // Import useLanguage

const HeroSection = () => {
  const { t } = useLanguage(); // Get translation function

  return (
    <section
      className="text-center py-16 md:py-24 relative overflow-hidden bg-transparent" // Adjusted padding slightly
    >
      {/* Content container */}
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 text-gray-800 dark:text-gray-100 leading-tight drop-shadow-md">
          {/* Correctly interpolate STORE_NAME within the span for animation */}
          {t('hero_welcome').split('{storeName}')[0]}
          <span className="text-blue-600 dark:text-blue-400 drop-shadow-[0_2px_3px_rgba(59,130,246,0.5)] animate-neon-flicker">
            {STORE_NAME}
          </span>
          {t('hero_welcome').split('{storeName}')[1]}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-14 max-w-2xl mx-auto">
          {/* Use translation */}
          {t('hero_subtitle')}
        </p>
      </div>
    </section>
  );
};

export default HeroSection; 