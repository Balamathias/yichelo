import { getGroupedProducts } from '@/actions/product.actions'
import React from 'react'
import ProductCategoryGroup from './product-category-group'

const ProductGroups = async () => {
  const productGroups = await getGroupedProducts()

  if (!productGroups?.length) {
    return (
      <div className="flex flex-col gap-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Explore Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p>No categories found or failed to load categories.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
        Explore Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productGroups?.map((group) => (
          <ProductCategoryGroup key={group._id} group={group} />
        ))}
      </div>
    </div>
  )
}

export default ProductGroups
