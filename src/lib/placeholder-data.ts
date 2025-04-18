import { Product, Advertisement } from '@/types';

// Mock product data
export const products: Product[] = [
  {
    id: "1",
    name: "Modern Office Chair",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=500",
    description: "Ergonomic design for all-day comfort in the modern workplace."
  },
  {
    id: "2",
    name: "Minimalist Desk Lamp",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=500",
    description: "Energy-efficient LED with adjustable brightness for your workspace."
  },
  {
    id: "3",
    name: "Wooden Coffee Table",
    price: 349.99,
    imageUrl: "https://images.unsplash.com/photo-1532372320572-cda25653a694?q=80&w=500",
    description: "Hand-crafted from sustainable oak with a modern finish."
  },
  {
    id: "4",
    name: "Decorative Throw Pillow",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500",
    description: "Soft, durable fabric with a bold geometric pattern."
  }
];

// Mock advertisement data
export const advertisements: Advertisement[] = [
  {
    id: "1",
    title: "Summer Sale - Up to 50% Off",
    description: "Enjoy our biggest sale of the year with discounts on all premium furniture. Limited time offer!",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=500",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    category: "Promotion",
    author: "Marketing Team"
  },
  {
    id: "2",
    title: "New Collection: Scandinavian Minimalism",
    description: "Discover our new collection inspired by Nordic design principles. Clean lines, functional pieces, and natural materials.",
    imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=500",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    category: "Collection",
    author: "Design Department"
  },
  {
    id: "3",
    title: "Interior Design Tips for Small Spaces",
    description: "Learn how to maximize your small living space with these practical interior design tips from our experts.",
    imageUrl: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=500",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    category: "Guide",
    author: "Design Team"
  },
  {
    id: "4",
    title: "Sustainability Initiative: Tree Planting Program",
    description: "For every purchase over $500, we'll plant a tree in partnership with environmental organizations.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=500",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    category: "Sustainability",
    author: "CEO Office"
  }
];

// Helper function to get top products
export function getTopProducts(count: number = 3): Product[] {
  return products.slice(0, count);
}

// Helper function to get latest advertisements
export function getLatestAdvertisements(count: number = 3): Advertisement[] {
  // Sort by date (newest first)
  return [...advertisements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
} 