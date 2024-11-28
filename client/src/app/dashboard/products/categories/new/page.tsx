import { Suspense } from "react"
import NewCategoryForm from "../../components/new-category-form"

const Page = async () => {
  return (
    <div className='mx-auto w-full max-w-7xl px-4 md:px-12'>
      <title>New Category</title>
      <meta name="description" content="Create a new category" />

      <div className='flex items-center justify-between w-full flex-1 pb-4'>
        <h1 className='text-xl hidden md:block font-bold'>{'New Category'}</h1>
      </div>
      
      <Suspense>
        <NewCategoryForm />
      </Suspense>
    </div>
  )
}

export default Page