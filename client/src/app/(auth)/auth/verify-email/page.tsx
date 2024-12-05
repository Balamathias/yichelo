import React from 'react'
import { Metadata } from 'next'
import VerifyEmail from '../../components/verify-email'
import { getUser } from '@/actions/auth.actions'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Verify your email ~ Sign in to your account',
  description: 'Verify your email ~ Yichelo account',
}

const Page = async () => {
  const user = await getUser()

  if (!user) {
    return redirect('/login?next=/auth/verify-email')
  }

  if (user?.verified) {
    return redirect('/')
  }

  return (
    <div className="w-full min-h-screen p-4 flex flex-col md:flex-row items-center justify-center">
      <div />
      <VerifyEmail user={user}/>
    </div>
  )
}

export default Page