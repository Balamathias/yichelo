import { Suspense } from "react"
import { CategoryFilter } from "@/@types/product"
import { getCategories } from "@/actions/product.actions"
import SearchCategories from "../components/search-products"
import CategoryTable, { CategoryTableSkeleton } from "../components/category.table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LucidePlus } from "lucide-react"

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
      <div className='flex items-center justify-between w-full flex-1 gap-2.5 py-2.5'>
        <div className="flex items-center gap-x-2.5 max-md:justify-between">
          <h1 className='text-xl hidden md:block font-bold'>Categories</h1>
          <Button variant={'secondary'} className="rounded-xl" asChild>
            <Link href="/dashboard/products/categories/new">
              <LucidePlus />
              <span className="ml-2">New</span>
            </Link>
          </Button>
        </div>
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