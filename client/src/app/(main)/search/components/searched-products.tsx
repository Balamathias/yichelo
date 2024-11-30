'use client'

import { useInfiniteProducts } from '@/lib/react-query/product.query'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import Product from '../../components/product'
import { Button } from '@/components/ui/button'
import ProductsSkeleton from '../../components/products.skeleton'
import { LucideAlertTriangle } from 'lucide-react'
import { ProductFilter } from '@/@types/product'

const SearchProducts = () => {

  const searchParams = useSearchParams()
  const keyword = searchParams.get('q') || ''
  const tag = searchParams.get('tag') || ''
  const sort = searchParams.get('sort') || ''
  const maxPrice = searchParams.get('max_price') || ''
  const minPrice = searchParams.get('min_price') || ''

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
    limit: 20,
    tag,
    sort: sort as ProductFilter['sort'],
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined
  })


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
    <div className="flex flex-col gap-y-5">

      <h1 className="text-2xl font-semibold">Search results for &quot;{keyword || tag}&quot;</h1>
      
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
                    <p className='text-muted-foreground'>No products found for keyword &quot;{keyword || tag}&quot;.</p>
                  </div>
                )
              }
            </React.Fragment>
          ))
        }
      </div>

      <div className='flex items-center justify-center'>
        {
          hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className='p-2 rounded-xl w-fit'
              variant={'secondary'}
              size={'lg'}
            >
              {isFetchingNextPage ? 'Loading more...' : 'More results'}
            </Button>
          )
        }
      </div>
    </div>
  )
}

export default SearchProducts