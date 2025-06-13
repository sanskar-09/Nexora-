import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Add JWT token to requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  },

  loginWithPhone: async (phoneNumber: string) => {
    const response = await axios.post(`${API_URL}/auth/phone-login`, { phoneNumber });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  },

  register: async (userData: any) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  },

  getCurrentUser: async () => {
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data.user;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export const symptomService = {
  checkSymptoms: async (symptoms: any) => {
    return await axios.post(`${API_URL}/symptoms/check`, symptoms);
  },

  getSymptomHistory: async () => {
    return await axios.get(`${API_URL}/symptoms/history`);
  }
};

export const medicationService = {
  addMedication: async (medication: any) => {
    return await axios.post(`${API_URL}/medications`, medication);
  },

  getMedications: async () => {
    return await axios.get(`${API_URL}/medications`);
  },

  updateMedication: async (id: string, medication: any) => {
    return await axios.put(`${API_URL}/medications/${id}`, medication);
  }
};

export const healthDataService = {
  addHealthData: async (data: any) => {
    const config = {
      headers: {
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    };
    return await axios.post(`${API_URL}/health-data`, data, config);
  },

  getHealthData: async () => {
    return await axios.get(`${API_URL}/health-data`);
  }
};
