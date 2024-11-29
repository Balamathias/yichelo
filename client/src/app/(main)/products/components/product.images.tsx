'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ProductImages = ({ images }: { images: string[] }) => {
  const [mainImageIndex, setMainImageIndex] = React.useState(0)
  const controls = useAnimation()

  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images available</p>
  }

  const handleNextImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrevImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      handleNextImage()
    } else {
      handlePrevImage()
    }
    controls.start({ opacity: 0, x: direction === 'left' ? '-100%' : '100%' }).then(() =>
      controls.start({ opacity: 1, x: 0 })
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex max-md:gap-4 md:gap-x-4 flex-col-reverse sm:flex-row">
        <div className="flex md:flex-col items-center gap-4 flex-1 flex-wrap max-sm:justify-center">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={cn(
                '',
              )}
              onClick={() => setMainImageIndex(index)}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                width={80}
                height={80}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={cn("aspect-square w-20 h-20 rounded-xl bg-gray-300 dark:bg-secondary overflow-hidden transition-opacity cursor-pointer hover:opacity-70 object-contain", { 'border-2 border-brand': mainImageIndex === index })}
                onError={() => console.error(`Failed to load image: ${image}`)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div className="flex-1 relative inset-0 p-0">
          <motion.div
            key={images[mainImageIndex]}
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={controls}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onPanEnd={(e, { offset }) => {
              if (offset.x > 50) handleSwipe('right')
              if (offset.x < -50) handleSwipe('left')
            }}
            className="relative flex-1 inset-0 p-0"
          >
            <img
              width={1000}
              height={1000}
              src={images[mainImageIndex]}
              alt={`Main image ${mainImageIndex + 1}`}
              className="w-full object-contain h-96 max-w-[600px] md:w-[600px] rounded-xl overflow-hidden bg-gray-300 dark:bg-secondary -mt-2"
              onError={() => console.error(`Failed to load main image: ${images[mainImageIndex]}`)}
            />
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-brand/20 text-brand transition-opacity hover:opacity-70 rounded-full p-2 shadow-md"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-brand/20 text-brand transition-opacity hover:opacity-70 rounded-full p-2 shadow-md"
          >
            <ChevronRight />
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductImages
