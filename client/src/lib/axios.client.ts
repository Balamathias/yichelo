import axios from 'axios';
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000',
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const { accessToken } = parseCookies();

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post('/auth/refresh', {}, { withCredentials: true });

        const { accessToken } = parseCookies();
        
        document.cookie = `accessToken=${accessToken}; path=/; ${process.env.NODE_ENV === 'production' ? 'Secure; SameSite=None; HttpOnly' : ''}`;

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
