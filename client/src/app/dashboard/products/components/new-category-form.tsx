'use client'

import { InsertCategory, ProductCategory } from '@/@types/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCreateCategory } from '@/lib/react-query/product.query'
import { UploadButton } from '@/lib/uploadthing'
import { LucideLoader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  category?: ProductCategory | null
}

const NewCategoryForm = ({ category }: Props) => {
  const starter = useSearchParams().get('starter')
  const [thumbnail, setThumbnail] = React.useState<string | null>(category?.thumbnail || null)
  const { mutate: createCategory, isPending: loading } = useCreateCategory()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    data.thumbnail = thumbnail || ''
    data._id = category?._id as any

    e.currentTarget.reset()

    createCategory(data as unknown as InsertCategory, {
      onSuccess: () => {
        toast.success(`Category ${category ? 'updated' : 'created'} successfully`)
        setThumbnail(null)
        router.replace(`/dashboard/products/categories`)
      },
      onError: (error) => {
        toast.error(`Failed to ${category ? 'update' : 'create'} category`, { description: error.message })
      },
    })
  }
  return (
    <div>
      <form className='flex flex-col gap-y-8' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <Label htmlFor="name" className="text-muted-foreground">
            Category Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter category name"
            className="border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none dark:border-secondary"
            defaultValue={category?.name || starter || ''}
            required
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <Label htmlFor="description" className="text-muted-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter category description"
            defaultValue={category?.description || ''}
            className="border-b-2 border-secondary p-4 rounded-none min-h-36 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none"
          />
        </div>

        <div className='flex items-start justify-start'>
          {!thumbnail && (
              <UploadButton
                endpoint="upload-thumbnail"
                onClientUploadComplete={(files) => {
                  setThumbnail(files[0]?.url);
                }}
                className="w-fit justify-start items-start py-4"
              />
            )}

          {thumbnail && (
            <Image
              src={thumbnail}
              width={500}
              height={500}
              alt="category thumbnail"
              className="w-full max-w-[500px] h-60 object-cover rounded-lg border border-muted"
            />
          )}
        </div>

        <div className="w-full flex justify-between">
          <Button size="lg" variant={'destructive'} className='rounded-xl' type='button' asChild disabled={loading}>
            <Link href='/dashboard'>Cancel</Link>
          </Button>

          <Button size="lg" className='rounded-xl' disabled={loading}>
          { loading && <LucideLoader size={24} className='mr-2 animate-spin' /> }
          {loading ? category ? 'Updating' : 'Creating...' : category ? 'Update Category' : 'Create Category'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export const NewCategoryFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        <Label className="text-muted-foreground">
          Category Name
        </Label>
        <Skeleton className="border-b-2 border-secondary p-4 rounded-none h-12" />
      </div>

      <div className="flex flex-col gap-y-4">
        <Label className="text-muted-foreground">
          Description
        </Label>
        <Skeleton className="border-b-2 border-secondary p-4 rounded-none min-h-36" />
      </div>

      <div className='flex items-start justify-start'>
        <Skeleton className="w-full max-w-[500px] h-60 rounded-lg border border-muted" />
      </div>

      <div className="w-full flex justify-between">
        <Skeleton className="w-fit justify-start items-start py-4 rounded-xl h-12" />
        <Skeleton className="rounded-xl h-12 w-full" />
      </div>
    </div>
  )
}

export default NewCategoryForm