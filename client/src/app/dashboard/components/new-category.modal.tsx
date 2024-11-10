'use client'

import React from 'react'
import DynamicModal from '@/components/dynamic-modal'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { LucideListPlus, } from 'lucide-react'
import { Input } from '@/components/ui/input'

const NewCategory = () => {
  return (
    <DynamicModal
      trigger={
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={'icon'} variant={'ghost'}>
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
      <form className="flex flex-col gap-y-4">
        <Input
          placeholder={'Enter product name'}
          className='focus-visible:ring-0 h-12 border-muted rounded-lg'
        />
        
        <div className='w-full justify-end flex'>
          <Button>Continue</Button>
        </div>
      </form>
    </DynamicModal>
  )
}

export default NewCategory