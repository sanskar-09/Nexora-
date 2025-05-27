// Simple fetch-based API client
const API_URL = 'http://localhost:5000/api';

type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
};

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
    };
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      
      // Handle unauthorized errors
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
        throw new Error('Unauthorized');
      }
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },
  
  // Helper methods for common HTTP methods
  get(endpoint: string): Promise<any> {
    return this.request(endpoint, { method: 'GET' });
  },
  
  post(endpoint: string, data: any): Promise<any> {
    return this.request(endpoint, { method: 'POST', body: data });
  },
  
  put(endpoint: string, data: any): Promise<any> {
    return this.request(endpoint, { method: 'PUT', body: data });
  },
  
  delete(endpoint: string): Promise<any> {
    return this.request(endpoint, { method: 'DELETE' });
  },
};

export default api;
