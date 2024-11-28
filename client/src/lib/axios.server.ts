'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();

    const token = cookieStore.get('accessToken')?.value;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Prevent infinite retry loop
      originalRequest._retry = true;

      const cookieStore = await cookies();
      const refreshToken = cookieStore.get('refreshToken')?.value;

      if (!refreshToken) {
        // TODO: No refresh token, handle error (e.g., redirect to login)
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        const newToken = response.data.accessToken;

        const res = NextResponse.next();
        res.cookies.set('accessToken', newToken, { httpOnly: true, secure: true }); 
        // Set new token as a cookie

        // Retry original request with new access token
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh token failed, clear tokens from cookies
        const res = NextResponse.next();
        res.cookies.delete('accessToken');
        res.cookies.delete('refreshToken');
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;