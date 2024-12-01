import { getCategories } from "@/actions/product.actions"
import NewProductForm, { NewProductFormSkeleton } from "../components/new-product-form"
import { Suspense } from "react"

const Page = () => {
  const getCats = getCategories()
  return (
    <div className='mx-auto w-full max-w-7xl px-4 md:px-12'>
      <title>New Product</title>
      <meta name="description" content="Create a new product" />
      <meta name="keywords" content="new product, create product" />

      <div className='flex items-center justify-between w-full flex-1'>
        <h1 className='text-xl hidden md:block font-bold'>{'New Product'}</h1>
      </div>
      
      <Suspense fallback={<NewProductFormSkeleton />}>
        <NewProductForm getCategories={getCats} />
      </Suspense>
    </div>
  )
}

export default Page