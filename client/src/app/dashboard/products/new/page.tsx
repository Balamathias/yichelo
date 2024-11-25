import { getCategories } from "@/actions/product.actions"
import NewProductForm from "../components/new-product-form"
import { Suspense } from "react"

const Page = async ({ searchParams }: { searchParams: { starter: string | undefined }}) => {
  const productName = searchParams?.starter

  const getCats = getCategories()
  return (
    <div className='mx-auto w-full max-w-7xl p-4 md:p-10 md:px-12 bg-background'>
      <title>New Product</title>
      <meta name="description" content="Create a new product" />
      <meta name="keywords" content="new product, create product" />

      <div className='flex items-center justify-between w-full flex-1'>
        <h1 className='text-xl hidden md:block font-bold'>{'New Product'}</h1>
      </div>
      
      <Suspense fallback={'loading...'}>
        <NewProductForm getCategories={getCats} />
      </Suspense>
    </div>
  )
}

export default Page