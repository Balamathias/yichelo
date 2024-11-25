import { BRAND_NAME } from '@/lib/utils';
import { Metadata } from 'next';
import Products from './components/products';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: `Home ~ Discover gadgets | ${BRAND_NAME}`,
  description: 'Home page',
}

export default async function Home() {
  
  return (
    <div className="flex flex-col max-w-7xl mx-auto gap-y-5 py-6 p-4">
      <div>
        <Suspense fallback={'Loading Products ...'}>
          <Products />
        </Suspense>
      </div>
    </div>
  );
}
