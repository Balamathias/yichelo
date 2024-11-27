'use client'

import { Product } from "@/@types/product"
import { Button } from "@/components/ui/button"

interface Props {
  product: Product
}

const ProductActions = ({ product }: Props) => {
  return (
    <div className="flex flex-col gap-y-3 py-4">

      <Button size={'lg'} className="rounded-xl">Add to Cart</Button>
      <Button size={'lg'} variant={'default'} className="rounded-xl bg-brand text-white transition-opacity hover:opacity-70">Buy Now</Button>
    </div>
  )
}

export default ProductActions