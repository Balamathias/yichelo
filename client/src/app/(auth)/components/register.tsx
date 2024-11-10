'use client'

import React from 'react';
import { useActionState } from 'react';
import { register } from '@/actions/auth.actions';

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function Register() {

  const [state, registerAction, loading] = useActionState(register, undefined);

  return (
    <div className="flex flex-col gap-y-4 w-full sm:max-w-[422px] py-8">
      <h2 className='text-3xl font-semibold py-2'>
        Register
      </h2>

      <form  
        action={registerAction}
        className="flex flex-col gap-y-4"
      >
        <Label htmlFor="username">Username</Label>
        <Input
          type="username"
          id="username"
          name='username'
          placeholder='@yourusername'
          className='border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none'
        />
        {
          state?.errors?.fieldErrors?.username && 
          <Label className='text-red-500/70'>
            {state.errors?.fieldErrors?.username}
          </Label>
        }

        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name='email'
          placeholder='example@gmail.com'
          className='border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none'
        />
        {
          state?.errors?.fieldErrors?.email && 
          <Label className='text-red-500/70'>
            {state.errors?.fieldErrors?.email}
          </Label>
        }
        
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name='password'
          placeholder='Password...'
          className='border-b-2 border-secondary p-4 rounded-none h-12 border-t-0 border-x-0 focus:border-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 transition-colors shadow-none'
        />
        {
          state?.errors?.fieldErrors?.password && 
          <Label className='text-red-500/70'>
            {state.errors?.fieldErrors?.password}
          </Label>
        }


        <LoginButton loading={loading} />

        <div className='flex flex-row items-center gap-x-1.5'>
          <Label htmlFor='remember-me'>Already have an account? <Link href={'/login'} className={'underline text-primary font-semibold transition-all'}>Please Log In</Link>.</Label>
        </div>
      </form>
    </div>
  );
}

const LoginButton = ({ loading }: { loading: boolean }) => {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="w-full rounded-lg"
      size={'lg'}
    >
      Register
    </Button>
  );
}
