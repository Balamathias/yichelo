import { Product } from "./product"

export interface Cart {
  _id: string
  user: string
  products: CartItem[],
  totalPrice: number
}

export interface CartItem {
  product: Product
  quantity: number
}