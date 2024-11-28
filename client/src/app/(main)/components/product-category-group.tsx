import { GroupedProduct } from '@/@types/product'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface ProductCategoryGroupProps {
  group: GroupedProduct
}

const ProductCategoryGroup = ({ group }: ProductCategoryGroupProps) => {
  return (
    <div
      key={group._id}
      className="relative group rounded-xl overflow-hidden drop-shadow-lg cursor-pointer transition-opacity bg-gradient-to-tr dark:from-secondary dark:to-gray-900 from-gray-200 to-gray-400"
    >
      <Image
        src={group.thumbnail}
        alt={group.categoryName}
        width={1000}
        height={1000}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div>
          <h3 className="text-2xl font-bold text-white capitalize">
            {group.categoryName}
          </h3>
          <p className="text-sm text-gray-100 mt-2 line-clamp-3">
            {group.description}
          </p>
        </div>
        <Button
          className='rounded-full bg-white text-black hover:bg-white hover:text-black hover:opacity-70 transition-opacity'
        >
          Explore
          <Sparkles />
        </Button>
      </div>
    </div>
  )
}

export default ProductCategoryGroup