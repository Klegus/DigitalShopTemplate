"use client";

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types';
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductInteractionClientProps {
  product: Product;
}

export default function ProductInteractionClient({ product }: ProductInteractionClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedStatus, setAddedStatus] = useState<'idle' | 'adding' | 'added'>('idle');
  const { t } = useLanguage();

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (addedStatus !== 'idle') return; 
    
    setAddedStatus('adding');
    addToCart(product, quantity);
    
    setTimeout(() => {
      setAddedStatus('added');
      setTimeout(() => setAddedStatus('idle'), 1000); 
    }, 300);
  };

  const getButtonText = () => {
    if (quantity > 1) {
      return t('add_quantity_to_cart').replace('{quantity}', quantity.toString());
    } else {
      return t('add_to_cart');
    }
  };

  return (
    <div className="mt-8">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-gray-700 dark:text-gray-300 font-medium">{t('quantity')}:</span>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="px-3 py-1 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-4 py-1 text-lg text-gray-800 dark:text-gray-100 select-none w-12 text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-3 py-1 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button with Animation */}
      <motion.button
        onClick={handleAddToCart}
        disabled={addedStatus !== 'idle'}
        className={`relative w-48 min-w-fit text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 ease-in-out text-lg flex items-center justify-center overflow-hidden min-h-[52px] ${ 
          addedStatus === 'adding' || addedStatus === 'added' 
            ? 'bg-green-600' 
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
        }`}
      >
        <AnimatePresence mode="wait">
          {addedStatus !== 'added' && (
             <motion.span
                key="addText"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center whitespace-nowrap"
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getButtonText()}
             </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {addedStatus === 'added' && (
            <motion.div
              key="checkmark"
              initial={{ y: 0, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.5, transition: { duration: 0.3, ease: "easeIn" } }}
              className="absolute inset-0 flex items-center justify-center text-white pointer-events-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
} 