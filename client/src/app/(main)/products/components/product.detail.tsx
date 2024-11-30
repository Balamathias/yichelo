import { getProduct } from '@/actions/product.actions'
import React from 'react'
import ProductImages from './product.images'
import ProductInfo from './product.info'

interface Props {
  productId: string
}

const ProductDetail = async ({ productId }: Props) => {
  const product = await getProduct(productId)

  return (
    <div className='flex flex-col md:flex-row gap-y-8 md:gap-x-8'>
      <ProductImages images={product.images} />
      <ProductInfo product={product} />
    </div>
  )
}

export default ProductDetail