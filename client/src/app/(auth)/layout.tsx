import React, { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className='w-full min-h-screen'>
      { children }
    </main>
  )
}

export default Layout