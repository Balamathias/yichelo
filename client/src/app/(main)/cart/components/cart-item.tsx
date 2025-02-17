'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/@types/product';
import { Button } from '@/components/ui/button';
import { formatNigerianCurrency } from '@/lib/utils';
import { LucideLoader, LucideMinus, LucidePlus } from 'lucide-react';
import useCartActions from '@/hooks/use-cart-actions'

interface Props {
  product: Product;
  quantity: number;
}

const CartItem = ({ product }: Props) => {
  const {
    quantity,
    incrementQuantity,
    decrementQuantity,
    handleAddToCart,
    gettingCart

  } = useCartActions(product)

  return (
    <div className="flex flex-row gap-4 p-2.5">
      <Image
        src={product.images?.[0]}
        alt={product.name}
        width={500}
        height={500}
        className="aspect-square h-32 w-32 object-contain bg-gray-300 dark:bg-secondary rounded-xl"
      />

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{formatNigerianCurrency(product.price)}</p>
        <div className="flex gap-2 items-center">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-xl transition-opacity hover:opacity-70"
            onClick={incrementQuantity}
          >
            <LucidePlus size={24} />
          </Button>
          {gettingCart ? (
            <LucideLoader className="animate-spin" />
          ) : (
            <span className="font-semibold text-lg">{quantity}</span>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="rounded-xl transition-opacity hover:opacity-70"
            disabled={quantity === 0}
            onClick={decrementQuantity}
          >
            <LucideMinus size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
