"use client";

import { products } from "@/lib/placeholder-data"; // Use the correct data source
import { notFound } from 'next/navigation';
import ProductCard from "@/components/ui/ProductCard"; // For related products
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext'; // Import useCart
import { useState } from 'react'; // Removed 'use' import
import { motion, AnimatePresence } from 'framer-motion'; // Import motion
import type { Product } from '@/types'; // Import Product type

// Define the expected params structure
interface ProductDetailPageProps {
  params: {
    productId: string;
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Revert back to accessing params directly
  const { productId } = params;
  
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [addedStatus, setAddedStatus] = useState<'idle' | 'adding' | 'added'>('idle'); // State for animation

  // Find the product based on the ID from the params
  const product = products.find(p => p.id === productId);

  // If product not found, show 404 page
  if (!product) {
    notFound();
  }
  
  // Placeholder for related products (excluding the current one)
  const relatedProducts = products.filter(p => p.id !== productId).slice(0, 3);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount)); // Ensure quantity is at least 1
  };

  const handleAddToCart = () => {
    if (!product || addedStatus !== 'idle') return; 
    
    setAddedStatus('adding');
    addToCart(product, quantity); // Pass quantity to context
    
    // Trigger 'added' state after a short delay for visual feedback
    setTimeout(() => {
      setAddedStatus('added');
      // Reset to 'idle' after the 'added' animation finishes
      setTimeout(() => setAddedStatus('idle'), 1000); // Duration of the 'added' state
    }, 300); // Short delay before showing 'added'
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        {/* Left Column: Image */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center h-80 md:h-[500px] relative overflow-hidden shadow-inner">
          {product.imageUrl ? (
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              className="object-contain p-4"
              priority
            />
          ) : (
            <svg className="w-24 h-24 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col justify-center py-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 leading-tight">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {product.description || "No detailed description available for this product."}
          </p>
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</span>
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
            className={`relative w-full md:w-auto text-white font-semibold py-3 px-10 rounded-lg shadow-md transition-colors duration-200 ease-in-out text-lg flex items-center justify-center overflow-hidden min-h-[52px] ${ 
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
                    className="flex items-center"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                   Add {quantity > 1 ? `${quantity} ` : ''}to Cart
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
      </div>

      {/* Full Description Section */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Full Product Description</h2>
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <p>This is where a more detailed description of the <strong>{product.name}</strong> would go. It might include technical specifications, use cases, materials, origin, or extended features.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <ul>
            <li>Feature one detailing benefits.</li>
            <li>Another important feature description.</li>
            <li>Technical spec or material information.</li>
          </ul>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </section>

      {/* Related Products Section - Ensure dark background isn't overridden */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-700 dark:text-gray-200">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Optional: Generate static paths for known products if using SSG
// export async function generateStaticParams() {
//   return products.map((product) => ({
//     productId: product.id,
//   }));
// } 
// } 