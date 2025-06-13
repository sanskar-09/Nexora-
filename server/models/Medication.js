import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    instructions: {
      type: String,
    },
    prescribedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reminders: [
      {
        time: String,
        days: [String],
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    sideEffects: [String],
    taken: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        taken: {
          type: Boolean,
          default: false,
        },
        notes: String,
      },
    ],
  },
  { timestamps: true }
);

const Medication = mongoose.model('Medication', medicationSchema);

export default Medication;
