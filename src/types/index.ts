export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string; // ISO date string
  category: string;
  author: string;
} 