'use client'

import React from 'react'
import Form from 'next/form'
import { useActionState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { useSearchParams } from 'next/navigation'
import { createProduct } from '@/actions/product.actions'
import { UploadDropzone } from '@/lib/uploadthing'
import Image from 'next/image'

const NewProductForm = () => {
  const [state, createProductAction, loading] = useActionState(createProduct, undefined)
  const [images, setImages] = React.useState<string[]>([])

  const searchParams = useSearchParams()
  const starter = searchParams.get('starter')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    
    console.log(data.get('name'))
  }

  return (
    <div className='flex flex-col py-8 gap-y-3'>
      <UploadDropzone 
        endpoint='upload-images'
        onClientUploadComplete={(files) => {
            console.log(files)
            setImages(files.map((file) => file.url))
          }
        }
      />

      {
        images.length > 0 && (
          <div className='grid grid-cols-3 gap-4'>
            {
              images.map((image, index) => (
                <Image key={index} src={image} width={500} height={500} alt='product image' className='w-full h-48 object-cover rounded-lg' />
              ))
            }
          </div>
        )
      }

      <form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
        <div className='flex flex-col gap-y-4'>
          <Label htmlFor="name" className='text-muted-foreground'>Product Name</Label>
          <Input
            type="text"
            id="name"
            name='name'
            placeholder='Enter product name'
            className='border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none'
            defaultValue={starter || ''}
          />
        </div>

        <div className='flex flex-col gap-y-4'>
          <Label htmlFor="description" className='text-muted-foreground'>Description</Label>
          <Textarea
            id="description"
            name='description'
            placeholder='Enter product description'
            className='border-b-2 border-secondary p-4 rounded-none min-h-36 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none'
          />
        </div>

        <div className='w-full flex'>
          <Button>Save</Button>
        </div>
      </form>
    </div>
  )
}

export default NewProductForm