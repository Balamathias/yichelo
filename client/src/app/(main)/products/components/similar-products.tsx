import React from 'react'
import { getSimilarProducts } from '@/actions/product.actions'
import Product from '../../components/product'

interface Props {
  productId: string
}

const SimilarProducts = async ({ productId }: Props) => {

  const similarProducts = await getSimilarProducts(productId)
  return (
    <div className='flex flex-col gap-y-2 py-5'>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Similar Products
      </h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
        {
          similarProducts?.map((product) => (
            <Product key={product._id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default SimilarProducts