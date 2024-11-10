import React from 'react'
import Login from '../components/login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login ~ Sign in to your account',
  description: 'Sign in to your account',
}

const Page = () => {
  return (
    <div className="w-full min-h-screen p-4 flex flex-col md:flex-row items-center justify-center">
      <div />
      <Login />
    </div>
  )
}

export default Page