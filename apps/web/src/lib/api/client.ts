/**
 * API Client for API integration
 * Centralized API client with error handling and token management
 */

const API_BASE_URL =
  (typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL) || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    details?: Record<string, any>;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

/**
 * Custom error class for API errors
 */
export class ApiClientError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

/**
 * Get auth token from auth store or localStorage (fallback)
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    // Try to get token from auth store first
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      if (parsed?.state?.token) {
        return parsed.state.token;
      }
    }
  } catch (error) {
    // Fallback to legacy token storage
    console.warn('Failed to get token from auth store:', error);
  }
  
  // Fallback to legacy token storage
  return localStorage.getItem('auth_token');
}

/**
 * Set auth token in localStorage (legacy support)
 * Note: Token should be set via auth store, this is for backward compatibility
 */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  // Store in legacy location for backward compatibility
  localStorage.setItem('auth_token', token);
}

/**
 * Remove auth token from localStorage
 */
export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  // Remove from legacy location
  localStorage.removeItem('auth_token');
  // Also clear auth store
  try {
    localStorage.removeItem('auth-storage');
  } catch (error) {
    console.warn('Failed to clear auth store:', error);
  }
}

/**
 * Handle token expiration - logout and redirect to login
 */
async function handleTokenExpiration() {
  if (typeof window === 'undefined') return;
  
  // Clear token from localStorage (both legacy and store)
  removeAuthToken();
  
  // Clear auth store and redirect
  try {
    // Dynamically import to avoid circular dependency
    const { useAuthStore } = await import('@/src/features/auth/stores/useAuthStore');
    const store = useAuthStore.getState();
    
    // Clear auth state without API call (to avoid infinite loop)
    store.setUser(null);
    store.setToken(null);
    
    // Redirect to login page
    const currentPath = window.location.pathname;
    if (currentPath !== '/login' && !currentPath.startsWith('/login')) {
      // Use window.location.href for full page reload to clear all state
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('Failed to clear auth store:', error);
    // Fallback: just redirect to login
    const currentPath = window.location.pathname;
    if (currentPath !== '/login' && !currentPath.startsWith('/login')) {
      window.location.href = '/login';
    }
  }
}

/**
 * API client with error handling
 */
async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Check if response is ok before parsing
    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const isHtml = contentType.includes('text/html');

    // Handle HTML responses (usually means 404 or wrong endpoint)
    if (isHtml) {
      const text = await response.text();
      throw new ApiClientError(
        `API endpoint not found. Received HTML response (${response.status}). Make sure API server is running at ${API_BASE_URL}`,
        response.status,
        'ENDPOINT_NOT_FOUND'
      );
    }

    // Handle non-JSON responses
    if (!isJson) {
      const text = await response.text();
      if (!response.ok) {
        throw new ApiClientError(
          text || `Request failed with status ${response.status}`,
          response.status
        );
      }
      // If response is ok but not JSON, return empty data
      return {
        success: true,
        data: undefined as T,
      };
    }

    // Parse JSON response
    let data: ApiResponse<T>;
    try {
      const text = await response.text();
      if (!text) {
        // Empty response
        if (!response.ok) {
          throw new ApiClientError(
            `Request failed with status ${response.status}`,
            response.status
          );
        }
        return {
          success: true,
          data: undefined as T,
        };
      }
      data = JSON.parse(text);
    } catch (parseError) {
      // JSON parse error
      throw new ApiClientError(
        'Invalid JSON response from server',
        response.status,
        'PARSE_ERROR'
      );
    }

    if (!response.ok) {
      // Handle 401 Unauthorized - token expired or invalid
      if (response.status === 401) {
        const errorCode = data.error?.code || '';
        const errorMessage = data.message || 'Invalid or expired token';
        
        // Check if it's a token-related error
        if (
          errorCode === 'UNAUTHORIZED' ||
          errorCode === 'INVALID_TOKEN' ||
          errorCode === 'TOKEN_EXPIRED' ||
          errorMessage.toLowerCase().includes('token') ||
          errorMessage.toLowerCase().includes('unauthorized') ||
          errorMessage.toLowerCase().includes('expired')
        ) {
          // Handle token expiration asynchronously
          handleTokenExpiration().catch(console.error);
        }
      }
      
      throw new ApiClientError(
        data.message || 'Request failed',
        response.status,
        data.error?.code,
        data.error?.details
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    // Network error or other issues
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Network error. Make sure API server is running.';

    // Check if it's a fetch error (network issue)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiClientError(
        `Failed to connect to API server at ${API_BASE_URL}. Make sure the API server is running.`,
        0,
        'NETWORK_ERROR'
      );
    }

    throw new ApiClientError(errorMessage, 0, 'UNKNOWN_ERROR');
  }
}

/**
 * GET request
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await apiClient<T>(endpoint, { method: 'GET' });
  if (response.data === undefined) {
    throw new ApiClientError('No data in response', 200);
  }
  return response.data;
}

/**
 * POST request
 */
export async function apiPost<T>(
  endpoint: string,
  body?: unknown
): Promise<T> {
  const response = await apiClient<T>(endpoint, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
  if (response.data === undefined) {
    throw new ApiClientError('No data in response', 200);
  }
  return response.data;
}

/**
 * PATCH request
 */
export async function apiPatch<T>(
  endpoint: string,
  body?: unknown
): Promise<T> {
  const response = await apiClient<T>(endpoint, {
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  });
  if (response.data === undefined) {
    throw new ApiClientError('No data in response', 200);
  }
  return response.data;
}

/**
 * Upload file request
 */
export async function apiUploadFile<T>(
  endpoint: string,
  file: File,
  fieldName: string = 'image'
): Promise<T> {
  const formData = new FormData();
  formData.append(fieldName, file);

  const token = getAuthToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'Upload failed';
    let errorCode: string | undefined;

    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
        errorCode = data.error?.code;
      } else {
        const text = await response.text();
        if (text) {
          errorMessage = text;
        }
      }
    } catch {
      // Ignore parsing errors
    }

    throw new ApiClientError(errorMessage, response.status, errorCode);
  }

  const data = await response.json();
  if (data.data === undefined) {
    throw new ApiClientError('No data in response', 200);
  }
  return data.data;
}

/**
 * DELETE request
 */
export async function apiDelete<T>(endpoint: string): Promise<void> {
  await apiClient<T>(endpoint, { method: 'DELETE' });
}

/**
 * GET request with pagination
 */
export async function apiGetPaginated<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>
): Promise<{ data: T[]; meta: ApiResponse['meta'] }> {
  // Filter out undefined, null, and empty string values
  const filteredParams = params
    ? Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    : {};
  
  const queryString = Object.keys(filteredParams).length > 0
    ? '?' + new URLSearchParams(filteredParams).toString()
    : '';
  const response = await apiClient<T[]>(`${endpoint}${queryString}`);
  
  if (response.data === undefined) {
    throw new ApiClientError('No data in response', 200);
  }
  
  return {
    data: response.data || [],
    meta: response.meta,
  };
}

