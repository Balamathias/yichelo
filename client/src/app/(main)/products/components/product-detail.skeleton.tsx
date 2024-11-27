import ProductActionsSkeleton from './product-actions.skeleton'
import ProductImagesSkeleton from './product-images.skeleton'
import ProductInfoSkeleton from './product-info.skeleton'

const ProductDetailSkeleton = () => {
  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <ProductImagesSkeleton />
      <div className='flex flex-col gap-4'>
        <ProductInfoSkeleton />
        <ProductActionsSkeleton />
      </div>
    </div>
  )
}

export default ProductDetailSkeleton 