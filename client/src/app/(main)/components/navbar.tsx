'use client'

import { User } from '@/@types/user'
import { ModeToggle } from '@/components/theme-toggle'
import { Button, buttonVariants } from '@/components/ui/button'
import { useCart } from '@/lib/react-query/cart.query'
import { useCartStore } from '@/lib/store/cart'
import { BRAND_NAME, cn } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import SearchBar from './search-bar'

interface Props {
  user: User | null
}

const Navbar = ({ user }: Props) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
  const cartItems = useCartStore(state => state.items)
  const {data: cart} = useCart()

  const items = user?._id ? cart?.products : cartItems
  const totalItems = items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  useEffect(() => {
    if (currentPath === '/cart') {
      document.title = `(${totalItems}) Cart`
    }
  }, [totalItems])

  return (
    <nav className='w-full h-16 md:h-20 fixed top-0 flex items-center justify-center z-20 bg-background/80 backdrop-blur-sm'>
      <div className='max-w-7xl px-4 md:px-10 flex items-center justify-between w-full'>
        <div className='flex items-center gap-4'>
          <Link href={'/'} className='text-2xl font-bold'>{BRAND_NAME}</Link>

          <ul className='flex-row gap-4 items-center hidden md:flex'>
            <li>
              <Link href='/products'>Products</Link>
            </li>

            <li>
              <Link href='/explore'>Explore</Link>
            </li>
          </ul>
        </div>

        <div className='hidden md:flex'>
          <SearchBar />
        </div>

        <div className='flex flex-row justify-between items-center gap-4'>
          <ModeToggle />

          <span role='button' className={cn('rounded-xl relative hover:bg-secondary transition-opacity p-2')}>
            <Link href='/cart'>
              <ShoppingCart size={20} />
              {
                totalItems > 0 && (
                  <span className='absolute -top-2 -right-2 bg-primary text-white dark:text-black text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center aspect-square mt-0.5'>{totalItems}</span>
                )
              }
            </Link>
          </span>

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