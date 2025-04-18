"use client";

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Checkout successful!');
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">Your cart is currently empty.</p>
          <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200 font-semibold">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Cart Header */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 hidden md:grid md:grid-cols-12 border-b border-gray-200 dark:border-gray-600">
            <div className="col-span-6 font-medium text-gray-600 dark:text-gray-300">Product</div>
            <div className="col-span-2 font-medium text-gray-600 dark:text-gray-300 text-center">Quantity</div>
            <div className="col-span-2 font-medium text-gray-600 dark:text-gray-300 text-right">Price</div>
            <div className="col-span-2 font-medium text-gray-600 dark:text-gray-300 text-right">Subtotal</div>
          </div>

          {/* Cart Items */}
          <div className="divide-y divide-gray-200 dark:divide-gray-600">
            <AnimatePresence initial={false}>
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  layout
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    y: 20,
                    transition: { duration: 0.3, ease: "easeOut" } 
                  }}
                  className="p-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center origin-center"
                >
                  {/* Product Info */}
                  <div className="col-span-6 flex items-center space-x-4 w-full md:w-auto">
                    <div className="relative w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <Image 
                          src={item.imageUrl} 
                          alt={item.name} 
                          width={80} 
                          height={80} 
                          className="object-cover"
                        />
                      ) : (
                        <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 md:hidden mt-1">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-2 flex items-center justify-center w-full md:w-auto">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-800 dark:text-gray-100 select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-right hidden md:block">
                    <span className="text-gray-700 dark:text-gray-300">${item.price.toFixed(2)}</span>
                  </div>

                  {/* Subtotal and Remove Button */}
                  <div className="col-span-2 flex items-center justify-between w-full md:justify-end">
                    <span className="font-semibold text-gray-800 dark:text-gray-100 md:mr-4">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition flex items-center"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 md:flex md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Total: <span className="text-blue-600 dark:text-blue-400">${getCartTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`${
                  isCheckingOut 
                    ? 'bg-gray-400 dark:bg-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                } text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center w-full md:w-auto`}
              >
                {isCheckingOut ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 