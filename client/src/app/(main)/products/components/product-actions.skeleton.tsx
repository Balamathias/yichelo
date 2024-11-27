import { Skeleton } from "@/components/ui/skeleton"

const ProductActionsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-32" /> {/* Placeholder for a button */}
      <Skeleton className="h-10 w-32" /> {/* Placeholder for another button */}
      <Skeleton className="h-10 w-32" /> {/* Placeholder for a third button */}
    </div>
  )
}

export default ProductActionsSkeleton 