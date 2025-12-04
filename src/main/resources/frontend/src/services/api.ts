import axios from 'axios';

const api = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adoteai_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ==================================
// INTERFACES DE TIPO (TYPESCRIPT)
// ==================================

export interface Abrigo {
  id: number;
  nome: string;
  endereco: string;
  email: string;
  telefone: string;
}

export interface Animal {
  id: number;
  nome: string;
  raca: string;
  idade: number;
  tamanho: string;
  localizacao: string;
  historia?: string;
  temperamento: string;
  fotos: string[];
  status: string;
  vacinasTomadas: string[];
  vacinasPendentes: string[];
  abrigo?: Abrigo; // Adicionada a relação com o abrigo
}

export interface MatchRequest {
  espacoEmCasa: number;
  tempoDisponivel: number;
  preferenciaTemperamento: number;
}

export interface MatchResponse {
  success: boolean;
  animais?: Animal[];
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
  token?: string;
}

// ==================================
// CHAMADAS DE API
// ==================================

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

export const adocaoApi = {
  solicitar: (animalId: number, adotanteId: number) => 
    api.post('/adocao', { animalId, adotanteId }),
};

export default api;