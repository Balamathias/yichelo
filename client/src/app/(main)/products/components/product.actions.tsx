'use client'

import React from "react"
import { Product } from "@/@types/product"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store/cart"
import { useAddToCart, useCart, useRemoveFromCart } from '@/lib/react-query/cart.query'

import { LucidePlus, LucideMinus } from 'lucide-react'
import { useAuth } from "@/lib/react-query/user.query"

interface Props {
  product: Product
}

const ProductActions = ({ product }: Props) => {
  
  const { data: cart } = useCart()
  const { mutate: addToCart, isPending: addingToCart } = useAddToCart()
  const { mutate: removeFromCart, isPending: removingFromCart } = useRemoveFromCart()

  const { user } = useAuth()
  
  const localAddToCart = useCartStore((state) => state.add)
  const localRemoveFromCart = useCartStore((state) => state.remove)
  const localItems = useCartStore((state) => state.items)
  const localUpdateQuantity = useCartStore((state) => state.updateQuantity)

  const cartItem = user?._id ? cart?.products?.find((item) => item.product._id === product._id) : localItems.find((item) => item.product._id === product._id)
  const [quantity, setQuantity] = React.useState(cartItem?.quantity || 0)

  const handleAddToCart = () => {
    if (quantity === 0) {
      const newQuantity = 1
      setQuantity(newQuantity)
      if (user?._id) {
        addToCart({ productId: product?._id, quantity: newQuantity })
      } else {
        localAddToCart({ product, quantity: newQuantity })
      }
    } else {
      setQuantity(0)
      if (user?._id) {
        removeFromCart(product?._id)
      } else {
        localRemoveFromCart({ product, quantity }, user?._id)
      }
    }
  }

  const incrementQuantity = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    if (user?._id) {
      addToCart({ productId: product?._id, quantity: newQuantity })
    } else {
      localAddToCart({ product, quantity: newQuantity })
    }
  }

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
  
      if (newQuantity === 0) {
        if (user?._id) {
          removeFromCart(product?._id)
        } else {
          localRemoveFromCart({ product, quantity: 1 }, user?._id)
        }
      } else {
        if (user?._id) {
          addToCart({ productId: product?._id, quantity: newQuantity })
        } else {
          localUpdateQuantity(product._id, newQuantity, user?._id);
        }
      }
    }
  };
  
  

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
