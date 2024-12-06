'use server'

import { InsertProduct, PaginatedProducts, Product, ProductCategory, InsertCategory, GroupedProduct, ProductFilter, UpdateProduct, PaginatedProductCategories, CategoryFilter } from '@/@types/product';

import api from '@/lib/axios.server'

export const getProducts = async (filter?: ProductFilter) => {
  return (await api.get<PaginatedProducts>('/products', { params: {...filter }})).data
}

export const getProduct = async (id: string) => {
  return (await api.get<Product>(`/products/${id}`)).data
}

export const getSimilarProducts = async (id: string) => {
  return (await api.get<Product[]>(`/products/similar/${id}`)).data
}

export const getProductsByCategory = async (category: string) => {
  return (await api.get<Product[]>(`/products/category/${category}`)).data
}

export const createProduct = async (data: InsertProduct) => {
  const product = await api.post<Product>('/products', data)

  return product.data
}

export const updateProduct = async (data: UpdateProduct) => {
  const product = await api.put<Product>(`/products/${data?._id}`, data)
  return product.data
}

export const deleteProduct = async (id: string) => {
  const product = (await api.delete(`/products/${id}`))?.data
  return product
} 

export const getRecommendedProducts = async (limit=10) => {
  try {
    const recommendedProducts = await api.get<Product[]>('/recommendations', { params: { limit } })
    return recommendedProducts.data
  } catch (error) {
    console.error('Get recommended products failed:', error)
    return []
  }
}

export const getCategories = async <T extends boolean = false>(
  filters?: CategoryFilter & { paginate?: T }
): Promise<T extends true ? PaginatedProductCategories : ProductCategory[]> => {
  const params = { ...filters };

  const response = await api.get('/categories', { params: { ...params } });
  
  return (filters?.paginate ? (response.data as PaginatedProductCategories) : (response.data as ProductCategory[])) as T extends true ? PaginatedProductCategories : ProductCategory[];
}

export const getCategory = async (id: string) => {
  try {
    const category = await api.get<ProductCategory>(`/categories/${id}`)
    return category.data
  } catch (error) {
    console.error('Get category failed:', error)
    return null
  }
}

export const deleteCategory = async (id: string) => {
  const category = (await api.delete(`/categories/${id}`))?.data
  return category
} 

export const createCategory = async (initial: any, data: InsertCategory) => {
  if (data?._id) {
    const category = await api.put<ProductCategory>(`/categories/${data?._id}`, data)
    return category.data
  } else {
    const category = await api.post<ProductCategory>('/categories', data)
    return category.data
  }
  
}

export const updateCategory = async (initial: any, data: InsertCategory) => {
  const category = await api.put<ProductCategory>('/categories', data)
  return category.data
}

export const getGroupedProducts = async (limit=3) => {
  try {
    const groupedProducts = await api.get<GroupedProduct[]>('/categories/grouped', { params: { limit } })
    return groupedProducts.data
  } catch (error) {
    console.error('Get grouped products failed:', error)
    return []
  }
}

export const getProductSuggestions = async (keyword: string) => {
  try {
    const suggestions = await api.get<string[]>('/products/search/suggestions', { params: { keyword } })
    return suggestions.data
  } catch (error) {
    console.error('Get product suggestions failed:', error)
    return []
  }
}