import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    default: 30
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'],
    default: 'scheduled'
  },
  type: {
    type: String,
    enum: ['video', 'audio', 'in_person', 'chat'],
    default: 'video'
  },
  reason: {
    type: String,
    required: true
  },
  notes: {
    patient: String,
    doctor: String
  },
  meetingLink: String,
  followUp: {
    recommended: {
      type: Boolean,
      default: false
    },
    timeframe: String
  },
  prescription: [{
    medication: String,
    dosage: String,
    frequency: String,
    duration: String,
    notes: String
  }],
  diagnosis: String,
  symptoms: [String],
  attachments: [{
    name: String,
    fileUrl: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
