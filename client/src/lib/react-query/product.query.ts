import { InsertCategory, InsertProduct } from '@/@types/product'
import { createCategory, createProduct } from '@/actions/product.actions'
import { useMutation } from '@tanstack/react-query'


export const useCreateProduct = () => useMutation({
  mutationKey: ['createProduct'],
  mutationFn: (data: InsertProduct) => createProduct(undefined, data),
})

export const useCreateCategory = () => useMutation({
  mutationKey: ['createCategory'],
  mutationFn: (data: InsertCategory) => createCategory(undefined, data),
})