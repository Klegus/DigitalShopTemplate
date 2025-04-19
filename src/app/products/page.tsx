"use client"; // Make this a client component for state

import { useState, useMemo } from 'react'; // Import hooks
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/placeholder-data";
import { Product } from "@/types";
// Import useLanguage hook
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage(); // Get translation function

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products; // Return all if search is empty
    }
    return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]); // Re-run filter only when searchQuery changes

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Use translated heading */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">{t('our_products')}</h1>
      
      {/* Conditional Search Bar */}
      {products.length > 3 && (
        <div className="mb-8 max-w-lg mx-auto">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search_products_placeholder')} // Use translated placeholder
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-gray-100 transition duration-150 ease-in-out"
          />
        </div>
      )}
      
      {/* Products Grid - Uses filteredProducts */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        // Use translated message
        <p className="text-center text-gray-600 dark:text-gray-400 mt-10">{t('no_products_found')}</p>
      )}
    </div>
  );
} 