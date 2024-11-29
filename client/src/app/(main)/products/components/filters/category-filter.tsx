import { getCategories } from '@/actions/product.actions'
import React from 'react'
import CategoryFilterItem from './category-filter-item'
import { Skeleton } from '@/components/ui/skeleton'

const CategoryFilter = async () => {
  const categories = await getCategories()

  const categoryList = categories.map((category) => category.name)

  return (
    <div className="flex flex-wrap items-center py-4 gap-3">
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
    <div className="flex flex-wrap items-center py-4 gap-3">
      {
        Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-16 h-8" />
        ))
      }
    </div>
  )
}

export default CategoryFilter