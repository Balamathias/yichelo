'use server'

import { InsertProduct, PaginatedProducts, Product, ProductCategory } from './../@types/product.d';

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

export const getCategories = async () => {
  const categories = await api.get<ProductCategory[]>('/categories')

  return categories.data
}