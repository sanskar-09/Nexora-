import api from './api';

// Types
export interface Symptom {
  name: string;
  severity: number;
  duration?: {
    value: number;
    unit: 'minutes' | 'hours' | 'days' | 'weeks' | 'months';
  };
  frequency?: 'constant' | 'intermittent' | 'occasional' | 'rare';
  notes?: string;
}

export interface SymptomCheck {
  _id?: string;
  symptoms: Symptom[];
  additionalNotes?: string;
  analysis?: {
    possibleConditions: {
      name: string;
      probability: number;
      description: string;
      recommendations: string[];
    }[];
    recommendedActions: {
      type: 'self_care' | 'medication' | 'doctor_visit' | 'emergency';
      description: string;
    }[];
    generalAdvice: string;
  };
  timestamp?: Date | string;
}

// Symptom services
const symptomService = {
  // Get all symptom checks
  getSymptomChecks: async (): Promise<SymptomCheck[]> => {
    const response = await api.get('/symptoms');
    return response.data;
  },
  
  // Get symptom check by ID
  getSymptomCheckById: async (id: string): Promise<SymptomCheck> => {
    const response = await api.get(`/symptoms/${id}`);
    return response.data;
  },
  
  // Create new symptom check
  createSymptomCheck: async (symptomData: Omit<SymptomCheck, '_id' | 'analysis' | 'timestamp'>): Promise<SymptomCheck> => {
    const response = await api.post('/symptoms', symptomData);
    return response.data;
  },
  
  // Update symptom check
  updateSymptomCheck: async (id: string, symptomData: Partial<SymptomCheck>): Promise<SymptomCheck> => {
    const response = await api.put(`/symptoms/${id}`, symptomData);
    return response.data;
  },
  
  // Delete symptom check
  deleteSymptomCheck: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/symptoms/${id}`);
    return response.data;
  },
  
  // Analyze symptoms
  analyzeSymptoms: async (symptoms: Symptom[]): Promise<{ symptomCheck: SymptomCheck; analysis: SymptomCheck['analysis'] }> => {
    const response = await api.post('/symptoms/analyze', { symptoms });
    return response.data;
  }
};

export default symptomService;
