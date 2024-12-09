import { ModeToggle } from '@/components/theme-toggle';
import React from 'react'
import QuickActions from './components/quick-actions';
import QuickDash from './components/quick-dash';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page',
  openGraph: {
    images: ['/meta/logo.png']
  },
}

const Page = async () => {
  return (
    <div className='mx-auto w-full max-w-7xl p-4 md:p-10 md:px-12 flex flex-col gap-y-6'>
      <div className='flex items-center justify-between w-full flex-1 py-3 rounded-xl border border-secondary px-3 shadow'>
        <h1 className='text-xl font-bold'>Dashboard</h1>
        
        <QuickActions />
      </div>

      <div className='flex flex-col gap-y-4'>
        <QuickDash />
        <ModeToggle />
      </div>
    </div>
  )
}

export default Page