import { Suspense } from "react"
import { CategoryFilter } from "@/@types/product"
import { getCategories } from "@/actions/product.actions"
import SearchCategories from "../components/search-products"
import CategoryTable, { CategoryTableSkeleton } from "../components/category.table"

type Props = {
  params: Promise<{ productId: string }>
  searchParams: Promise<{ [key: string]: string }>
}

const Page = async ({ searchParams: _searchParams }: Props) => {
  const searchParams = (await _searchParams)

  const filters: CategoryFilter = {
    ...searchParams,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 10,
    sort: "newest",
  }

  const promisedCategories = getCategories({...filters, paginate: true})

  return (
    <div className='mx-auto w-full max-w-7xl p-4 md:p-10 md:px-12'>
      <div className='flex items-center justify-between w-full flex-1 py-2.5'>
        <h1 className='text-xl hidden md:block font-bold'>Categories</h1>
        <SearchCategories />
      </div>

      <div>
        <Suspense fallback={<CategoryTableSkeleton />}>
          <CategoryTable promisedCategories={promisedCategories} />
        </Suspense>
      </div>
    </div>
  )
}

export default Page