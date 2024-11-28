import React, { Suspense } from 'react'
import ProductCategorySkeleton from '../../components/product-categories-skeleton'
import ProductCategories from '../../components/product-categories'

interface Props {
  params: {
    slug: string | undefined
  }
}

const Page = ({ params }: Props) => {

  const [name, id] = params.slug?.split('_') || ''

  return (
    <div className="flex flex-col max-w-7xl mx-auto gap-y-5 py-6">
      <div className='flex flex-col gap-y-6 px-4 md:px-10'>
        
        <Suspense fallback={<ProductCategorySkeleton />}>
          <ProductCategories name={name} id={id} />
        </Suspense>
      </div>
    </div>
  )
}

export default Page