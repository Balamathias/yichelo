'use client'

import DynamicModal from '@/components/dynamic-modal'
import { cn, mobileLinks } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import SearchBar from './search-bar'

const BottomBar = () => {
  const mobilelinks = useMemo(() => mobileLinks, [])
  const [openSearch, setOpenSearch] = React.useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setOpenSearch(false)
  }, [pathname, searchParams])

  return (
    <nav className='md:hidden flex fixed w-full bottom-0 h-16 p-4 bg-background/70 backdrop-blur-lg z-20'>
      <div className='flex gap-x-4 items-center justify-between w-full'>
        {
          mobilelinks.map(link => (
            <Link 
              key={link.label} className='flex gap-x-2 items-center relative' href={link.href}
              onClick={link?.temp_href === '/search' ? (e) => {
                e.preventDefault()
                setOpenSearch(true)
              } : undefined}
            >
              {<link.Icon className={cn('peer', pathname === (link?.temp_href || link?.href) && 'text-brand')} size={28}/>}
              <span className='font-semibold text-base hidden sm:block'>
                {link.label}
              </span> 
            </Link>
          ))
        }
      </div>

      <div className='flex gap-4 items-center'>
        <DynamicModal
          open={openSearch}
          setOpen={setOpenSearch}
          dialogOnly
          dialogClassName='bg-background/10 backdrop:blur-lg'
          >
            <div className='flex flex-col gap-4'>
              <SearchBar />
            </div>
          </DynamicModal>
      </div>
    </nav>
  )
}

export default BottomBar