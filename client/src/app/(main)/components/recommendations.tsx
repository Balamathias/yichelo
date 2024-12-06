'use client'

import React, { use } from 'react'
import { Product as TProduct } from '@/@types/product'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Product from './product'

import { Skeleton } from '@/components/ui/skeleton'
import ProductSkeleton from './product.skeleton'

interface Props {
  promisedRecommendations: Promise<TProduct[]>
}

const Recommendations = ({ promisedRecommendations }: Props) => {
  const recommendations = use(promisedRecommendations)

  if (!recommendations?.length) {
    return (
      <div className="flex flex-col gap-y-6">
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-3">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
        Recommended
      </h2>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full flex flex-col gap-y-2"
      >
        <CarouselContent className='w-full'>
          {recommendations?.map((group) => (
            <CarouselItem key={group?._id} className="basis-[55%] md:basis-[28%] lg:basis-[20%]">
              <div className="p-1">
                <Product key={group._id} product={group} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='hidden'>
          <CarouselPrevious className="" />
          <CarouselNext className=''/>
        </div>
      </Carousel>
    </div>
  )
}

export const RecommendationsSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <Skeleton className="h-8 w-1/2 md:w-1/4" />

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full flex flex-col gap-y-2"
      >
        <CarouselContent className='w-full'>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="basis-[55%] md:basis-[28%] lg:basis-[20%]">
              <div className="p-1">
                <ProductSkeleton />
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

export default Recommendations
