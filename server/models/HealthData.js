import mongoose from 'mongoose';

const healthDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['blood_pressure', 'heart_rate', 'blood_glucose', 'weight', 'temperature', 'oxygen_saturation', 'sleep', 'exercise', 'other']
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  unit: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  },
  source: {
    type: String,
    enum: ['manual', 'device', 'app'],
    default: 'manual'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index for efficient querying
healthDataSchema.index({ user: 1, type: 1, timestamp: -1 });

const HealthData = mongoose.model('HealthData', healthDataSchema);

export default HealthData;
