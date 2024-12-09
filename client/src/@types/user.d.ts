export interface User {
  _id: string;
  username: string;
  email: string;
  roles: ('customer' | 'seller' | 'admin') [];
  avatar?: string;
  firstName?: string;
  lastName?: string;
  verified?: boolean;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  viewedProducts: string[];
  purchasedProducts: string[];
  rememberMe?: boolean;
  lastLogin?: Date;
}

export interface PaginatedUsers {
  users: User[];
  pagination: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    nextPage: number | null
    prevPage: number | null
  },
}

export interface UserFilter {
  username?: string;
  limit?: number;
  page?: number;
  sort?: string;
  keyword?: string;
  email?: string;
  roles?: ('customer' | 'seller' | 'admin') [];
  firstName?: string;
  lastName?: string;
  phone?: string;
  verified?: boolean;
  rememberMe?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}