import express from 'express';
import { 
  getSymptomChecks,
  getSymptomCheckById,
  createSymptomCheck,
  updateSymptomCheck,
  deleteSymptomCheck,
  analyzeSymptoms
} from '../controllers/symptomController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Symptom routes
router.get('/', protect, getSymptomChecks);
router.get('/:id', protect, getSymptomCheckById);
router.post('/', protect, createSymptomCheck);
router.put('/:id', protect, updateSymptomCheck);
router.delete('/:id', protect, deleteSymptomCheck);
router.post('/analyze', protect, analyzeSymptoms);

export default router;
