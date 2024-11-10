import React, { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className='w-full min-h-full relative'>
      <div className='flex flex-col gap-y-5'>
        { children }
      </div>
    </main>
  )
}

export default Layout