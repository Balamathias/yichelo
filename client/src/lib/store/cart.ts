import { create } from 'zustand';
import { Product } from '@/@types/product.d'

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (item: CartItem) => void;
}

const loadCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
}

const saveCartToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
}

export const useCartStore = create<CartStore>((set) => ({
  items: loadCartFromLocalStorage(),
  add: (item) => set((state) => {
    const updatedItems = [...state.items, item];
    saveCartToLocalStorage(updatedItems);
    return { items: updatedItems };
  }),
  remove: (item) => set((state) => {
    const updatedItems = state.items.filter((i) => i.product._id !== item.product._id);
    saveCartToLocalStorage(updatedItems);
    return { items: updatedItems };
  }),
}));