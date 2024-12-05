import React from 'react'
import { Metadata } from 'next'
import ResetPassword from '../../components/reset-password'

export const metadata: Metadata = {
  title: 'Reset your password ~ Sign in to your account',
  description: 'Reset your password ~ Yichelo account',
}

const Page = () => {
  return (
    <div className="w-full min-h-screen p-4 flex flex-col md:flex-row items-center justify-center">
      <div />
      <ResetPassword />
    </div>
  )
}

export default Page