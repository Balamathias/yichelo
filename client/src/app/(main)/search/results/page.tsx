import React from 'react'
import SearchProducts from '../components/searched-products'

interface Props {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: any
) {
  const q = (await searchParams)?.q as string

  return {
    title: `Search results for "${q}"`,
    description: `Search results for "${q}"`,
    openGraph: {
      images: [],
    },
  }
}

const Page = ({ searchParams }: Props) => {
  const  q = (searchParams as any)?.q as string

  return (
    <div className="flex flex-col max-w-7xl mx-auto gap-y-5 py-6">
      <div className='flex flex-col gap-y-6 px-2.5 md:px-10'>
        <SearchProducts />
      </div>
    </div>
  )
}

export default Page