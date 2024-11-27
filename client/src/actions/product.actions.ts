'use server'

import { InsertProduct, PaginatedProducts, Product, ProductCategory, InsertCategory } from './../@types/product.d';

import api from '@/lib/axios.server'

export const getProducts = async () => {
  return (await api.get<PaginatedProducts>('/products')).data
}

export const getProduct = async (id: string) => {
  return (await api.get<Product>(`/products/${id}`)).data
}

export const createProduct = async (initial: any, data: InsertProduct) => {
  const product = await api.post<Product>('/products', data)

  return product.data
}

export const updateProduct = async (initial: any, data: InsertProduct) => {
  const product = await api.put<Product>('/products', data)
  return product.data
}

export const getCategories = async () => {
  const categories = await api.get<ProductCategory[]>('/categories')
  return categories.data
}

export const createCategory = async (initial: any, data: InsertCategory) => {
  const category = await api.post<ProductCategory>('/categories', data)
  return category.data
}

export const updateCategory = async (initial: any, data: InsertCategory) => {
  const category = await api.put<ProductCategory>('/categories', data)
  return category.data
}
