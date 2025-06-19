import { serverInstance } from './instances/serverInstance';

export interface AuthResponse {
  user: { login: string };
  token: string;
}

export const authApi = {
  register: async (login: string, password: string): Promise<AuthResponse> => {
    const response = await serverInstance.post<AuthResponse>('/api/user', {
      login,
      password,
    });
    return response.data;
  },
}; 