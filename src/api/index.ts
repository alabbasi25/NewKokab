import axios from 'axios';
import { KokabState, UserID } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const kokabApi = {
  getHealth: () => api.get('/health'),
  
  getState: () => api.get<Partial<KokabState>>('/state'),
  
  updateState: (state: Partial<KokabState>) => api.post<KokabState>('/state', state),
  
  syncFitness: () => api.get('/fitness/sync'),
  
  getAuthUrl: () => api.get<{ url: string }>('/auth/google/url'),
};

export default api;
