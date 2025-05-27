// Simple fetch-based API client
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

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
      console.log(`Making request to: ${API_URL}${endpoint}`);
      const response = await fetch(`${API_URL}${endpoint}`, config);
      
      // Handle unauthorized errors
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new ApiError(401, 'Session expired. Please login again.');
      }
      
      // Try to parse the response as JSON
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        throw new ApiError(response.status || 500, 'Invalid server response format');
      }
      
      if (!response.ok) {
        console.error('Server returned error:', data);
        throw new ApiError(response.status, data.message || 'Something went wrong');
      }
      
      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // More detailed error logging
      console.error('API request failed:', error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('Network error details:', error);
        throw new ApiError(500, 'Network error: Unable to connect to the server. Please check if the server is running.');
      }
      
      throw new ApiError(500, 'Network error. Please check your connection.');
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
