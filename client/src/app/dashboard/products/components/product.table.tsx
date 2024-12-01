'use client'

import React, { use, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatNigerianCurrency } from "@/lib/utils";
import Image from "next/image";
import { PaginatedProducts } from "@/@types/product";
import Pagination from '../../components/pagination.server';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { LucideTrash, LucideEdit, LucideEye } from 'lucide-react';
import Link from 'next/link';
import DynamicModal from '@/components/dynamic-modal';
import { useDeleteProduct } from '@/lib/react-query/product.query';
import { DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ProductTableProps {
  promisedProducts: Promise<PaginatedProducts>;
}

const ProductTable = ({ promisedProducts }: ProductTableProps) => {
  const products = use(promisedProducts)
  const currentPage = products?.pagination?.currentPage || 1
  const totalPages = products?.pagination?.totalPages || 1
  const itemsPerPage = products?.pagination?.itemsPerPage || 10

  const { mutate: deleteProduct, isPending: deleting } = useDeleteProduct()
  const router = useRouter()

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  return (
    <div>
      <Table>
        <TableCaption>Manage products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">S/N</TableHead>
            <TableHead className="">Product</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="">Image</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.products?.map((product, index) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">{(index + 1) + (currentPage - 1) * itemsPerPage}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product?.stock}</TableCell>
              <TableCell>{formatNigerianCurrency(product?.price)}</TableCell>
              <TableCell className="">
                <Image
                  src={product?.images[0]}
                  alt={product?.name}
                  width={50}
                  height={50}
                  className="rounded-xl object-fit bg-secondary h-16 w-16 object-contain"
                />
              </TableCell>

              <TableCell className="flex items-center flex-row-reverse gap-0.5">
                <DynamicModal
                  trigger={
                    <Button variant={'ghost'} size={'icon'} className='rounded-xl'>
                      <LucideTrash className="text-red-500"/>
                    </Button>
                  }
                >
                  <div className='flex flex-col gap-y-2'>
                    <h2 className='text-lg font-semibold text-muted-foreground'>
                      Are you sure you want to delete &quot;{product?.name}&quot;? This cannot be undone.
                    </h2>

                    <div className='flex w-full items-center gap-4 justify-end'>
                      <DialogClose asChild>
                        <Button className='rounded-xl'>
                          No
                        </Button>
                      </DialogClose>
                      <Button variant={'destructive'} className='rounded-xl' disabled={deleting}
                        onClick={() => {
                          deleteProduct(product?._id, {
                            onSuccess: () => {
                              toast.success('Product deleted successfully.')
                              router.refresh()
                              setOpenDeleteModal(false)
                            },
                            onError: err => {
                              toast.error("Failed to delete product.", {
                                description: err?.message
                              })
                            }
                          })
                        }}
                      >
                        {deleting ? 'Deleting...' : 'Yes'}
                      </Button>
                    </div>
                  </div>
                </DynamicModal>
                <Button variant={'ghost'} size={'icon'} className='rounded-xl' asChild>
                  <Link href={`/dashboard/products/${product._id}/edit`}>
                    <LucideEdit />
                  </Link>
                </Button>
                <Button variant={'ghost'} size={'icon'} className='rounded-xl' asChild>
                  <Link href={`/products/${product._id}`}>
                    <LucideEye />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-right">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export const ProductTableSkeleton = () => {
  return (
    <div>
      <Table>
        <TableCaption>Manage products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">S/N</TableHead>
            <TableHead className="">Product</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="">Image</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 20 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{(index + 1)}</TableCell>
              <TableCell className="font-medium">
                <Skeleton className="w-32 h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-16 h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-16 h-6" />
              </TableCell>
              <TableCell className="">
                <Skeleton className="w-10 h-10 rounded-xl" />
              </TableCell>
              <TableCell className="flex items-center gap-0.5">
                <Skeleton className="w-6 h-6 rounded-xl" />
                <Skeleton className="w-6 h-6 rounded-xl" />
                <Skeleton className="w-6 h-6 rounded-xl" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductTable;