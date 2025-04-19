"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { STORE_NAME, LOGO_PATH } from '@/config/constants';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const itemCount = getCartCount();
  const { t } = useLanguage();
  
  return (
    <div className="w-full flex justify-center py-4">
      <nav className="bg-white dark:bg-gray-800 rounded-full shadow-lg py-3 px-3 sm:px-6 md:px-8 w-auto md:w-11/12 lg:w-10/12 max-w-4xl flex justify-between items-center border border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0 mr-2 sm:mr-0">
          {LOGO_PATH && (
            <Image 
              src={LOGO_PATH} 
              alt={`${STORE_NAME} Logo`} 
              width={32}
              height={32} 
              className="h-8 w-8"
              priority
            />
          )}
          <span className="hidden sm:inline text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">{STORE_NAME}</span>
        </Link>
        
        <div className="hidden lg:flex flex-1 justify-center space-x-6 text-gray-600 dark:text-gray-300 mx-4">
          <Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">{t('home')}</Link>
          <Link href="/products" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">{t('products')}</Link>
          <Link href="/advertisements" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">{t('announcements')}</Link>
          <Link href="/faq" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">{t('faq')}</Link>
          <Link href="/contact" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">{t('contact')}</Link>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="flex-shrink-0"><LanguageSwitcher /></div>
          <div className="flex-shrink-0"><ThemeSwitcher /></div>
          
          <Link 
            href="/cart" 
            className="flex-shrink-0 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center transition-colors relative p-2"
            aria-label={t('cart')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 text-[9px] sm:text-xs bg-blue-500 text-white rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center border border-white dark:border-gray-800">
                {itemCount}
              </span>
            )}
          </Link>
          
          <button className="lg:hidden flex-shrink-0 text-gray-600 dark:text-gray-300 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar; 