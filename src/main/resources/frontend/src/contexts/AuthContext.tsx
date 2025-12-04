import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api, { authApi, LoginRequest } from '@/services/api';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  nome: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = React.useCallback(() => {
    setUser(null);
    localStorage.removeItem('adoteai_user');
    localStorage.removeItem('adoteai_token');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {

    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('adoteai_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {

        if (error.response