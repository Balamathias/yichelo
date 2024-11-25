import { getProduct } from '@/actions/product.actions'
import React from 'react'
import ProductImages from './product.images'

interface Props {
  productId: string
}

const ProductDetail = async ({ productId }: Props) => {
  const product = await getProduct(productId)

  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <ProductImages images={product.images} />
    </div>
  )
}

export default ProductDetail