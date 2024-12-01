import { InsertCategory, InsertProduct, PaginatedProducts, ProductFilter, UpdateProduct } from '@/@types/product'
import { createCategory, createProduct, getProducts, getProductSuggestions, updateProduct } from '@/actions/product.actions'
import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query'


export const useCreateProduct = () => useMutation({
  mutationKey: ['createProduct'],
  mutationFn: (data: InsertProduct) => createProduct(data),
})

export const useUpdateProduct = () => useMutation({
  mutationKey: ['updateProduct'],
  mutationFn: (data: UpdateProduct) => updateProduct(data),
})

export const useCreateCategory = () => useMutation({
  mutationKey: ['createCategory'],
  mutationFn: (data: InsertCategory) => createCategory(undefined, data),
})

export const useSuggestions = (keyword: string) => useQuery({
  queryKey: ['suggestions', keyword],
  queryFn: () => getProductSuggestions(keyword),
})

// @ts-expect-error: Unreachable code error
export const useInfiniteProducts = (filters?: ProductFilter) => useInfiniteQuery({
  queryKey: ['products', filters],
  queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
    const prod = await getProducts({ ...filters, page: pageParam });
    return prod!
  },
  getNextPageParam: (lastPage) => {
    if (lastPage?.pagination?.nextPage) {
      const nextPage = lastPage.pagination.nextPage;
      return nextPage ? (nextPage) : undefined;
    }
    return undefined
  },
  initialData: {
    pages: [],
    pageParams: [],
  },
})
