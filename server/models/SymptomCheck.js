import mongoose from 'mongoose';

const symptomCheckSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symptoms: [{
    name: {
      type: String,
      required: true
    },
    severity: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    duration: {
      value: Number,
      unit: {
        type: String,
        enum: ['minutes', 'hours', 'days', 'weeks', 'months']
      }
    },
    frequency: {
      type: String,
      enum: ['constant', 'intermittent', 'occasional', 'rare']
    },
    notes: String
  }],
  additionalNotes: String,
  analysis: {
    possibleConditions: [{
      name: String,
      probability: Number,
      description: String,
      recommendations: [String]
    }],
    recommendedActions: [{
      type: {
        type: String,
        enum: ['self_care', 'medication', 'doctor_visit', 'emergency']
      },
      description: String
    }],
    generalAdvice: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const SymptomCheck = mongoose.model('SymptomCheck', symptomCheckSchema);

export default SymptomCheck;
