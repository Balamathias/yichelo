'use client'

import { useInfiniteProducts } from '@/lib/react-query/product.query'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import Product from '../../components/product'
import ProductsSkeleton from '../../components/products.skeleton'
import { LucideAlertTriangle } from 'lucide-react'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import ProductSkeleton from '../../components/product.skeleton'
import { ProductFilter } from '@/@types/product'

const AllProducts = () => {

  const searchParams = useSearchParams()

  const keyword = searchParams.get('q') || ''
  const minPrice = searchParams.get('min_price') || ''
  const maxPrice = searchParams.get('max_price') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || ''


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isLoading,
    error
  } = useInfiniteProducts({
    keyword: keyword,
    limit: 30,
    category,
    minPrice: (minPrice && Number(minPrice)) || undefined,
    maxPrice: (maxPrice && Number(maxPrice)) || undefined,
    sort: sort as ProductFilter['sort'] || 'newest'
  })

  useInfiniteScroll({ fetchNextPage, hasNextPage })

  if (isPending || isLoading) return <ProductsSkeleton />
  
  if (error) return (
    <div className='p-4 rounded-xl flex-col text-red-500 w-full flex items-center justify-center gap-4'>
      <LucideAlertTriangle size={40} className='' />
      <p className='text-muted-foreground'>Oop! We could not load your products right now; please refresh or try again later</p>
    </div>
  )

  if (!data?.pages.length) {
    return <ProductsSkeleton />
  }
  return (
    <div className="flex flex-col gap-y-3 mt-3">

      <h1 className="text-2xl md:text-3xl font-semibold">Find Gadgets</h1>
      
      <div className='w-full'>
      {
        data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {
                page?.products?.length ? (
                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 md:gap-5'>
                    {
                      page?.products?.map((product) => (
                        <Product key={product._id} product={product} />
                      ))
                    }
                  </div>
                ): (
                  <div className='p-4 rounded-xl flex-col text-brand w-full flex items-center justify-center gap-4'>
                    <LucideAlertTriangle size={40} className='' />
                    <p className='text-muted-foreground'>No products could be loaded at this point.</p>
                  </div>
                )
              }
            </React.Fragment>
          ))
        }
      </div>

      <div className='flex items-center justify-center'>
        {
          isFetchingNextPage && (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 md:gap-5'>
              {
                Array.from({ length: 10 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default AllProducts