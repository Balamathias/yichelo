import { Skeleton } from "@/components/ui/skeleton"

const ProductInfoSkeleton = () => {
  return (
    <div className='flex flex-1 flex-col gap-y-3 px-4 max-md:py-4'>
      <div className='flex flex-col gap-y-2'>
        <Skeleton className='h-8 w-3/4' /> {/* Placeholder for product name */}
        <Skeleton className='h-6 w-1/2' /> {/* Placeholder for product price */}
      </div>

      <div className='gap-y-2 py-2'>
        <Skeleton className='h-6 w-1/4' /> {/* Placeholder for product badge */}
      </div>

      <div className='flex flex-col gap-y-2 py-4'>
        <div className='flex flex-col gap-y-1'>
          <Skeleton className='h-6 w-1/4' /> {/* Placeholder for description title */}
          <Skeleton className='h-4 w-full' /> {/* Placeholder for product description */}
        </div>

        <div className='flex flex-col gap-y-1'>
          <Skeleton className='h-6 w-1/4' /> {/* Placeholder for features title */}
          <ul className='list-disc list-inside marker:text-brand'>
            {Array.from({ length: 3 }).map((_, index) => ( // Adjust the number of skeletons as needed
              <li key={index} className='text-muted-foreground marker:text-brand list-disc'>
                <Skeleton className='h-4 w-full' /> {/* Placeholder for feature item */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductInfoSkeleton 