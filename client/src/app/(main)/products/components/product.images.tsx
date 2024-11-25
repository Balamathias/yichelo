'use client'

import Image from 'next/image'
import React from 'react'

const ProductImages = ({ images }: { images: string[] }) => {
  const [mainImage, setMainImage] = React.useState(images[0])

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex gap-4'>
        <div className='flex-1'>
          <Image width={1000} height={5000} src={mainImage} alt='' className='w-full h-64 max-w-[600px] object-cover rounded-xl bg-gray-300 dark:bg-secondary' />
        </div>

        <div className='flex flex-col gap-y-4'>
          {images.map((image, index) => (
            <div
              key={index}
              className='w-20 h-20 rounded-xl bg-gray-300 dark:bg-secondary overflow-hidden'
              onClick={() => setMainImage(image)}
            >
              <Image width={500} height={500} src={image} alt='' className='aspect-square w-full h-full object-cover' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductImages