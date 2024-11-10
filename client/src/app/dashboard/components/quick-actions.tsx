import React from 'react'
import NewProduct from './new-product.modal'
import NewCategory from './new-category.modal'

const QuickActions = () => {
  return (
    <div className='flex items-center justify-between'>
      <div className={'flex items-center gap-x-4'}>
        <NewProduct />
        <NewCategory />
      </div>
    </div>
  )
}

export default QuickActions