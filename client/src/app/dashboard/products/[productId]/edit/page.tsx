import { getCategories, getProduct } from "@/actions/product.actions"
import { Suspense } from "react"
import NewProductForm, { NewProductFormSkeleton } from "../../components/new-product-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Update Product'
}

const Page = async ({ params: { productId } }: { params: { productId: string }}) => {

  const getCats = getCategories()
  const product = await getProduct(productId)

  return (
    <div className='mx-auto w-full max-w-7xl px-4 md:px-12'>
      <title>Update Product</title>
      <meta name="description" content="Create a new product" />
      <meta name="keywords" content="new product, create product" />

      <div className='flex items-center justify-between w-full flex-1'>
        <h1 className='text-xl hidden md:block font-bold'></h1>
      </div>
      
      <Suspense fallback={<NewProductFormSkeleton />}>
        <NewProductForm getCategories={getCats} product={product} />
      </Suspense>
    </div>
  )
}

export default Page