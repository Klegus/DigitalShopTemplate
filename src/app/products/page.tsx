import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/placeholder-data";
import { Product } from "@/types";

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100">Our Products</h1>

      {/* Placeholder for Filters/Sorting */}
      {/* <div className="mb-8 text-center">[Filters/Sorting Options Placeholder]</div> */}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 