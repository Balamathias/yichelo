'use client'

import React from 'react'
import DynamicModal from '@/components/dynamic-modal'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { LucidePlus, } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

const NewProduct = () => {
  const router = useRouter()

  const [productName, setProductName] = React.useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    router.push('/dashboard/products/new?starter=' + productName)
  }

  return (
    <DynamicModal
      trigger={
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={'icon'} variant={'ghost'} className='rounded-full flex items-center justify-center bg-pink-500/25 text-pink-500'>
                <LucidePlus size={28} className='w-8 h-8' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              New Product
            </TooltipContent>
          </Tooltip>
        </div>
      }
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder={'Enter product name'}
          className='focus-visible:ring-0 h-12 border-secondary rounded-lg dark:border-muted'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          min={2}
        />
        
        <div className='w-full justify-end flex'>
          <Button>Continue</Button>
        </div>
      </form>
    </DynamicModal>
  )
}

export default NewProduct