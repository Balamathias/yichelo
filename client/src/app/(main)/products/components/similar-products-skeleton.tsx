import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SimilarProductsSkeleton = () => {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex flex-col gap-y-4'>
        <Skeleton className='h-6 w-1/4' /> {/* Placeholder for section title */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 md:gap-5'>
          {Array.from({ length: 4 }).map((_, index) => ( // Adjust the number of skeletons as needed
            <div key={index} className='flex flex-col gap-y-2'>
              <Skeleton className='h-48 w-full' /> {/* Placeholder for product image */}
              <Skeleton className='h-6 w-3/4' /> {/* Placeholder for product name */}
              <Skeleton className='h-4 w-1/2' /> {/* Placeholder for product price */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SimilarProductsSkeleton