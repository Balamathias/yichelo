'use client'

import React from "react"
import { Product } from "@/@types/product"
import { Button } from "@/components/ui/button"

import { LucidePlus, LucideMinus } from 'lucide-react'
import useCartActions from "@/hooks/use-cart-actions"

interface Props {
  product: Product
}

const ProductActions = ({ product }: Props) => {
  
  const {
    quantity,
    incrementQuantity,
    decrementQuantity,
    handleAddToCart
  } = useCartActions(product)
  return (
    <div className="flex flex-col gap-y-3 py-4">
      <div className="flex items-center justify-between gap-x-4">
        <h2 className="text-base font-semibold text-primary">Quantity</h2>

        <div className="flex gap-2 items-center">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-xl transition-opacity hover:opacity-70"
            onClick={incrementQuantity}
          >
            <LucidePlus size={24} />
          </Button>
          <span className="font-semibold text-lg">{quantity}</span>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-xl transition-opacity hover:opacity-70"
            disabled={quantity === 0}
            onClick={decrementQuantity}
          >
            <LucideMinus size={24} />
          </Button>
        </div>
      </div>

      <Button
        size="lg"
        onClick={handleAddToCart}
        className="rounded-xl"
      >
        {quantity > 0 ? "Remove from Cart" : "Add to Cart"}
      </Button>

      <Button
        size="lg"
        variant="default"
        className="rounded-xl bg-brand text-white hover:bg-brand transition-opacity hover:opacity-70"
      >
        Buy Now
      </Button>
    </div>
  )
}

export default ProductActions
