import express from 'express';
import { 
  getMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
  updateAdherence
} from '../controllers/medicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Medication routes
router.get('/', protect, getMedications);
router.get('/:id', protect, getMedicationById);
router.post('/', protect, createMedication);
router.put('/:id', protect, updateMedication);
router.delete('/:id', protect, deleteMedication);
router.put('/:id/adherence', protect, updateAdherence);

export default router;
