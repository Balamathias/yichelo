import { getCategories } from '@/actions/product.actions'
import React from 'react'
import CategoryFilterItem from './category-filter-item'
import { Skeleton } from '@/components/ui/skeleton'

const CategoryFilter = async () => {
  const categories = await getCategories(6)

  const categoryList = categories.map((category) => category.name)

  return (
    <div className="hidden flex-wrap items-center py-4 gap-3 md:flex">
      {
        categoryList.map((category, i) => (
          <CategoryFilterItem key={i} name={category} />
        ))
      }
    </div>
  )
}

export const CategoryFilterSkeleton = () => {
  return (
    <div className="hidden flex-wrap items-center py-4 gap-3 md:flex">
      {
        Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-16 h-8" />
        ))
      }
    </div>
  )
}

export default CategoryFilter