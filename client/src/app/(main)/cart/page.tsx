import { BRAND_NAME } from '@/lib/utils';
import { Metadata } from 'next';
import CartDetail from './components/cart.detail';
import { Suspense } from 'react';
import CartItemsSkeleton from './components/cart-items.skeleton';

export const metadata: Metadata = {
  title: `Cart | ${BRAND_NAME}`,
  description: 'Cart page',
}

export default async function Home() {
  
  return (
    <div className="flex flex-col max-w-7xl mx-auto gap-y-5 py-6">
      <div className='flex flex-col gap-y-6 px-4 md:px-10'>
        <Suspense fallback={<CartItemsSkeleton />}>
          <CartDetail />
        </Suspense>
      </div>
    </div>
  );
}
