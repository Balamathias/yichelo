export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  stock: number;
  category: string;
  tags?: string[];
  rating?: number;
  discount?: number;
  badge?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProducts {
  products: Product[];
  pagination: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  },
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
  _id: string;
  name: string;
  description?: string;
  thumbnail?: string;
}

export interface InsertCategory {
  _id: string;
  name: string;
  description?: string;
  thumbnail?: string;
}