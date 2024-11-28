import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ProductGroupSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <Skeleton className="h-8 w-1/2" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-64 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

export default ProductGroupSkeleton