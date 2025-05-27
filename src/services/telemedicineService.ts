import api from './api';

// Types
export interface Doctor {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface Appointment {
  _id?: string;
  patient: string | { _id: string; name: string; email: string };
  doctor: string | { _id: string; name: string; email: string };
  dateTime: Date | string;
  duration?: number;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  type: 'video' | 'audio' | 'in_person' | 'chat';
  reason: string;
  notes?: {
    patient?: string;
    doctor?: string;
  };
  meetingLink?: string;
  followUp?: {
    recommended: boolean;
    timeframe?: string;
  };
  prescription?: {
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
  }[];
  diagnosis?: string;
  symptoms?: string[];
  attachments?: {
    name: string;
    fileUrl: string;
    uploadedBy: string;
    uploadedAt: Date | string;
  }[];
}

export interface AvailableSlot {
  dateTime: Date | string;
  available: boolean;
}

// Telemedicine services
const telemedicineService = {
  // Get all appointments
  getAppointments: async (status?: string, startDate?: string, endDate?: string): Promise<Appointment[]> => {
    let url = '/telemedicine/appointments';
    const params = new URLSearchParams();
    
    if (status) params.append('status', status);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await api.get(url);
    return response.data;
  },
  
  // Get appointment by ID
  getAppointmentById: async (id: string): Promise<Appointment> => {
    const response = await api.get(`/telemedicine/appointments/${id}`);
    return response.data;
  },
  
  // Create new appointment
  createAppointment: async (appointmentData: {
    doctorId: string;
    dateTime: Date | string;
    duration?: number;
    type?: 'video' | 'audio' | 'in_person' | 'chat';
    reason: string;
    notes?: string;
  }): Promise<Appointment> => {
    const response = await api.post('/telemedicine/appointments', appointmentData);
    return response.data;
  },
  
  // Update appointment
  updateAppointment: async (id: string, appointmentData: Partial<Appointment>): Promise<Appointment> => {
    const response = await api.put(`/telemedicine/appointments/${id}`, appointmentData);
    return response.data;
  },
  
  // Delete appointment
  deleteAppointment: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/telemedicine/appointments/${id}`);
    return response.data;
  },
  
  // Get all doctors
  getDoctors: async (): Promise<Doctor[]> => {
    const response = await api.get('/telemedicine/doctors');
    return response.data;
  },
  
  // Get doctor by ID
  getDoctorById: async (id: string): Promise<Doctor> => {
    const response = await api.get(`/telemedicine/doctors/${id}`);
    return response.data;
  },
  
  // Get available slots for a doctor
  getAvailableSlots: async (doctorId: string, date?: string): Promise<AvailableSlot[]> => {
    let url = `/telemedicine/doctors/${doctorId}/slots`;
    
    if (date) {
      url += `?date=${date}`;
    }
    
    const response = await api.get(url);
    return response.data;
  }
};

export default telemedicineService;
