interface MedicalRecord {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadDate: string;
  url: string;
}

class MedicalRecordService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3004/api';
  }

  async uploadRecord(appointmentId: string, file: File): Promise<MedicalRecord> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/appointments/${appointmentId}/records`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload record');
    }

    return response.json();
  }

  async getRecords(appointmentId: string): Promise<MedicalRecord[]> {
    const response = await fetch(`${this.baseUrl}/appointments/${appointmentId}/records`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch records');
    }

    return response.json();
  }

  async deleteRecord(appointmentId: string, recordId: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/appointments/${appointmentId}/records/${recordId}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      throw new Error('Failed to delete record');
    }
  }

  getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) {
      return '🖼️';
    } else if (mimeType === 'application/pdf') {
      return '📄';
    } else if (mimeType.startsWith('video/')) {
      return '🎥';
    } else if (mimeType.startsWith('audio/')) {
      return '🎵';
    } else {
      return '📎';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const medicalRecordService = new MedicalRecordService(); 