'use client'

import React from "react"
import { Product } from "@/@types/product"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store/cart"

import { LucidePlus, LucideMinus } from 'lucide-react'
import { useAuth } from "@/lib/react-query/user.query"

interface Props {
  product: Product
}

const ProductActions = ({ product }: Props) => {

  const { user } = useAuth()
  
  const addToCart = useCartStore((state) => state.add)
  const removeFromCart = useCartStore((state) => state.remove)
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  const cartItem = items?.find((item) => item.product._id === product._id)
  const [quantity, setQuantity] = React.useState(cartItem?.quantity || 0)

  const handleAddToCart = () => {
    if (quantity === 0) {
      const newQuantity = 1
      setQuantity(newQuantity)
      addToCart({ product, quantity: newQuantity }, user?._id)
    } else {
      setQuantity(0)
      removeFromCart({ product, quantity }, user?._id)
    }
  }

  const incrementQuantity = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    addToCart({ product, quantity: newQuantity }, user?._id)
  }

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
  
      if (newQuantity === 0) {
        removeFromCart({ product, quantity: 1 }, user?._id);
      } else {
        updateQuantity(product._id, newQuantity, user?._id);
      }
    }
  };
  
  

  return (
    <div className="flex flex-col gap-y-3 py-4">
      <div className="flex items-center justify-between gap-x-4">
        <h2 className="text-base font-semibold text-primary">Quantity</h2>

        <div className="flex gap-2">
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
