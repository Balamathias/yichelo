import React, { Suspense } from 'react'
import CategoryFilter, { CategoryFilterSkeleton } from './filters/category-filter'

const ProductFilters = () => {
  return (
    <div className="flex">
      <Suspense fallback={<CategoryFilterSkeleton />}>
        <CategoryFilter />
      </Suspense>
    </div>
  )
}

export default ProductFilters