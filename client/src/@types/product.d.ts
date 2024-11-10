export interface Product {
  name: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  stock: number;
  category: string;
  tags?: string[];
  rating?: number;
  badge?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InsertProduct {
  name: string;
  description: string;
  price: number;
  images: string[];
  features?: string[];
  stock: number;
  category: string;
  tags?: string[];
  rating?: number;
  badge?: string;
}

export interface ProductCategory {
  name: string;
  description?: string;
  thumbnail?: string;
}
