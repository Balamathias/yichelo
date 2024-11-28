import { Skeleton } from "@/components/ui/skeleton"

const ProductImagesSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex max-md:gap-4 md:gap-x-4 flex-col-reverse sm:flex-row">
        <div className="flex md:flex-col items-center gap-4 flex-1 flex-wrap max-sm:justify-center">
          {Array.from({ length: 4 }).map((_, index) => ( // Adjust the number of skeletons as needed
            <Skeleton key={index} className="aspect-square w-20 h-20" />
          ))}
        </div>

        <div className="flex-1 relative inset-0 p-0">
          <Skeleton className="w-full h-96 max-w-[600px] md:w-[600px] rounded-xl bg-gray-300 dark:bg-secondary" />
        </div>
      </div>
    </div>
  )
}

export default ProductImagesSkeleton 