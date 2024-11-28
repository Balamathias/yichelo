import React, { Suspense } from 'react'
import CartItems from './cart-items'
import { getUser } from '@/actions/auth.actions'
import { getCart } from '@/actions/cart.actions'

const CartDetail = async () => {
  const user = await getUser()
  const cart = await getCart()

  console.log(cart)

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CartItems cart={cart} user={user}/>
      </Suspense>
    </div>
  )
}

export default CartDetail