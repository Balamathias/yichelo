import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ProductGroupSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <Skeleton className="h-8 w-1/2" />

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full flex flex-col gap-y-2"
      >
        <CarouselContent className='w-full'>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="basis-[90%] md:basis-[44%] lg:basis-[30%]">
              <div className="p-1">
                <Skeleton key={index} className="w-full h-64 rounded-xl" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='items-center gap-4 relative w-full hidden'>
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </Carousel>
    </div>
  )
}

export default ProductGroupSkeleton