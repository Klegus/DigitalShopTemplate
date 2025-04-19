"use client";

import AdvertCard from "@/components/ui/AdvertCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { STORE_NAME } from "@/config/constants";
import type { Advertisement } from "@/types";

interface AdvertisementsPageClientProps {
  sortedAdvertisements: Advertisement[];
}

export default function AdvertisementsPageClient({ sortedAdvertisements }: AdvertisementsPageClientProps) {
  const { t } = useLanguage();
  const storeName = STORE_NAME;

  // Placeholder for category filtering logic
  // const [activeCategory, setActiveCategory] = useState('All');
  // const filteredAdvertisements = sortedAdvertisements.filter(advert => 
  //   activeCategory === 'All' || advert.category === activeCategory
  // );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('announcements_page_title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t('announcements_page_description').replace('{storeName}', storeName)}
        </p>
      </div>

      <div className="mb-10 flex justify-center">
        <nav className="flex flex-wrap gap-2 justify-center">
          <button className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium transition-colors duration-150">{t('all_filter')}</button>
          <button className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">{t('promotions_filter')}</button>
          <button className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">{t('collections_filter')}</button>
          <button className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">{t('guides_filter')}</button>
          <button className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">{t('sustainability_filter')}</button>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedAdvertisements.map(advert => (
           <AdvertCard key={advert.id} advert={advert} />
        ))}
      </div>
    </div>
  );
} 