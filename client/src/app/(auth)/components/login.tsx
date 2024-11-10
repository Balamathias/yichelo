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
        />
        {
          state?.errors?.fieldErrors?.email && 
          <Label>
            {state.errors?.fieldErrors?.email}
          </Label>
        }
        
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name='password'
        />
        {
          state?.errors?.fieldErrors?.password && 
          <Label>
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
