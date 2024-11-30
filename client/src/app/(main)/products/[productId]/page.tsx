import React, { Suspense } from 'react'
import ProductDetail from '../components/product.detail'
import ProductDetailSkeleton from '../components/product-detail.skeleton'
import { Metadata, ResolvingMetadata } from 'next'
import { getCategory, getProduct } from '@/actions/product.actions'
import SimilarProductsSkeleton from '../components/similar-products-skeleton'
import SimilarProducts from '../components/similar-products'

type Props = {
  params: Promise<{ productId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params)?.productId
 
  const product = await getProduct(id)
  const category = await getCategory(product.category)
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.name,
    description: product.description,
    category: category?.name,
    openGraph: {
      images: [...product?.images, ...previousImages],
    },
  }
}

const Page = async ({ params: promisedParams }: Props) => {
  const params = await promisedParams
  return (
    <div className="flex flex-col max-w-7xl mx-auto gap-y-5 py-6 md:p-4">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail productId={params?.productId} />
      </Suspense>

      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProducts productId={params?.productId} />
      </Suspense>
    </div>
  )
}

export default Page