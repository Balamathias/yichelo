import { clsx, type ClassValue } from "clsx"
import { Compass, Home, Search, ShoppingBag } from "lucide-react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BRAND_NAME = "Yichelo"

export const formatNigerianCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount)
}

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(amount)
}

export const mobileLinks = [
  {
    label: 'Home',
    Icon: Home,
    href: '/',
  },
  {
    label: 'Products',
    Icon: ShoppingBag,
    href: '/products',
  },
  {
    label: 'Explore',
    Icon: Compass,
    href: '/explore'
  },
  {
    label: 'Cart',
    Icon: Search,
    href: '/search',
    temp_href: '/search',
  },
]

export const addQueryParams = (qs: string, params: Record<string, string | number | undefined>): string => {
  const urlParams = new URLSearchParams(qs);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      urlParams.delete(key);
    } else {
      urlParams.set(key, value.toString());
    }
  });

  return `?${urlParams.toString()}`;
};
