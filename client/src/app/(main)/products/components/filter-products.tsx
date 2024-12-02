import React, { Suspense } from 'react'
import CategoryFilter, { CategoryFilterSkeleton } from './filters/category-filter'
import PriceSortFilter from './filters/price-sort-filter'
import { getCategories } from '@/actions/product.actions'
import { Skeleton } from '@/components/ui/skeleton'

const ProductFilters = () => {
  const promiseCategories = getCategories({limit: 40})
  return (
    <div className="flex items-center justify-between">
      <Suspense
        fallback={
          <Skeleton className="w-16 h-8" />
        }
      >
        <PriceSortFilter promiseCategories={promiseCategories}/>
      </Suspense>
      <Suspense fallback={<CategoryFilterSkeleton />}>
        <CategoryFilter />
      </Suspense>
    </div>
  )
}

export default ProductFilters