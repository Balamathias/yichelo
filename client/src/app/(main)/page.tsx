import { BRAND_NAME } from '@/lib/utils';
import { Metadata } from 'next';
import Products from './components/products';
import { Suspense } from 'react';
import ProductsSkeleton from './components/products.skeleton';
import ProductGroups from './components/product.grouped';
import ProductGroupSkeleton from './components/product-group-skeleton';
import AllProducts from './products/components/all-products';

export const metadata: Metadata = {
  title: `Home ~ Discover gadgets | ${BRAND_NAME}`,
  description: 'Home page',
}

export default async function Home() {
  
  return (
    <div className="flex flex-col max-w-7xl mx-auto gap-y-5 py-6">
      <div className='flex flex-col gap-y-6 px-2.5 md:px-10'>
        <Suspense fallback={<ProductGroupSkeleton />}>
          <ProductGroups />
        </Suspense>

        <AllProducts />
        {/* <Suspense fallback={<ProductsSkeleton />}>
          <Products />
        </Suspense> */}
      </div>
    </div>
  );
}
