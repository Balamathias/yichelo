'use client'

import { cn, mobileLinks } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'

const BottomBar = () => {
  const mobilelinks = useMemo(() => mobileLinks, [])
  const pathname = usePathname()

  return (
    <nav className='md:hidden flex fixed w-full bottom-0 h-16 p-4 bg-background/70 backdrop-blur-lg z-20'>
      <div className='flex gap-x-4 items-center justify-between w-full'>
        {
          mobilelinks.map(link => (
            <Link 
              key={link.label} className='flex gap-x-2 items-center relative' href={link.href}
            >
              {<link.Icon className={cn('peer', pathname === (link?.temp_href || link?.href) && 'text-wealth')} size={28}/>}
              <span className='font-semibold text-base hidden sm:block'>
                {link.label}
              </span> 
            </Link>
          ))
        }
      </div>
    </nav>
  )
}

export default BottomBar