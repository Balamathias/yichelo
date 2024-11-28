import { getGroupedProducts } from '@/actions/product.actions'
import Image from 'next/image'
import React from 'react'
import ProductCategoryGroup from './product-category-group'

const ProductGroups = async () => {
  const productGroups = await getGroupedProducts()

  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Explore Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productGroups?.slice(0, 3)?.map((group) => (
          <ProductCategoryGroup key={group._id} group={group} />
        ))}
      </div>
    </div>
  )
}

export default ProductGroups
