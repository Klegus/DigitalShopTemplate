"use client";

import ProductCard from "@/components/ui/ProductCard";
import AdvertCard from "@/components/ui/AdvertCard";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Product, Advertisement } from "@/types"; // Import types

interface HomePageClientProps {
  topProducts: Product[];
  latestAdverts: Advertisement[];
}

export default function HomePageClient({ topProducts, latestAdverts }: HomePageClientProps) {
  const { t } = useLanguage(); // Use hook here

  return (
    <div>
      {/* Featured Products Section */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('our_products')}</h2>
          <Link 
            href="/products" 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center text-sm font-semibold"
          >
            {t('view_all_products')}
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Latest Advertisements Section */}
      <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('announcements')}</h2>
            <Link 
              href="/advertisements" 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center text-sm font-semibold"
            >
              {t('view_all_announcements')}
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestAdverts.map(advert => (
              <AdvertCard key={advert.id} advert={advert} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 