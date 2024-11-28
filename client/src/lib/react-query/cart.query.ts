import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { addToCart, getCart, removeFromCart, syncCart, updateCart } from '../../actions/cart.actions';
import { toast } from 'sonner';

export enum CART_KEYS {
  CART = 'cart',
  ADD_TO_CART = 'addToCart',
  REMOVE_FROM_CART = 'removeFromCart',
  UPDATE_CART = 'updateCart',
  SYNC_CART = 'syncCart',
}

const queryClient = new QueryClient()

export const useCart = () => useQuery({
  queryKey: [CART_KEYS.CART],
  queryFn: getCart,
})

export const useAddToCart = () => useMutation({
  mutationKey: [CART_KEYS.ADD_TO_CART],
  mutationFn: ({ productId, quantity }: { productId: string, quantity: number }) => addToCart(productId, quantity),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [CART_KEYS.CART] })
  },
  onError: (error) => {
    console.error(error)
    toast.error('Failed to add to cart')
  }
})

export const useRemoveFromCart = () => useMutation({
  mutationKey: [CART_KEYS.REMOVE_FROM_CART],
  mutationFn: (productId: string) => removeFromCart(productId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [CART_KEYS.CART] })
  },
  onError: (error) => {
    console.error(error)
    toast.error('Failed to remove from cart')
  }
})

export const useUpdateCart = () => useMutation({
  mutationKey: [CART_KEYS.UPDATE_CART],
  mutationFn: ({ productId, quantity }: { productId: string, quantity: number }) => updateCart(productId, quantity),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [CART_KEYS.CART] })
  },
  onError: (error) => {
    console.error(error)
    toast.error('Failed to update cart')
  }
})

export const useSyncCart = () => useMutation({
  mutationKey: [CART_KEYS.SYNC_CART],
  mutationFn: (products: { productId: string, quantity: number }[]) => syncCart(products),
})
