import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import HealthData from '../models/HealthData.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'));
    }
  }
});

// @desc    Upload health data with file
// @route   POST /api/health-data
// @access  Private
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    const metadata = JSON.parse(req.body.metadata);
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const healthData = new HealthData({
      user: req.user._id,
      type: 'medical_record',
      value: {
        ...metadata,
        fileUrl
      },
      unit: 'file',
      date: metadata.date,
      notes: `Uploaded medical record: ${metadata.title}`
    });

    const savedData = await healthData.save();

    res.status(201).json({
      success: true,
      data: savedData,
      fileUrl
    });
  } catch (error) {
    console.error('Error uploading health data:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading health data',
      error: error.message
    });
  }
});

// @desc    Get user's health data
// @route   GET /api/health-data
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const healthData = await HealthData.find({ user: req.user._id })
      .sort({ date: -1 });
    res.json(healthData);
  } catch (error) {
    console.error('Error fetching health data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching health data',
      error: error.message
    });
  }
});

export default router; 