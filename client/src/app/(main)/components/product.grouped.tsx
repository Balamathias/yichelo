'use client'

import React, { use } from 'react'
import ProductCategoryGroup from './product-category-group'
import { GroupedProduct } from '@/@types/product'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Props {
  promisedGroupedProducts: Promise<GroupedProduct[]>
}

const ProductGroups = ({ promisedGroupedProducts }: Props) => {
  const productGroups = use(promisedGroupedProducts)

  if (!productGroups?.length) {
    return (
      <div className="flex flex-col gap-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Explore Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p>No categories found or failed to load categories.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
        Explore Categories
      </h2>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full flex flex-col gap-y-2"
      >
        <CarouselContent className='w-full'>
          {productGroups?.map((group) => (
            <CarouselItem key={group?._id} className="basis-[80%] md:basis-[44%] lg:basis-[30%]">
              <div className="p-1">
                <ProductCategoryGroup key={group._id} group={group} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='items-center gap-4 relative w-full hidden'>
          <CarouselPrevious className="relative" />
          <CarouselNext className='relative'/>
        </div>
      </Carousel>
    </div>
  )
}

export default ProductGroups
