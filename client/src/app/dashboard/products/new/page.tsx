import { getCategories } from "@/actions/product.actions"
import NewProductForm, { NewProductFormSkeleton } from "../components/new-product-form"
import { Suspense } from "react"
import { Metadata } from "next"

type Props = {
  params: Promise<{ productId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata: Metadata = {
  title: 'New Product',
  description: 'Create a new product',
}

const Page = async ({ searchParams }: Props) => {
  const getCats = getCategories({ limit: 100 })
  return (
    <div className='mx-auto w-full max-w-7xl px-4 md:px-12'>

      <div className='flex items-center justify-between w-full flex-1'>
        <h1 className='text-xl py-4 font-semibold'>{(await searchParams)?.['starter'] || 'New Product'}</h1>
      </div>
      
      <Suspense fallback={<NewProductFormSkeleton />}>
        <NewProductForm getCategories={getCats} />
      </Suspense>
    </div>
  )
}

export default Page