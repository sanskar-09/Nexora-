import mongoose from 'mongoose';

const symptomSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    symptoms: [{
      name: {
        type: String,
        required: true,
      },
      severity: {
        type: Number, // 1-10 scale
        required: true,
        min: 1,
        max: 10,
      },
      duration: {
        value: Number,
        unit: {
          type: String,
          enum: ['minutes', 'hours', 'days', 'weeks', 'months'],
          default: 'days',
        },
      },
      location: String,
      triggers: [String],
      relievingFactors: [String],
    }],
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    aiAnalysis: {
      possibleConditions: [{
        name: String,
        probability: Number, // 0-100
        description: String,
        recommendations: [String],
      }],
      recommendedActions: [String],
      urgencyLevel: {
        type: String,
        enum: ['low', 'medium', 'high', 'emergency'],
      },
    },
  },
  { timestamps: true }
);

const Symptom = mongoose.model('Symptom', symptomSchema);

export default Symptom;
