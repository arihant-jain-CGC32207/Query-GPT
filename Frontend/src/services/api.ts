import axios from 'axios';
import { UserPrompt, ApiResponse } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

export const queryGPTAPI = {
  processPrompt: async (prompt: string): Promise<ApiResponse> => {
    const payload: UserPrompt = { prompt };
    const response = await api.post<ApiResponse>('/process-prompt/', payload);
    return response.data;
  },
};

export default api;