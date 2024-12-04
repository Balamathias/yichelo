'use server'

import { User } from "@/@types/user"
import api from "@/lib/axios.server"

import { z } from 'zod';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { cookies } from "next/headers";
import { AuthRespose } from "@/@types/responses";

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  username: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{3,20}$/, {
      message: 'Username must be 3-20 characters long and contain only letters, numbers, underscores, or hyphens',
    }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export async function login(_initialState: any, data: FormData) {
  const email = data.get('email') as string;
  const password = data.get('password') as string;
  const rememberMe = data.get('remember-me')

  const next = data.get('next') as string

  const cookie = await cookies()

  let redirectUrl: string | null = null;

  const validationResult = loginSchema.safeParse({ email, password });
  
  if (!validationResult.success) {
    return { success: false, errors: validationResult.error.flatten() };
  }
  
  try {
    const { status, data } = await axios.post<AuthRespose>(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, 
      { email, password },
      { withCredentials: true }
    );

    if (status === 200) {
      cookie.set('accessToken', data?.data?.accessToken as string)
      cookie.set('refreshToken', data?.data?.refreshToken as string)

      if (next) {
        redirectUrl = next
      } else {
        redirectUrl = '/'
      }
    }
  } catch (error: any) {
    console.error('Login failed:', error);
    return { 
        success: false, 
        errors: {
          fieldErrors: {
            email: error?.response?.data?.message as string,
            password: error?.response?.data?.message as string
          }
      } 
    };
    } finally {
      if (redirectUrl) {
        redirect(redirectUrl);
    }
  }
}

export async function register(_initialState: any, data: FormData) {
  const email = data.get('email') as string;
  const password = data.get('password') as string;
  const username = data.get('username') as string

  const cookie = await cookies()

  let redirectUrl: string | null = null;

  const validationResult = registerSchema.safeParse({ email, password, username });
  
  if (!validationResult.success) {
    return { success: false, errors: validationResult.error.flatten() };
  }
  
  try {
    const { status, data } = await axios.post<AuthRespose>(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, 
      { email, password },
      { withCredentials: true }
    );

    if (status === 200) {
      cookie.set('accessToken', data?.data?.accessToken as string)
      cookie.set('refreshToken', data?.data?.refreshToken as string)

      // const response = await sendVerificationOtp()

      // if (response) {
      //   redirectUrl = '/auth/verify-email'
      // } else {
        redirectUrl = '/'
      // }
    }
  } catch (error: any) {
    console.error('Login failed:', error);
    return { 
        success: false, 
        errors: {
          fieldErrors: {
            email: error?.response?.data?.message as string,
            password: error?.response?.data?.error?.password?.message as string,
            username: error?.response?.data?.error?.username?.message as string
          }
      } 
    };
    } finally {
      if (redirectUrl) {
        redirect(redirectUrl);
    }
  }
}

export const getUser = async (): Promise<User | null> => {
  try {
    const accessToken = (await cookies()).get('accessToken')?.value;

    if (!accessToken) {
      console.warn('No access token found, unauthorized.');
      return null;
    }

    const response = await api.get<{data: User | null}>('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response?.data?.data ?? null;
  } catch (error: any) {
    if (error.response) {
      console.warn('Get user failed with response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.warn('Get user failed - no response received:', error.request);
    } else {
      console.warn('Get user failed with error:', error.message);
    }

    return null;
  }
};

export const logout = async () => {
  const cookie = await cookies()
  try {
    const res = await api.post('/auth/logout')
    cookie.delete('accessToken')
    cookie.delete('refreshToken')
    return res.data
  } catch (error: any) {
    console.error('Logout failed:', error)
    return error?.response?.data
  }
}

export const sendVerificationOtp = async () => {
  try {
    const res = await api.post('/auth/send-verification-otp')
    return res.data
  } catch (error: any) {
    console.error('Send verification OTP failed:', error)
    return error?.response?.data
  }
}

export const verifyEmail = async (otp: string) => {
  try {
    const res = await api.post('/auth/verify-email', { otp })
    return res.data
  } catch (error: any) {
    console.error('Verify email failed:', error)
    return error?.response?.data
  }
}

export const sendResetPassword = async (email: string) => {
  try {
    const res = await api.post('/auth/send-reset-otp', { email })
    return res.data
  } catch (error: any) {
    console.error('Send reset password OTP failed:', error)
    return error?.response?.data
  }
}

export const resetPassword = async (otp: string, password: string) => {
  try {
    const res = await api.post('/auth/reset-password', { otp, password })
    return res.data
  } catch (error: any) {
    console.error('Reset password failed:', error)
    return error?.response?.data
  }
}