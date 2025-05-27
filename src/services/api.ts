// Simple fetch-based API client
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
};

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const api = {
  async request<T>(endpoint: string, options: RequestOptions): Promise<T> {
    const token = localStorage.getItem('token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config: RequestInit = {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: 'include', // Include cookies in the request
    };
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      
      // Handle unauthorized errors
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new ApiError(401, 'Session expired. Please login again.');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new ApiError(response.status, data.message || 'Something went wrong');
      }
      
      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      console.error('API request failed:', error);
      throw new ApiError(500, 'Network error. Please check your connection.');
    }
  },
  
  // Helper methods for common HTTP methods
  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  },
  
  post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: data });
  },
  
  put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body: data });
  },
  
  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  },
};

export default api;
