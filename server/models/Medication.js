import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Medication name is required'],
    trim: true
  },
  dosage: {
    type: String,
    required: [true, 'Dosage is required']
  },
  frequency: {
    type: String,
    required: [true, 'Frequency is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date
  },
  instructions: {
    type: String
  },
  prescribedBy: {
    type: String
  },
  purpose: {
    type: String
  },
  sideEffects: [{
    type: String
  }],
  reminders: [{
    time: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  adherence: [{
    date: Date,
    taken: Boolean,
    notes: String
  }],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Medication = mongoose.model('Medication', medicationSchema);

export default Medication;
