import React from 'react'
import { useCart } from '@/lib/react-query/cart.query'
import { useAddToCart, useRemoveFromCart } from '@/lib/react-query/cart.query'
import { useAuth } from '@/lib/react-query/user.query'
import { useCartStore } from '@/lib/store/cart'
import { Product } from '@/@types/product'


export default function useCartActions(product: Product) {
  const { data: cart, isPending: gettingCart } = useCart()
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

  return {
    quantity,
    setQuantity,
    handleAddToCart,
    incrementQuantity,
    decrementQuantity,
    addingToCart,
    removingFromCart,
    gettingCart
  }
}