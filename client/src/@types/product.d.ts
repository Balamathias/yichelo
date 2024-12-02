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
    nextPage: number | null
    prevPage: number | null
  },
}

export interface InsertProduct {
  _id: string;
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

export interface UpdateProduct extends InsertProduct {
  _id: string
}

export interface ProductCategory {
  _id: string;
  name: string;
  description?: string;
  thumbnail?: string;
}

export interface PaginatedProductCategories {
  categories: ProductCategory[];
  pagination: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    nextPage: number | null
    prevPage: number | null
  },
}

export interface InsertCategory {
  _id?: string;
  name: string;
  description?: string;
  thumbnail?: string;
}

interface GroupedProduct {
  _id: string;
  categoryName: string;
  thumbnail: string;
  description: string;
  products: Product[];
  count: number;
  avgRating: number;
  totalStock: number;
}

interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price-asc' | 'price-desc' | 'newest';
  limit?: number;
  page?: number;
  keyword?: string;
  tag?: string;
  cacheable?: boolean
}

interface CategoryFilter {
  sort?: 'name-asc' | 'name-desc' | 'newest';
  limit?: number;
  page?: number;
  keyword?: string;
  paginate?: boolean
}