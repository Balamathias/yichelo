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

export async function login(initialState: any, data: FormData) {
  const email = data.get('email') as string;
  const password = data.get('password') as string;

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

      redirectUrl = '/'
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

export const getUser = async (): Promise<User | null> => {
  try {
    const accessToken = (await cookies()).get('accessToken')?.value;

    if (!accessToken) {
      console.error('No access token found, unauthorized.');
      return null;
    }

    const response = await api.get<User>('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Get user failed with response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Get user failed - no response received:', error.request);
    } else {
      console.error('Get user failed with error:', error.message);
    }

    return null;
  }
};


// export const login = async (email: string, password: string) => {
//   try {
//     const res = await api.post('/auth/login', { email, password })
//     return res.data
//   } catch (error: any) {
//     console.error('Login failed:', error)
//     return error?.response?.data
//   }
// }

export const logout = async () => {
  try {
    const res = await api.post('/auth/logout')
    return res.data
  } catch (error: any) {
    console.error('Logout failed:', error)
    return error?.response?.data
  }
}

export const register = async (email: string, password: string) => {
  try {
    const res = await api.post('/auth/register', { email, password })
    return res.data
  } catch (error: any) {
    console.error('Register failed:', error)
    return error?.response?.data
  }
}