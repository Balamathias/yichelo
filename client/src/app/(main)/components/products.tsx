import React from 'react'

import { getProducts } from '@/actions/product.actions'
import Product from './product'

const Products = async () => {
  const products = await getProducts()

  return (
    <div className="flex flex-col gap-y-2 py-5">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
        Find Gadgets
      </h2>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 md:gap-5'>
        {
          products?.products?.map((product) => (
            <Product key={product._id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default Products