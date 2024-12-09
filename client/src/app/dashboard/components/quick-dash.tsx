import { getCategories, getProducts } from '@/actions/product.actions'
import { getUsers } from '@/actions/user.actions'
import { LucideEye, Shield } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const QuickDash = () => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <Suspense fallback={<SkeletonItemDash />}>
        <UsersDash />
      </Suspense>

      <Suspense fallback={<SkeletonItemDash />}>
        <ProductsDash />
      </Suspense>

      <Suspense fallback={<SkeletonItemDash />}>
        <CategoriesDash />
      </Suspense>
    </div>
  )
}

const UsersDash = async () => {
  const users = await getUsers()
  return (
    <div className='p-4 shadow rounded-3xl border border-secondary flex flex-col justify-between gap-y-8'>
      <h2 className="text-2xl font-semibold">Users <Link href={'/dashboard/users'} className='cursor-pointer'><LucideEye /></Link></h2>

      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold">{users.pagination?.totalItems}</p>
        <p className="text-lg text-muted-foreground">Total Users</p>
      </div>

      <Link href={'/dashboard/users'} className='rounded-full p-2 px-4 flex items-center justify-center gap-1 bg-secondary'>
        <Shield size={20} />
        <span>New</span>
      </Link>
    </div>
  )
}

const ProductsDash = async () => {
  const products = await getProducts()
  return (
    <div className='p-4 shadow rounded-3xl border border-secondary flex flex-col justify-between gap-y-8'>
      <h2 className="text-2xl font-semibold">Products <Link href={'/dashboard/products'} className='cursor-pointer'><LucideEye /></Link></h2>

      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold">{products?.pagination?.totalItems}</p>
        <p className="text-lg text-muted-foreground">Total Products</p>
      </div>

      <Link href={'/dashboard/products/new'} className='rounded-full p-2 px-4 flex items-center justify-center gap-1 bg-secondary'>
        <Shield size={20} />
        <span>New</span>
      </Link>
    </div>
  )
}

const CategoriesDash = async () => {
  const categories = await getCategories({ paginate: true })
  return (
    <div className='p-4 shadow rounded-3xl border border-secondary flex flex-col justify-between gap-y-8'>
      <h2 className="text-2xl font-semibold">Categories <Link href={'/dashboard/products/categories'} className='cursor-pointer'><LucideEye /></Link></h2>

      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold">{categories?.pagination?.totalItems}</p>
        <p className="text-lg text-muted-foreground">Total Categories</p>
      </div>

      <Link href={'/dashboard/products/categories/new'} className='rounded-full p-2 px-4 flex items-center justify-center gap-1 bg-secondary'>
        <Shield size={20} />
        <span>New</span>
      </Link>
    </div>
  )
}

const SkeletonItemDash = () => {
  return (
    <div className='p-4 shadow rounded-3xl border border-secondary flex flex-col justify-between gap-y-8'>
      <Skeleton className='w-1/2 h-8' />
      <Skeleton className='w-1/4 h-10' />
      <Skeleton className='w-full h-10 rounded-full' />
    </div>
  )
}

export default QuickDash