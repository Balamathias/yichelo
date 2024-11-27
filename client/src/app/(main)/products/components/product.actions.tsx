'use client'

import React from "react"
import { Product } from "@/@types/product"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store/cart"

import { LucidePlus, LucideMinus } from 'lucide-react'

interface Props {
  product: Product
}

const ProductActions = ({ product }: Props) => {
  const addToCart = useCartStore(state => state.add)
  const removeFromCart = useCartStore(state => state.remove)
  const items = useCartStore(state => state.items)

  const [quantity, setQuantity] = React.useState(1)

  React.useEffect(() => {
    handleToggleAddToCart()
  }, [quantity])

  const handleToggleAddToCart = () => {
    if (quantity > 0) {
      addToCart({product, quantity})
    } else {
      removeFromCart({product, quantity: 0})
    }
  }

  return (
    <div className="flex flex-col gap-y-3 py-4">
      
      <div className="flex items-center justify-between gap-x-4">
        <h2 className="text-base font-semibold text-primary">Quantity</h2>

        <div className="flex gap-2">
          <Button 
            size={'icon'} 
            variant={'secondary'} 
            className="rounded-xl transition-opacity hover:opacity-70"
          onClick={() => setQuantity(quantity + 1)}>
              <LucidePlus size={24} />
          </Button>
          <span className="font-semibold text-lg">{quantity}</span>
          <Button 
            size={'icon'} 
            variant={'secondary'} 
            className="rounded-xl transition-opacity hover:opacity-70"
            disabled={quantity === 0}
            onClick={() => setQuantity(quantity => quantity > 0 ? quantity - 1 : 0)}>
              <LucideMinus size={24} />
          </Button>
        </div>
      </div>

      <Button 
        size={'lg'} 
        onClick={handleToggleAddToCart}
        className="rounded-xl">
          {items?.find(prod => prod.product === product)?.product?._id ? 'Remove from Cart' : 'Add to Cart'}
      </Button>
      <Button 
        size={'lg'} 
        variant={'default'} 
        className="rounded-xl bg-brand text-white hover:bg-brand transition-opacity hover:opacity-70">Buy Now</Button>
    </div>
  )
}

export default ProductActions