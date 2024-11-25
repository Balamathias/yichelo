import React, { Suspense } from 'react'
import ProductDetail from '../components/product.detail'

const Page = ({ params }: { params: { productId: string }}) => {
  return (
    <div className="flex flex-col max-w-7xl mx-auto gap-y-5 py-6 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail productId={params.productId} />
      </Suspense>
    </div>
  )
}

export default Page