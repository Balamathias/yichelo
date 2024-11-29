'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

const CategoryFilterItem = ({ name }: { name: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const qs = searchParams.toString()


  const handleCategoryClick = () => {
    router.push(`?category=${name}&${qs}`, undefined)
  }

  return (
    <Button 
      variant={'secondary'} 
      size={'sm'}
      onClick={handleCategoryClick}
      className='rounded-2xl'>
      {name}
    </Button>
  )
}

export default CategoryFilterItem