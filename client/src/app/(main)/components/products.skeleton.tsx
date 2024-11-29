import { Skeleton } from '@/components/ui/skeleton'
import ProductSkeleton from './product.skeleton'

const ProductsSkeleton = () => {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex flex-col gap-y-4'>
        <Skeleton className='h-6 w-1/4' />
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 md:gap-5'>
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsSkeleton 