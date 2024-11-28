import React, { Suspense } from 'react'
import ProductCategorySkeleton from '../../components/product-categories-skeleton'
import ProductCategories from '../../components/product-categories'
import { Metadata, ResolvingMetadata } from 'next'
import { getCategory } from '@/actions/product.actions'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params)?.slug?.split('_')[1]
 
  const category = await getCategory(id)
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: category?.name,
    description: category?.description,
    category: category?.name,
    openGraph: {
      images: [category?.thumbnail ?? '', ...previousImages],
    },
  }
}

const Page = async({ params }: Props) => {

  const [name, id] = (await params).slug?.split('_') || ''

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