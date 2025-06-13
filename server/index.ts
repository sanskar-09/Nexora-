import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { setupWebSocketServer } from './websocket.js';

const app = express();
const server = createServer(app);

// Setup WebSocket server
setupWebSocketServer(server);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept all file types
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Mock data for appointments and medical records
const mockAppointments = {
  '123': {
    id: '123',
    status: 'scheduled',
    doctor: { id: '1', name: 'Dr. Smith' },
    patient: { id: '2', name: 'John Doe' },
    medicalRecords: []
  }
};

// Routes
app.get('/api/appointments/:id', (req, res) => {
  const appointment = mockAppointments[req.params.id];
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  res.json(appointment);
});

app.post('/api/appointments/:id/status', (req, res) => {
  const { status } = req.body;
  const appointment = mockAppointments[req.params.id];
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  appointment.status = status;
  res.json(appointment);
});

// Medical Records Routes
app.post('/api/appointments/:id/records', upload.single('file'), (req, res) => {
  const appointment = mockAppointments[req.params.id];
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const record = {
    id: Date.now().toString(),
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    uploadDate: new Date().toISOString(),
    url: `/uploads/${req.file.filename}`
  };

  appointment.medicalRecords.push(record);
  res.json(record);
});

app.get('/api/appointments/:id/records', (req, res) => {
  const appointment = mockAppointments[req.params.id];
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  res.json(appointment.medicalRecords);
});

app.delete('/api/appointments/:id/records/:recordId', (req, res) => {
  const appointment = mockAppointments[req.params.id];
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  const recordIndex = appointment.medicalRecords.findIndex(r => r.id === req.params.recordId);
  if (recordIndex === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }

  const record = appointment.medicalRecords[recordIndex];
  const filePath = path.join('uploads', record.filename);
  
  // Delete file from filesystem
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    }
  });

  // Remove record from appointment
  appointment.medicalRecords.splice(recordIndex, 1);
  res.json({ message: 'Record deleted successfully' });
});

// Start server
const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 