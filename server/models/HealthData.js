import mongoose from 'mongoose';

const healthDataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['blood_pressure', 'heart_rate', 'blood_sugar', 'weight', 'temperature', 'oxygen_level', 'sleep', 'exercise', 'medical_record', 'other'],
      required: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    tags: [String],
    fileUrl: {
      type: String,
    }
  },
  { timestamps: true }
);

const HealthData = mongoose.model('HealthData', healthDataSchema);

export default HealthData;
