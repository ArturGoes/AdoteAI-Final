import axios from 'axios';

const API_BASE_URL = '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Animal {
  id: number;
  raca: string;
  idade: number;
  sexo: string;
  tamanho: string;
  temperamento: string;
  cor: string;
  vacinasTomadas: string[];
  vacinasPendentes: string[];
  fotos: string[];
  dataEntrada: string;
  dataSaida?: string;
  status: string;
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
  message?: string;
}

export const animalApi = {
  getAll: () => api.get<Animal[]>('/api/animais'),
  getById: (id: number) => api.get<Animal>(`/api/animais/${id}`),
  create: (animal: Omit<Animal, 'id'>) => api.post<Animal>('/api/animais', animal),
};

export const matchApi = {
  findMatch: (preferences: MatchRequest) => api.post<MatchResponse>('/api/match', preferences),
};

export default api;
