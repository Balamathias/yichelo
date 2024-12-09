'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { addQueryParams } from '@/lib/utils'
import { LucideSearch } from 'lucide-react'

const SearchProducts = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const qs = searchParams?.toString()
  const [keyword, setKeyword] = useState(searchParams?.get('keyword') || '')
  const path = usePathname()

  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      const url = addQueryParams(qs, { keyword })
      router.push(url)
    } else {
      router.push(path)
    }
  }

  return (
    <div className='flex flex-col'>
      <form onSubmit={submitHandler} className='flex items-center h-10 rounded-xl bg-secondary px-2'>
        <button type='submit' className='bg-transparent'>
          <LucideSearch />
        </button>
        <Input
          type='text'
          name='q'
          id='q'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search for anything...'
          className={'focus-visible:ring-0 focus-within:border-none border-none h-full'}
        />
      </form>
    </div>
  )
}

export default SearchProducts