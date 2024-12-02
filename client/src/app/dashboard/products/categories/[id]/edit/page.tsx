import { getCategory } from "@/actions/product.actions"
import { Suspense } from "react"
import { Metadata } from "next"
import NewCategoryForm, { NewCategoryFormSkeleton } from "../../../components/new-category-form"

export const metadata: Metadata = {
  title: 'Update Product'
}

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ params }: Props) => {

  const category = await getCategory((await params)?.id)

  return (
    <div className='mx-auto w-full max-w-7xl px-4 md:px-12'>
      <title>Update Category</title>
      <meta name="description" content="update category" />

      <div className='flex items-center justify-between w-full flex-1'>
        <h1 className='text-xl hidden md:block font-bold'></h1>
      </div>
      
      <Suspense fallback={<NewCategoryFormSkeleton />}>
        <NewCategoryForm category={category} />
      </Suspense>
    </div>
  )
}

export default Page