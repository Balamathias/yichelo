import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LucidePlus } from "lucide-react"
import { UserFilter } from "@/@types/user"
import { getUsers } from "@/actions/user.actions"
import SearchUsers from "../products/components/search-products"
import UserTable, { UserTableSkeleton } from "./components/users-table"
import { Metadata } from "next"

type Props = {
  params: Promise<any>
  searchParams: Promise<{ [key: string]: string }>
}

export const metadata: Metadata = {
  title: 'Users',
  description: 'Manage your users',
}

const Page = async ({ searchParams: _searchParams }: Props) => {
  const searchParams = (await _searchParams)

  const filters: UserFilter = {
    ...searchParams,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 20,
    keyword: searchParams.keyword,
    sort: "createdAt-desc"
  }

  console.log(searchParams)

  const promisedUsers = getUsers(filters)

  return (
    <div className='mx-auto w-full max-w-7xl p-4 md:p-10 md:px-12'>
      <div className='flex items-center justify-between w-full flex-1 py-2.5 gap-2.5'>
        <div className="flex items-center flex-row-reverse gap-x-1.5 max-md:justify-between">
          <h1 className='text-xl hidden md:block font-bold'>Users</h1>
          <Button variant={'secondary'} className="rounded-xl hidden" asChild>
            <Link href="/dashboard/users/new">
              <LucidePlus />
              <span className="">New</span>
            </Link>
          </Button>
        </div>
        <SearchUsers />
      </div>

      <div>
        <Suspense fallback={<UserTableSkeleton />}>
          <UserTable promisedUsers={promisedUsers} />
        </Suspense>
      </div>
    </div>
  )
}

export default Page