'use client'

import { Product } from '@/@types/product'
import { formatCurrency } from '@/lib/utils'
import React, { useState } from 'react'
import ProductActions from './product.actions'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface Props {
  product: Product
}

const ProductInfo = ({ product }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='flex flex-1 flex-col gap-y-3 px-4 max-md:py-4'>
      <div className='flex flex-col gap-y-2'>
        <h2 className='text-2xl text-primary font-bold py-2'>{product.name}</h2>
        <h3 className='text-lg text-primary font-semibold'>{formatCurrency(product.price, 'NGN')}</h3>
      </div>

      <div className='gap-y-2 py-2'>
        {product?.badge && <Badge>{product.badge}</Badge>}
      </div>

      <ProductActions product={product} />

      <div className='flex flex-col gap-y-2 py-4'>
        <div className='flex flex-col gap-y-1'>
          <h3 className='font-semibold text-lg'>Description</h3>
          <p className={`text-muted-foreground ${isExpanded ? '' : 'line-clamp-2'}`}>
            {product.description}
          </p>
          <button onClick={toggleDescription} className="text-blue-500">
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        </div>

        <div className='flex flex-col gap-y-1'>
          <h3 className='font-semibold text-lg'>Features</h3>
          <ul className='list-disc list-inside marker:text-brand'>
            {product.features.map((feature, index) => (
              <li key={index} className='text-muted-foreground marker:text-brand list-disc'>{feature}</li>
            ))}
          </ul>
        </div>

        <div className='flex flex-wrap gap-3 items-center'>
          {
            product?.tags?.map((tag, index) => (
              <Link className='bg-secondary rounded-2xl px-4 py-2.5 hover:opacity-70 transition-opacity' href={'#'} key={index}>{tag}</Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ProductInfo