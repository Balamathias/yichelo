'use client'

import { User } from '@/@types/user'
import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { BRAND_NAME } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props {
  user: User | null
}

const Navbar = ({ user }: Props) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
  return (
    <nav className='w-full h-20 fixed top-0 flex items-center justify-center z-20 bg-background/80 backdrop-blur-sm'>
      <div className='max-w-7xl px-4 md:px-10 flex items-center justify-between w-full'>
        <div className='flex items-center gap-4'>
          <Link href={'/'} className='text-2xl font-bold'>{BRAND_NAME}</Link>

          <ul className='flex flex-row gap-4 items-center'>
            <li>
              <Link href='/explore'>Explore</Link>
            </li>

            <li>
              <Link href='/products'>Products</Link>
            </li>
          </ul>
        </div>

        <div className='flex flex-row justify-between items-center gap-4'>
          <ModeToggle />

          <Button variant={'ghost'} size={'icon'} className='rounded-xl'>
            <ShoppingCart size={24} />
          </Button>

          {
            !user ? (
              <Button variant={'outline'} className='rounded-xl' asChild>
                <Link href={`/login?next=${currentPath}`}>Login</Link>
              </Button>
            ): (
              user?.roles?.includes('admin') ? (
                <Button variant={'outline'} className='rounded-xl' asChild>
                  <Link href='/dashboard'>Dashboard</Link>
                </Button>
              ) : (
                <Button variant={'outline'} className='rounded-xl' asChild>
                  <Link href='#'>Account</Link>
                </Button>
              )
            )
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar