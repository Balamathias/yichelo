import { getUser } from '@/actions/auth.actions';
import React from 'react'

const Page = async () => {
  const user = await getUser();
  return (
    <div className='mx-auto w-full max-w-7xl p-4 md:p-10'>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      <div className='flex flex-col gap-y-5'>
        <div>
          <h2 className='text-xl font-semibold'>Hi {user?.email}</h2>
          <p className='text-muted-foreground'>This is your dashboard. You can manage your account, view your orders, and much more.</p>
        </div>
      </div>
    </div>
  )
}

export default Page