'use client'

import React, { use, useState } from 'react'
import DynamicModal from '@/components/dynamic-modal'
import { FilterIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductCategory, ProductFilter } from '@/@types/product'
import { useRouter, useSearchParams } from 'next/navigation'
import { addQueryParams, cn } from '@/lib/utils'
import { DialogClose } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import CategoryFilterItem from './category-filter-item'

interface Props {
  promiseCategories: Promise<ProductCategory[]>
}

const PriceSortFilter = ({ promiseCategories }: Props) => {
  const [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: 0
  })

  const [open, setOpen] = useState(false)

  const categories = use(promiseCategories)
  const categoryList = categories?.map((category) => category.name)

  const router = useRouter()

  const searchParams = useSearchParams()
  const qs = searchParams?.toString()

  const sort = searchParams?.get('sort') as ProductFilter['sort']

  const priceSorting: ProductFilter['sort'][] = ['newest', 'price-asc', 'price-desc']

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPrice({
      ...price,
      [name]: value
    })
  }

  const handleApplyFilters = () => {
    const url = addQueryParams(qs, {
      min_price: price.minPrice,
      max_price: price.maxPrice
    })

    router.push(url)
  }

  const handleSortBy = (_sort: ProductFilter['sort']) => {
    const url = addQueryParams(qs, {
      sort: _sort,
    })

    router.push(url)
  }

  return (
    <DynamicModal
      setOpen={setOpen}
      open={open}
      trigger={
        <Button variant="secondary" className="flex items-center gap-2 rounded-2xl" size={'icon'}>
          <FilterIcon />
        </Button>
      }
    >
      <div className='flex flex-col gap-y-4'>
        <div className="flex flex-col gap-y-2.5">
          <Label className='text-sm font-semibold'>Price Range</Label>
          <div className='flex items-center gap-3'>
            <Input
              type='number'
              name='minPrice'
              value={price.minPrice}
              onChange={handlePriceChange}
              placeholder='Min Price'
              className='w-1/2 p-2 border rounded-xl focus:outline-none'
            />
            <Input
              type='number'
              name='maxPrice'
              value={price.maxPrice}
              onChange={handlePriceChange}
              placeholder='Max Price'
              className='w-1/2 p-2 borderrounded-xl focus:outline-none'
            />
          </div>
          <div className='flex justify-end w-full'>
            <DialogClose asChild>
              <Button 
                variant='default'
                onClick={handleApplyFilters}
                className="rounded-xl"
              >Apply</Button>
            </DialogClose>
          </div>
        </div>

        <div className='flex flex-col gap-2.5'>
          <Label className='text-sm font-semibold'>Sort By</Label>
          <div className='flex flex-row gap-2.5'>
            {priceSorting.map((_sort, index) => (
              <Button
                key={index}
                variant='secondary'
                className={cn('rounded-2xl capitalize', {
                  'bg-brand/20 dark:bg-brand-light/20 text-brand dark:text-brand-light': _sort === sort,
                })}
                onClick={() => {
                  handleSortBy(_sort)
                  setOpen(false)
                }}
              >
                {_sort?.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5 py-2.5">
          <Label className='text-sm font-semibold'>All Categories</Label>
          <div className="flex flex-wrap items-center gap-3">
            {
              categoryList?.map((category, i) => (
                <CategoryFilterItem key={i} name={category} onPress={() => setOpen(false)} />
              ))
            }
          </div>
        </div>

      </div>
    </DynamicModal>
  )
}

export default PriceSortFilter