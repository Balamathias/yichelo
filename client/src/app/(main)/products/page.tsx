import React from 'react'
import { BRAND_NAME } from '@/lib/utils'
import ProductsComponent from './components/products-component'

interface Props {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: any
) {
  const q = (await searchParams)?.q as string

  return {
    title: `Discover products ~ ${BRAND_NAME}`,
    description: `Discover products on ${BRAND_NAME}`,
    openGraph: {
      images: ['/meta/logo.png'],
    },
  }
}

const Page = ({ searchParams }: Props) => {

  return (
    <div className="flex flex-col max-w-7xl mx-auto gap-y-5 py-6">
      <div className='flex flex-col gap-y-6 px-2.5 md:px-10'>
        <ProductsComponent />
      </div>
    </div>
  )
}

export default Page