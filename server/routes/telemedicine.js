import express from 'express';
import { 
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getDoctors,
  getDoctorById,
  getAvailableSlots
} from '../controllers/telemedicineController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Telemedicine routes
router.get('/appointments', protect, getAppointments);
router.get('/appointments/:id', protect, getAppointmentById);
router.post('/appointments', protect, createAppointment);
router.put('/appointments/:id', protect, updateAppointment);
router.delete('/appointments/:id', protect, deleteAppointment);
router.get('/doctors', protect, getDoctors);
router.get('/doctors/:id', protect, getDoctorById);
router.get('/doctors/:id/slots', protect, getAvailableSlots);

export default router;
