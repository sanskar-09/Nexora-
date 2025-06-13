import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      default: 30,
    },
    type: {
      type: String,
      enum: ['in-person', 'video', 'phone'],
      default: 'video',
    },
    status: {
      type: String,
      enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
      default: 'scheduled',
    },
    reason: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    followUp: {
      required: Boolean,
      date: Date,
    },
    meetingLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
