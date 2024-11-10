import React from 'react'
import Register from '../components/register'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register ~ Create an account',
  description: 'Create a new account',
}

const Page = () => {
  return (
    <div className="w-full min-h-screen p-4 flex flex-col md:flex-row items-center justify-center">
      <div />
      <Register />
    </div>
  )
}

export default Page