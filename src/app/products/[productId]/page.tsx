// No "use client" - this is now a Server Component

import { products } from "@/lib/placeholder-data"; // Use the correct data source
import { notFound } from 'next/navigation';
import ProductCard from "@/components/ui/ProductCard"; // For related products
import Image from 'next/image';
import type { Product } from '@/types'; // Import Product type
import ProductInteractionClient from '@/components/products/ProductInteractionClient'; // Import the new client component

// Define the expected params structure
interface ProductDetailPageProps {
  // Params might be a promise in some contexts
  params: { 
    productId: string;
  }
}

// Page is now async to potentially fetch data in the future
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Explicitly await params before accessing properties
  // Although params might not strictly be a Promise here, this addresses the error message
  const resolvedParams = await params; 
  const productId = resolvedParams.productId; 
  
  // Find the product (replace with actual fetch if needed)
  const product = products.find(p => p.id === productId);

  if (!product) {
    notFound();
  }
  
  // Get related products (excluding the current one)
  const relatedProducts = products.filter(p => p.id !== productId).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        {/* Left Column: Image (Static) */}
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

        {/* Right Column: Details (Static + Client Component) */}
        <div className="flex flex-col justify-center py-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 leading-tight">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {product.description || "No detailed description available for this product."}
          </p>
          
          {/* Render the Client Component for interactions */}
          <ProductInteractionClient product={product} />
          
        </div>
      </div>

      {/* Full Description Section (Static) */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Product Details</h2>
        <div className="prose dark:prose-invert prose-sm sm:prose-base max-w-none 
                       font-mono 
                       text-gray-700 dark:text-gray-300 
                       prose-headings:font-semibold prose-headings:text-gray-700 dark:prose-headings:text-gray-200 
                       prose-p:leading-relaxed prose-ul:ml-4 
                       prose-li:marker:text-gray-400 dark:prose-li:marker:text-gray-500">
          <p>Detailed information about the {product.name}. This section outlines key features, specifications, and usage guidelines to help you make the most of your purchase.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <h3 className="text-lg font-semibold mt-6 mb-2">Key Features</h3>
          <ul>
            <li>Feature one detailing specific benefits and use cases.</li>
            <li>Another important feature description highlighting unique aspects.</li>
            <li>Technical specification or material information providing clarity.</li>
          </ul>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </section>

      {/* Related Products Section (Static) */}
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