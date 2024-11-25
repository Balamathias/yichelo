import ProductSkeleton from './product.skeleton'

const ProductsSkeleton = () => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  )
}

export default ProductsSkeleton 