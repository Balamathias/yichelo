import { getProductsByCategory } from '@/actions/product.actions'
import React from 'react'
import Product from '../../components/product'

interface Props {
  name: string
  id: string
}

const ProductCategories = async ({ name, id }: Props) => {
  const products = await getProductsByCategory(id)
  return (
    <div className='flex flex-col gap-y-2 py-5'>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white capitalize">
        {name}
      </h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 md:gap-5'>
        {
          products?.map((product) => (
            <Product key={product._id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default ProductCategories