import { BRAND_NAME } from '@/lib/utils';
import { Metadata } from 'next';
import { Suspense } from 'react';
import ProductGroups from './components/product.grouped';
import ProductGroupSkeleton from './components/product-group-skeleton';
import AllProducts from './products/components/all-products';
import { getGroupedProducts, getRecommendedProducts } from '@/actions/product.actions';
import Recommendations, { RecommendationsSkeleton } from './components/recommendations';

export const metadata: Metadata = {
  title: `Home ~ Discover gadgets | ${BRAND_NAME}`,
  description: 'Home page',
}

export default async function Home() {

  const promisedGroupedProducts = getGroupedProducts(10);
  const promisedRecommendations = getRecommendedProducts(10);
  
  return (
    <div className="flex flex-col max-w-7xl mx-auto gap-y-5 py-6">
      <div className='flex flex-col gap-y-6 px-2.5 md:px-10'>
        <Suspense fallback={<ProductGroupSkeleton />}>
          <ProductGroups promisedGroupedProducts={promisedGroupedProducts} />
        </Suspense>

        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations promisedRecommendations={promisedRecommendations} />
        </Suspense>

        <AllProducts />
      </div>
    </div>
  );
}
