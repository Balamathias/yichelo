const Page = async ({ searchParams }: { searchParams: { [key: string]: string} }) => {
  return (
    <div className='mx-auto w-full max-w-7xl p-4 md:p-10 md:px-12'>
      <div className='flex items-center justify-between w-full flex-1'>
        <h1 className='text-xl hidden md:block font-bold'>Products</h1>
        
      </div>
    </div>
  )
}

export default Page