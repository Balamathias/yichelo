import { Product as TProduct } from '@/@types/product'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn, formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface ProductProps {
  product: TProduct
}

const Product = ({ product }: ProductProps) => {
  return (
    <Card className='rounded-lg flex flex-col gap-y-3 p-4 shadow-none border-none hover:opacity-70 transition-opacity hover:transition-opacity cursor-pointer relative'>
      <Image src={product.images?.[0]} alt={product.name} width={200} height={200} className='object-contain w-full h-48 rounded-3xl py-2.5 bg-gray-300 dark:bg-secondary' />

      {
        product?.badge && (<Badge className='absolute top-6 right-6 capitalize'>{product.badge}</Badge>)
      }

      <div className='flex flex-col gap-y-2'>
        <h2 className='font-bold'>{product.name}</h2>

        <div className='tracking-tighter'>
          <span className={cn('font-semibold text-sm', product?.discount && 'line-through text-muted-foreground')}>{formatCurrency(product.price, 'NGN')}</span>

          {
            product?.discount && (
              <span className='font-semibold text-primary text-sm'>{formatCurrency(product.price - ((product?.discount || 0) / 100 * product.price ), 'NGN')}</span>
            )
          }
        </div>

        <div className='flex flex-col gap-2'>
          <p className='font-normal text-sm text-muted-foreground'><b className="font-bold">{product.stock}</b> items in stock.</p>
        </div>
      </div>
    </Card>
  )
}

export default Product