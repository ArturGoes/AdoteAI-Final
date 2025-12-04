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

        if (error.response && error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    const storedUser = localStorage.getItem('adoteai_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {

        logout();
      }
    }
    setIsLoading(false);

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  const login = async (credentials: LoginRequest): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authApi.login(credentials);
      
      if (response.success && response.user && response.token) {
        const userData: User = response.user;
        setUser(userData);
        localStorage.setItem('adoteai_user', JSON.stringify(userData));
        localStorage.setItem('adoteai_token', response.token);
        return { success: true };
      }
      
      return { success: false, message: response.message || 'Erro ao fazer login' };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao conectar com o servidor';
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};