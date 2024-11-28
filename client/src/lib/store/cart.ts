import { create } from 'zustand';
import { Product } from '@/@types/product.d';
import { removeFromCart, syncCart } from '@/actions/cart.actions';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  add: (item: CartItem, userId?: string) => void;
  remove: (item: CartItem, userId?: string) => void;
  updateQuantity: (productId: string, quantity: number, userId?: string) => void;
  syncWithServer: (userId: string) => Promise<void>;
}

const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const syncCartWithServer = async (items: CartItem[], userId: string) => {
  if (!userId) return;
  await syncCart(items.map(item => ({ productId: item.product._id, quantity: item.quantity })));
};

export const useCartStore = create<CartStore>((set) => ({
  items: loadCartFromLocalStorage(),
  add: (item, userId) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex((i) => i.product._id === item.product._id);
      let updatedItems;
  
      if (existingItemIndex > -1) {
        updatedItems = state.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedItems = [...state.items, { ...item, quantity: 1 }];
      }
  
      saveCartToLocalStorage(updatedItems);
  
      if (userId) {
        syncCartWithServer(updatedItems, userId);
      }
  
      return { items: updatedItems };
    });
  },  
  remove: (item, userId) => {
    set((state) => {
      const updatedItems = state.items.filter((i) => i.product._id !== item.product._id);
      saveCartToLocalStorage(updatedItems);

      if (userId) {
        // syncCartWithServer(updatedItems, userId);
        removeFromCart(item.product._id);
      }


      return { items: updatedItems };
    });
  },
  updateQuantity: (productId: string, quantity: number, userId?: string) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      );
      saveCartToLocalStorage(updatedItems);

      if (userId) {
        syncCartWithServer(updatedItems, userId);
      }

      return { items: updatedItems };
    });
  },
  syncWithServer: async (userId) => {
    if (!userId) return;
    const items = loadCartFromLocalStorage();
    await syncCartWithServer(items, userId);
  },
}));
