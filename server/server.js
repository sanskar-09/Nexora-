import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import connectDB from './config/db.js';
import configurePassport from './config/passport.js';

// Routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import medicationRoutes from './routes/medications.js';
import symptomsRoutes from './routes/symptoms.js';
import healthDataRoutes from './routes/healthData.js';
import telemedicineRoutes from './routes/telemedicine.js';
import educationRoutes from './routes/education.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
try {
  connectDB();
  console.log('MongoDB connection initialized');
} catch (error) {
  console.error('MongoDB connection failed:', error.message);
  // Continue even if MongoDB connection fails (for development purposes)
}

// Configuration
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Initialize Passport
configurePassport();
app.use(passport.initialize());

// Add a simple test route to verify server is running
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running', port: PORT });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/symptoms', symptomsRoutes);
app.use('/api/health-data', healthDataRoutes);
app.use('/api/telemedicine', telemedicineRoutes);
app.use('/api/education', educationRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Nexora Healthcare API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
