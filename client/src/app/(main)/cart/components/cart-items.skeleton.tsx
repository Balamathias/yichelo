'use client'

import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CartItemsSkeleton = () => {
  return (
    <div className='flex flex-col gap-4 md:flex-row w-full'>
      <div className='flex flex-col gap-y-4 md:basis-2/3 w-full flex-1'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='flex flex-col gap-2 p-2.5 md:flex-row md:gap-4'>
            <Skeleton className='h-32 w-full md:w-40' />
            <div className='flex flex-col gap-y-2 w-full'>
              <Skeleton className='h-6 w-1/2' />
              <Skeleton className='h-6 w-1/2' />

              <div className='flex flex-row items-center gap-2'>
                <Skeleton className='h-8 w-8' />
                <Skeleton className='h-8 w-8' />
                <Skeleton className='h-8 w-8' />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-y-4 p-4 md:p-6 rounded-xl border w-full justify-between flex-1 md:min-w-[400px]'>
        <div className='flex flex-col gap-y-2.5'>
          <h2 className='text-2xl font-semibold'>Order Summary</h2>
          <Skeleton className='h-6 w-1/2' /> {/* Skeleton for subtotal */}
        </div>

        <Skeleton className='h-12 w-full rounded-xl' /> {/* Skeleton for Checkout button */}
      </div>
    </div>
  )
}

export default CartItemsSkeleton 