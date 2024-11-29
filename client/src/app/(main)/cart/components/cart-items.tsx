'use client'

import { Cart } from '@/@types/cart'
import { User } from '@/@types/user'
import React from 'react'
import CartItem from './cart-item'
import { formatNigerianCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart'
import { LucideShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/lib/react-query/cart.query'

interface Props {
  user: User | null,
  cart: Cart | null
}

const CartItems = ({ cart: _cart, user }: Props) => {
  const localCarts = useCartStore(state => state.items)
  const { data: cart } = useCart()

  const items = user?._id ? cart?.products : localCarts

  const totalPrice = user?._id ? cart?.totalPrice || 0 : localCarts.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0

  if (items?.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-96'>
        <LucideShoppingBasket size={100} />
        <h2 className='text-2xl text-muted-foreground font-semibold'>Your cart is empty, <Link href={'/'} className='opacity-80 hover:opacity-90'>Start Shopping</Link>.</h2>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 gap-y-8 md:flex-row w-full'>
      <div className='flex flex-col gap-y-4 md:basis-2/3 w-full flex-1'>
        {items?.map((item) => (
          <CartItem key={item.product?._id} product={item.product} quantity={item.quantity}/>
        ))}
      </div>

      <div className='flex flex-col gap-y-4 p-4 md:p-6 rounded-xl border w-full justify-between flex-1 md:min-w-[400px]'>
        <div className='flex flex-col gap-y-2.5'>
          <h2 className='text-2xl font-semibold'>Order Summary</h2>

          <div className='flex flex-col gap-y-2'>
            <span>Subtotal:</span>
            <span className='text-2xl font-semibold'>{formatNigerianCurrency(totalPrice)}</span>
          </div>

          <div className=' justify-between hidden'>
            <span>Shipping</span>
            <span></span>
          </div>
        </div>

        <Button size={'lg'} className='rounded-xl'>Checkout</Button>
      </div>
    </div>
  )
}

export default CartItems