'use server'

import { InsertProduct, PaginatedProducts, Product } from './../@types/product.d';

import api from '@/lib/axios.server'

export const getProducts = async () => {
  return await api.get<PaginatedProducts>('/products')
}

export const getProduct = async (id: string) => {
  return await api.get<Product>(`/products/${id}`)
}

export const createProduct = async (initial: any, data: InsertProduct) => {
  return await api.post('/products', data)
}