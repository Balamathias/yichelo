'use client'

import React from 'react';
import { useActionState } from 'react';
import { login } from '@/actions/auth.actions';

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';

export default function Login() {

  const [state, loginAction, loading] = useActionState(login, undefined);

  return (
    <div className="flex flex-col gap-y-4">
      <form  
        action={loginAction}
        className="flex flex-col gap-y-4"
      >
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name='email'
          className='border-none border-b-2 border-muted-foreground p-4 rounded-none h-12'
        />
        {
          state?.errors?.fieldErrors?.email && 
          <Label className='text-rose-700/70'>
            {state.errors?.fieldErrors?.email}
          </Label>
        }
        
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name='password'
          className='border-none border-b-2 border-muted-foreground p-4 rounded-none h-12'
        />
        {
          state?.errors?.fieldErrors?.password && 
          <Label className='text-rose-700/70'>
            {state.errors?.fieldErrors?.password}
          </Label>
        }

        <LoginButton loading={loading} />

      </form>
    </div>
  );
}

const LoginButton = ({ loading }: { loading: boolean }) => {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="w-full rounded-full"
      size={'lg'}
    >
      Login
    </Button>
  );
}
