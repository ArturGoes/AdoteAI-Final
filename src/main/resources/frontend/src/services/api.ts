import axios from 'axios';

const api = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipos
export interface Animal {
  id: number;
  nome: string;
  raca: string;
  idade: number;
  porte?: string;
  tamanho: string;
  localizacao: string;
  historia?: string;
  temperamento: string;
  larIdeal?: string;
  imagemUrl?: string;
  fotos: string[];
  disponivel?: boolean;
  status: string;
  vacinasTomadas: string[];
  vacinasPendentes: string[];
}

export interface MatchRequest {
  espacoEmCasa: number;
  tempoDisponivel: number;
  preferenciaTemperamento: number;
}

export interface MatchResponse {
  success: boolean;
  animal?: Animal;
  matchScore?: number;
  iaReasoning?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
  espacoEmCasa: number;
  tempoDisponivel: number;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: any;
}

// APIs
export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
};

export const matchApi = {
  findMatch: async (data: MatchRequest): Promise<MatchResponse> => {
    const response = await api.post<MatchResponse>('/match', data);
    return response.data;
  },
};

export const animalApi = {
  getAll: () => api.get<Animal[]>('/animais'),
  getById: (id: number) => api.get<Animal>(`/animais/${id}`),
};

export default api;