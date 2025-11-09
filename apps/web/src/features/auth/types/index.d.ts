/**
 * Auth feature types
 */

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'editor' | 'author' | 'viewer';
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

