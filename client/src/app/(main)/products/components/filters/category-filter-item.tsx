'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { addQueryParams, cn } from '@/lib/utils'

const CategoryFilterItem = ({ name, onPress }: { name: string, onPress?: () => void | any }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const qs = searchParams.toString()


  const handleCategoryClick = () => {
    const url = addQueryParams(qs, { category: name })
    onPress?.()
    router.push(url)
  }

  return (
    <Button 
      variant={'secondary'} 
      onClick={handleCategoryClick}
      className={cn('rounded-2xl', {
        'bg-brand/20 text-brand dark:bg-brand-light/20 dark:text-brand-light': name === searchParams.get('category'),
      })}>
      {name}
    </Button>
  )
}

export default CategoryFilterItem