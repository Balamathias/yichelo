'use client'

import React from 'react'
import DynamicModal from '@/components/dynamic-modal'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { LucideListPlus, } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

const NewCategory = () => {
  const router = useRouter()

  const [categoryName, setCategoryName] = React.useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    router.push('/dashboard/products/categories/new?starter=' + categoryName)
  }

  return (
    <DynamicModal
      trigger={
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={'icon'} variant={'ghost'} className='rounded-full flex items-center justify-center bg-secondary/25 text-secondary-500'>
                <LucideListPlus size={28} className='w-8 h-8' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              New Category
            </TooltipContent>
          </Tooltip>
        </div>
      }
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder={'Enter product name'}
          className='focus-visible:ring-0 h-12 border-muted rounded-lg'
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        
        <div className='w-full justify-end flex'>
          <Button>Continue</Button>
        </div>
      </form>
    </DynamicModal>
  )
}

export default NewCategory