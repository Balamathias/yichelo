import { Product } from '@/@types/product'
import { formatCurrency } from '@/lib/utils'
import React from 'react'
import ProductActions from './product.actions'
import { Badge } from '@/components/ui/badge'

interface Props {
  product: Product
}

const ProductInfo = ({ product }: Props) => {
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
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        <div className='flex flex-col gap-y-1'>
          <h3 className='font-semibold text-lg'>Features</h3>
          <ul className='list-disc list-inside marker:text-brand'>
            {product.features.map((feature, index) => (
              <li key={index} className='text-muted-foreground marker:text-brand list-disc'>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo