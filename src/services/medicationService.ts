import api from './api';

// Types
export interface Medication {
  _id?: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date | string;
  endDate?: Date | string;
  instructions?: string;
  prescribedBy?: string;
  purpose?: string;
  sideEffects?: string[];
  reminders?: {
    time: Date | string;
    isActive: boolean;
  }[];
  adherence?: {
    date: Date | string;
    taken: boolean;
    notes?: string;
  }[];
  active?: boolean;
}

export interface AdherenceRecord {
  date: Date | string;
  taken: boolean;
  notes?: string;
}

// Medication services
const medicationService = {
  // Get all medications
  getMedications: async (): Promise<Medication[]> => {
    const response = await api.get('/medications');
    return response.data;
  },
  
  // Get medication by ID
  getMedicationById: async (id: string): Promise<Medication> => {
    const response = await api.get(`/medications/${id}`);
    return response.data;
  },
  
  // Create new medication
  createMedication: async (medicationData: Medication): Promise<Medication> => {
    const response = await api.post('/medications', medicationData);
    return response.data;
  },
  
  // Update medication
  updateMedication: async (id: string, medicationData: Partial<Medication>): Promise<Medication> => {
    const response = await api.put(`/medications/${id}`, medicationData);
    return response.data;
  },
  
  // Delete medication
  deleteMedication: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/medications/${id}`);
    return response.data;
  },
  
  // Update medication adherence
  updateAdherence: async (id: string, adherenceData: AdherenceRecord): Promise<Medication> => {
    const response = await api.put(`/medications/${id}/adherence`, adherenceData);
    return response.data;
  }
};

export default medicationService;
