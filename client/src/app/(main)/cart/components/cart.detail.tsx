import React, { Suspense } from 'react'
import CartItems from './cart-items'
import { getUser } from '@/actions/auth.actions'
import { getCart } from '@/actions/cart.actions'

const CartDetail = async () => {
  const user = await getUser()
  const cart = await getCart()

  return (
    <div>
      <CartItems cart={cart} user={user}/>
    </div>
  )
}

export default CartDetail