import React, { PropsWithChildren } from 'react'
import Navbar from './components/navbar'
import { getUser } from '@/actions/auth.actions'

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getUser()

  return (
    <div>
      <Navbar user={user}/>
      <main className='mt-20 p-4 md:p-10'>
        {children}
      </main>
    </div>
  )
}

export default Layout