import React from 'react'

import { getProducts } from '@/actions/product.actions'
import Product from './product'

const Products = async () => {
  const products = await getProducts()

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
      {
        products?.products?.map((product) => (
          <Product key={product._id} product={product} />
        ))
      }
    </div>
  )
}

export default Products