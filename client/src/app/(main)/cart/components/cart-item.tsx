'use client'

import { Product } from '@/@types/product'
import { Button } from '@/components/ui/button'
import { useAddToCart, useCart, useRemoveFromCart } from '@/lib/react-query/cart.query'
import { useAuth } from '@/lib/react-query/user.query'
import { useCartStore } from '@/lib/store/cart'
import { formatNigerianCurrency } from '@/lib/utils'
import { LucideLoader, LucideMinus, LucidePlus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props {
  product: Product,
  quantity: number
}

const CartItem = ({ product, quantity: _qty }: Props) => {

  const { mutate: addToCart } = useAddToCart()
  const { mutate: removeFromCart } = useRemoveFromCart()
  const { data: cart, isPending: gettingCart } = useCart()

  const { user } = useAuth()
  
  const localAddToCart = useCartStore((state) => state.add)
  const localRemoveFromCart = useCartStore((state) => state.remove)
  const localItems = useCartStore((state) => state.items)
  const localUpdateQuantity = useCartStore((state) => state.updateQuantity)

  const cartItem = user?._id ? cart?.products?.find((item) => item.product._id === product._id) : localItems.find((item) => item.product._id === product._id)
  const [quantity, setQuantity] = React.useState(cartItem?.quantity || 0)

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
    <div className='flex flex-col sm:flex-row gap-4 p-2.5'>
      <Image
        src={product.images?.[0]}
        alt={product.name}
        width={500}
        height={500}
        className='aspect-square h-32 w-32 object-contain bg-gray-300 dark:bg-secondary rounded-xl'
      />

      <div className='flex flex-col gap-2'>
        <h3 className='text-xl font-semibold'>{product.name}</h3>
        <p className='text-sm text-muted-foreground'>{formatNigerianCurrency(product.price)}</p>
        <div className="flex gap-2 items-center">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-xl transition-opacity hover:opacity-70"
            onClick={incrementQuantity}
          >
            <LucidePlus size={24} />
          </Button>
          {
            gettingCart ? (
              <LucideLoader className='animate-spin' />
            ): (
              <span className="font-semibold text-lg">{quantity}</span>
            )
          }
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
    </div>
  )
}

export default CartItem