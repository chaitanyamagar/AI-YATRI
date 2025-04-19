import BaseApiService from './base-api';
import { API_CONFIG } from '@/config/api-config';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/api-types';

class AuthService extends BaseApiService {
  private static instance: AuthService;
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  private userKey = 'user_data';

  private constructor() {
    super(API_CONFIG.BASE_URLS.API, {
      'Content-Type': 'application/json'
    });
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.post<AuthResponse>('/auth/login', credentials);
      this.setAuthData(response);
      return response;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  public async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await this.post<AuthResponse>('/auth/register', credentials);
      this.setAuthData(response);
      return response;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.post('/auth/logout');
      this.clearAuthData();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  }

  public async refreshToken(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await this.post<{ token: string; refreshToken: string }>(
        '/auth/refresh',
        { refreshToken }
      );

      this.setTokens(response.token, response.refreshToken);
    } catch (error) {
      this.clearAuthData();
      throw this.handleAuthError(error);
    }
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  public getUser(): any | null {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  private setAuthData(response: AuthResponse): void {
    this.setTokens(response.token, response.refreshToken);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
  }

  private setTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }

  private handleAuthError(error: any): Error {
    if (error.response?.status === 401) {
      this.clearAuthData();
      return new Error('Authentication failed. Please login again.');
    }
    return new Error(error.response?.data?.message || 'Authentication failed');
  }
}

export const authService = AuthService.getInstance(); 