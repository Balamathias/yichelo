import { InsertProduct } from '@/@types/product'
import { createProduct } from '@/actions/product.actions'
import { useMutation } from '@tanstack/react-query'


export const useCreateProduct = () => useMutation({
  mutationKey: ['createProduct'],
  mutationFn: (data: InsertProduct) => createProduct(undefined, data),
})