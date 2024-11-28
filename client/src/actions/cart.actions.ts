'use server'

import { Cart } from "@/@types/cart";
import api from "@/lib/axios.server";

export const getCart = async () => {
  try {
    return (await api.get<Cart>("/cart")).data;
  } catch (error) {
    console.warn("Get cart failed:", error);
    return null;
  }
};

export const addToCart = async (productId: string, quantity=1) => {
  return (await api.post<Cart>("/cart", { productId , quantity})).data;
};

export const removeFromCart = async (productId: string) => {
  return (await api.delete<Cart>(`/cart/${productId}`)).data;
};

export const updateCart = async (productId: string, quantity: number) => {
  return (await api.put<Cart>(`/cart/${productId}`, { quantity })).data;
};

export const clearCart = async () => {
  return (await api.delete<Cart>("/cart")).data;
};

export const syncCart = async (products: { productId: string, quantity: number }[]) => {
  return (await api.post<Cart>("/cart/sync", { products })).data;
};