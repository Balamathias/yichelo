'use client';

import React, { use } from 'react';
import { useActionState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { useSearchParams } from 'next/navigation';
import { createProduct } from '@/actions/product.actions';
import { UploadDropzone } from '@/lib/uploadthing';
import Image from 'next/image';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCategory } from '@/@types/product';
import { LucideLoader, LucidePlus, LucideTrash } from 'lucide-react';
import Link from 'next/link';
import { useCreateProduct } from '@/lib/react-query/product.query';
import { toast } from 'sonner';

interface Props {
  getCategories: Promise<ProductCategory[]>;
}

const NewProductForm = ({ getCategories }: Props) => {
  const { mutate: createProductAction, isPending: loading } = useCreateProduct()

  const [images, setImages] = React.useState<string[]>([]);
  const [features, setFeatures] = React.useState<string[]>(['']);
  const [tags, setTags] = React.useState<string[]>(['']);

  const categories = use(getCategories);

  const searchParams = useSearchParams();
  const starter = searchParams.get('starter');

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const handleTagChange = (index: number, value: string) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
  };

  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    e.currentTarget.reset();

    createProductAction({
      category: data.get('category') as string,
      name: data.get('name') as string,
      description: data.get('description') as string,
      price: Number(data.get('price')),
      images,
      stock: Number(data.get('stock')),
      badge: data.get('badge') as string,
      features,
      tags
    }, {
      onSuccess: () => {
        toast.success('Product created successfully');
        setTags([''])
        setFeatures([''])
        setImages([])
      },
      onError: (err) => {
        toast.error('Failed to create product', { description: err?.message });
      }
    });
  };

  return (
    <div className="flex flex-col py-8 gap-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-7">
        <div className="flex flex-col gap-y-4">
          <Label htmlFor="category" className="text-muted-foreground">
            Select Product Category
          </Label>
          <Select name="category">
            <SelectTrigger className="w-full border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none dark:border-secondary">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories?.map((cat) => (
                  <SelectItem key={cat?._id} value={cat?.name}>
                    {cat?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-y-4">
          <Label htmlFor="images" className="text-muted-foreground">
            Choose product images
          </Label>
          {!images?.length && (
            <UploadDropzone
              endpoint="upload-images"
              onClientUploadComplete={(files) => {
                setImages(files.map((file) => file.url));
              }}
              className="w-full h-64 border border-muted rounded-lg flex items-center justify-center"
            />
          )}

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 md:grid-cols-6 lg:grid-cols-8 relative">
              {images.map((image, index) => (
                <div key={index} className="relative group hover:opacity-70 hover:transition-all cursor-pointer">
                  <Image
                    src={image}
                    width={500}
                    height={500}
                    alt="product image"
                    className="w-full h-48 object-contain rounded-lg border border-muted"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-opacity opacity-0 group-hover:opacity-100"
                  >
                    <LucideTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-y-4">
          <Label htmlFor="name" className="text-muted-foreground">
            Product Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            className="border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none dark:border-secondary"
            defaultValue={starter || ''}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <Label htmlFor="description" className="text-muted-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            className="border-b-2 border-secondary p-4 rounded-none min-h-36 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none"
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <Label htmlFor="price" className="text-muted-foreground">
            Price
          </Label>
          <Input
            type="number"
            id="price"
            name="price"
            placeholder="Enter product price"
            className="border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none dark:border-secondary"
            defaultValue="0.00"
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <Label htmlFor="stock" className="text-muted-foreground">
            Total in Stock
          </Label>
          <Input
            type="number"
            id="stock"
            name="stock"
            placeholder="Enter Stock Quantity"
            className="border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none dark:border-secondary"
            defaultValue="1"
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <Label htmlFor="features" className="text-muted-foreground items-center justify-start gap-x-0.5 flex cursor-pointer hover:opacity-75"  onClick={handleAddFeature}>
            <LucidePlus size={24} />
            Add Feature
          </Label>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-x-2">
              <Input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none dark:border-secondary"
              />
              <Button type="button" size={'icon'} variant={'ghost'} onClick={() => handleRemoveFeature(index)}>
                <LucideTrash size={24} />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-y-4">
          <Label htmlFor="badge" className="text-muted-foreground">
            Product badge
          </Label>
          <Select name="badge">
            <SelectTrigger className="w-full border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none dark:border-secondary">
              <SelectValue placeholder="Select Badge" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Badges</SelectLabel>
                {['new', 'hot', 'trending']?.map((badge) => (
                  <SelectItem key={badge} value={badge} className="capitalize">
                    {badge}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-y-4">
          <Label htmlFor="tags" className="text-muted-foreground items-center justify-start gap-x-0.5 flex cursor-pointer hover:opacity-75"  onClick={handleAddTag}>
            <LucidePlus size={24} />
            Add Tag
          </Label>
          {tags.map((tag, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 group relative">
              <Input
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                placeholder={`Tag ${index + 1}`}
                className="border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none dark:border-secondary"
              />
              <Button type="button" size={'icon'} variant={'secondary'} onClick={() => handleRemoveTag(index)} className='absolute top-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100 z-10 bg-rose-500/20'>
                <LucideTrash size={24} className='text-red-600'/>
              </Button>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-between">
          <Button size="lg" variant={'destructive'} className="rounded-xl" type='button' asChild disabled={loading}>
            <Link href='/dashboard'>Cancel</Link>
          </Button>

          <Button size="lg" disabled={loading} className='rounded-xl'>
            { loading && <LucideLoader size={24} className='mr-2 animate-spin' /> }
            {loading ? 'Creating...' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewProductForm;
