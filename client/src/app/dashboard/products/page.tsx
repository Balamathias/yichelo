import { Suspense } from "react"
import ProductTable, { ProductTableSkeleton } from "@/app/dashboard/products/components/product.table"
import { ProductFilter } from "@/@types/product"
import SearchProducts from "./components/search-products"
import { getProducts } from "@/actions/product.actions"

type Props = {
  params: Promise<{ productId: string }>
  searchParams: Promise<{ [key: string]: string }>
}

const Page = async ({ searchParams: _searchParams }: Props) => {
  const searchParams = (await _searchParams)

  const filters: ProductFilter = {
    ...searchParams,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 20,
    sort: "newest"
  }

  const promisedProducts = getProducts(filters)

  return (
    <div className='mx-auto w-full max-w-7xl p-4 md:p-10 md:px-12'>
      <div className='flex items-center justify-between w-full flex-1 py-2.5'>
        <h1 className='text-xl hidden md:block font-bold'>Products</h1>
        <SearchProducts />
      </div>

      <div>
        <Suspense fallback={<ProductTableSkeleton />}>
          <ProductTable promisedProducts={promisedProducts} />
        </Suspense>
      </div>
    </div>
  )
}

export default Page