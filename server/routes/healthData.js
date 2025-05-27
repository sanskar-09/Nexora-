import express from 'express';
import { 
  getHealthData,
  getHealthDataById,
  createHealthData,
  updateHealthData,
  deleteHealthData,
  getHealthDataByType
} from '../controllers/healthDataController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Health data routes
router.get('/', protect, getHealthData);
router.get('/type/:type', protect, getHealthDataByType);
router.get('/:id', protect, getHealthDataById);
router.post('/', protect, createHealthData);
router.put('/:id', protect, updateHealthData);
router.delete('/:id', protect, deleteHealthData);

export default router;
