import api from './api';

// Types
export interface HealthData {
  _id?: string;
  type: 'blood_pressure' | 'heart_rate' | 'blood_glucose' | 'weight' | 'temperature' | 'oxygen_saturation' | 'sleep' | 'exercise' | 'other';
  value: any;
  unit?: string;
  timestamp?: Date | string;
  notes?: string;
  source?: 'manual' | 'device' | 'app';
  metadata?: any;
}

export interface HealthDataPagination {
  data: HealthData[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

// Health data services
const healthDataService = {
  // Get all health data
  getHealthData: async (page = 1, limit = 100): Promise<HealthDataPagination> => {
    const response = await api.get(`/health-data?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  // Get health data by ID
  getHealthDataById: async (id: string): Promise<HealthData> => {
    const response = await api.get(`/health-data/${id}`);
    return response.data;
  },
  
  // Get health data by type
  getHealthDataByType: async (
    type: HealthData['type'], 
    page = 1, 
    limit = 100, 
    startDate?: string, 
    endDate?: string
  ): Promise<HealthDataPagination> => {
    let url = `/health-data/type/${type}?page=${page}&limit=${limit}`;
    
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    
    const response = await api.get(url);
    return response.data;
  },
  
  // Create new health data
  createHealthData: async (healthData: HealthData): Promise<HealthData> => {
    const response = await api.post('/health-data', healthData);
    return response.data;
  },
  
  // Update health data
  updateHealthData: async (id: string, healthData: Partial<HealthData>): Promise<HealthData> => {
    const response = await api.put(`/health-data/${id}`, healthData);
    return response.data;
  },
  
  // Delete health data
  deleteHealthData: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/health-data/${id}`);
    return response.data;
  }
};

export default healthDataService;
