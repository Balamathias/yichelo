import { Skeleton } from '@/components/ui/skeleton'

const ProductSkeleton = () => {
  return (
    <div className='flex flex-col gap-y-3 p-4'>
      <Skeleton className='h-48 w-full rounded-3xl' />
      <Skeleton className='h-6 w-3/4' />
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-4 w-1/2' />
        <div className='flex gap-2'>
          <Skeleton className='h-4 w-1/4' />
          <Skeleton className='h-4 w-1/4' />
        </div>
        <Skeleton className='h-4 w-1/3' />
      </div>
    </div>
  )
}

export default ProductSkeleton 