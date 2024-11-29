import React from 'react'
import AllProducts from './all-products'
import ProductFilters from './filter-products'

const ProductsComponent = () => {
  return (
    <div className='flex flex-col gap-6'>
      <ProductFilters />
      <AllProducts />
    </div>
  )
}

export default ProductsComponent