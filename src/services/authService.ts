import api from './api';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'patient' | 'doctor' | 'admin';
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  token?: string;
}

// Auth services
const authService = {
  // Register a new user
  register: async (userData: RegisterData): Promise<User> => {
    try {
      const response = await api.post<User>('/auth/register', userData);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
      }
      
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  
  // Login user
  login: async (credentials: LoginCredentials): Promise<User> => {
    try {
      const response = await api.post<User>('/auth/login', credentials);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  // Logout user
  logout: (): void => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
  
  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },
  
  // Get current user profile from API
  getUserProfile: async (): Promise<User> => {
    try {
      return await api.get<User>('/auth/me');
    } catch (error) {
      console.error('Failed to get user profile:', error);
      throw error;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      return !!(token && user);
    } catch (error) {
      console.error('Failed to check authentication:', error);
      return false;
    }
  },
  
  // Forgot password
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    try {
      return await api.post<{ message: string }>('/auth/forgot-password', { email });
    } catch (error) {
      console.error('Failed to process forgot password:', error);
      throw error;
    }
  },
  
  // Reset password
  resetPassword: async (resetToken: string, password: string): Promise<{ message: string }> => {
    try {
      return await api.post<{ message: string }>(`/auth/reset-password/${resetToken}`, { password });
    } catch (error) {
      console.error('Failed to reset password:', error);
      throw error;
    }
  }
};

export default authService;
