export interface Cart {
  _id: string
  user: string
  products: CartItem[],
  totalPrice: number
}

export interface CartItem {
  product: string
  quantity: number
}