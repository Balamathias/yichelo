import { getUser } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button'
import { BRAND_NAME } from '@/lib/utils';
import Link from 'next/link';

export default async function Home() {
  
  const user = await getUser()
  console.log(user)
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
