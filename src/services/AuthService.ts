// services/api/authService.ts
import axios from 'axios';
import { LoginCredentials, LoginResponse, User } from '../types/auth.types';


const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export const validateToken = async (token: string): Promise<User> => {
  try {
    const response = await api.get<User>('/user/validate', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Token validation failed');
  }
};

// Add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;