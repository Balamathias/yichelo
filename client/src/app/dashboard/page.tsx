import { ModeToggle } from '@/components/theme-toggle';
import React from 'react'
import QuickActions from './components/quick-actions';

const Page = async () => {
  return (
    <div className='mx-auto w-full max-w-7xl p-4 md:p-10 md:px-12 flex flex-col gap-y-5'>
      <div className='flex items-center justify-between w-full flex-1 py-3 rounded-lg bg-background px-3 dark:px-0 shadow'>
        <h1 className='text-xl hidden md:block font-bold'>Dashboard</h1>
        
        <QuickActions />
      </div>

      <div>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Page