import { getUser } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button'
import { BRAND_NAME } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Home ~ Discover gadgets | ${BRAND_NAME}`,
  description: 'Home page',
}

export default async function Home() {
  
  const user = await getUser()
  return (
    <div className="flex flex-col container mx-auto gap-y-5 p-4 py-6">
      <div>
        <h2 className="text-2xl font-bold">{user?.email}</h2>
        <Button asChild size={'lg'} className='rounded-lg'>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
