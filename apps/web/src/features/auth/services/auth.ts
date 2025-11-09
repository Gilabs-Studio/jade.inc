/**
 * Auth service - handles authentication API calls
 */

import { apiPost, setAuthToken, removeAuthToken } from '@/src/lib/api/client';
import type { LoginInput, RegisterInput, AuthResponse } from '../types';

const API_PREFIX = '/api/v1/auth';

export class AuthService {
  /**
   * Login user
   */
  static async login(input: LoginInput): Promise<AuthResponse> {
    const response = await apiPost<AuthResponse>(`${API_PREFIX}/login`, input);
    setAuthToken(response.accessToken);
    return response;
  }

  /**
   * Register new user
   */
  static async register(input: RegisterInput): Promise<AuthResponse> {
    const response = await apiPost<AuthResponse>(`${API_PREFIX}/register`, input);
    setAuthToken(response.accessToken);
    return response;
  }

  /**
   * Refresh access token
   */
  static async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    return apiPost<{ accessToken: string; refreshToken: string }>(`${API_PREFIX}/refresh`, { refreshToken });
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      await apiPost(`${API_PREFIX}/logout`);
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      removeAuthToken();
    }
  }
}

