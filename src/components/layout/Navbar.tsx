"use client";

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { ThemeSwitcher } from './ThemeSwitcher';

const Navbar = () => {
  const { getCartCount } = useCart();
  const itemCount = getCartCount();
  
  return (
    <div className="w-full flex justify-center py-4">
      <nav className="bg-white dark:bg-gray-800 rounded-full shadow-lg py-3 px-6 md:px-8 w-auto md:w-11/12 lg:w-10/12 max-w-4xl flex justify-between items-center border border-gray-200 dark:border-gray-700">
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
          <Link href="/" className="hover:opacity-90 transition-opacity">VirtuMart</Link>
        </div>
        
        <div className="hidden md:flex space-x-8 text-gray-600 dark:text-gray-300">
          <Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/products" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Products</Link>
          <Link href="/faq" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">FAQ</Link>
          <Link href="/terms" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Contact</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            
            <span className="hidden md:inline">
              Cart {itemCount > 0 && `(${itemCount})`}
            </span>
            
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 md:hidden bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white dark:border-gray-800">
                {itemCount}
              </span>
            )}
          </Link>
          
          <ThemeSwitcher />
          
          <button className="md:hidden text-gray-600 dark:text-gray-300">
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