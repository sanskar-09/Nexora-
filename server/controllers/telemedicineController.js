import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

// @desc    Get all appointments for a user (patient or doctor)
// @route   GET /api/telemedicine/appointments
// @access  Private
export const getAppointments = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    // Build query based on user role
    let query = {};
    
    if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } else if (req.user.role === 'doctor') {
      query.doctor = req.user._id;
    } else if (req.user.role === 'admin') {
      // Admin can see all appointments
    } else {
      return res.status(403).json({ message: 'Not authorized to access appointments' });
    }
    
    // Add filters if provided
    if (status) {
      query.status = status;
    }
    
    if (startDate || endDate) {
      query.dateTime = {};
      if (startDate) query.dateTime.$gte = new Date(startDate);
      if (endDate) query.dateTime.$lte = new Date(endDate);
    }
    
    const appointments = await Appointment.find(query)
      .populate('patient', 'name email')
      .populate('doctor', 'name email')
      .sort({ dateTime: 1 });
    
    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get appointment by ID
// @route   GET /api/telemedicine/appointments/:id
// @access  Private
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'name email phoneNumber')
      .populate('doctor', 'name email');
    
    // Check if appointment exists
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if user is authorized to view this appointment
    if (
      appointment.patient._id.toString() !== req.user._id.toString() &&
      appointment.doctor._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to access this appointment' });
    }
    
    res.json(appointment);
  } catch (error) {
    console.error('Get appointment by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new appointment
// @route   POST /api/telemedicine/appointments
// @access  Private
export const createAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      dateTime,
      duration,
      type,
      reason,
      notes
    } = req.body;
    
    // Check if doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Create new appointment
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      dateTime,
      duration: duration || 30,
      type: type || 'video',
      reason,
      notes: {
        patient: notes
      },
      status: 'scheduled'
    });
    
    // Populate patient and doctor info
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'name email')
      .populate('doctor', 'name email');
    
    res.status(201).json(populatedAppointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update an appointment
// @route   PUT /api/telemedicine/appointments/:id
// @access  Private
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    // Check if appointment exists
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if user is authorized to update this appointment
    const isPatient = appointment.patient.toString() === req.user._id.toString();
    const isDoctor = appointment.doctor.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    
    if (!isPatient && !isDoctor && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }
    
    const {
      dateTime,
      duration,
      status,
      type,
      reason,
      notes,
      meetingLink,
      followUp,
      prescription,
      diagnosis,
      symptoms,
      attachments
    } = req.body;
    
    // Update appointment fields
    if (dateTime) appointment.dateTime = dateTime;
    if (duration) appointment.duration = duration;
    if (status) appointment.status = status;
    if (type) appointment.type = type;
    if (reason) appointment.reason = reason;
    
    // Update notes based on user role
    if (notes) {
      if (isPatient) {
        appointment.notes.patient = notes;
      } else if (isDoctor || isAdmin) {
        appointment.notes.doctor = notes;
      }
    }
    
    // Fields that only doctors or admins can update
    if (isDoctor || isAdmin) {
      if (meetingLink) appointment.meetingLink = meetingLink;
      if (followUp) appointment.followUp = followUp;
      if (prescription) appointment.prescription = prescription;
      if (diagnosis) appointment.diagnosis = diagnosis;
      if (symptoms) appointment.symptoms = symptoms;
    }
    
    // Handle attachments
    if (attachments) {
      // Add new attachments with user info
      const newAttachments = attachments.map(attachment => ({
        ...attachment,
        uploadedBy: req.user._id,
        uploadedAt: new Date()
      }));
      
      appointment.attachments = [...appointment.attachments, ...newAttachments];
    }
    
    const updatedAppointment = await appointment.save();
    
    // Populate patient and doctor info
    const populatedAppointment = await Appointment.findById(updatedAppointment._id)
      .populate('patient', 'name email')
      .populate('doctor', 'name email');
    
    res.json(populatedAppointment);
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete an appointment
// @route   DELETE /api/telemedicine/appointments/:id
// @access  Private
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    // Check if appointment exists
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if user is authorized to delete this appointment
    const isPatient = appointment.patient.toString() === req.user._id.toString();
    const isDoctor = appointment.doctor.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    
    if (!isPatient && !isDoctor && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this appointment' });
    }
    
    await appointment.deleteOne();
    
    res.json({ message: 'Appointment removed' });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all doctors
// @route   GET /api/telemedicine/doctors
// @access  Private
export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' })
      .select('name email profilePicture');
    
    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/telemedicine/doctors/:id
// @access  Private
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findOne({ _id: req.params.id, role: 'doctor' })
      .select('-password');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    console.error('Get doctor by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get available slots for a doctor
// @route   GET /api/telemedicine/doctors/:id/slots
// @access  Private
export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    
    // Check if doctor exists
    const doctor = await User.findOne({ _id: req.params.id, role: 'doctor' });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // In a real application, this would fetch the doctor's schedule and availability
    // For demonstration purposes, we'll return mock available slots
    
    // Parse the requested date or use today
    const requestedDate = date ? new Date(date) : new Date();
    
    // Set hours to 0 to get the start of the day
    requestedDate.setHours(0, 0, 0, 0);
    
    // Generate mock slots for the next 7 days
    const availableSlots = [];
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(requestedDate);
      currentDate.setDate(currentDate.getDate() + i);
      
      // Generate slots from 9 AM to 5 PM with 30-minute intervals
      for (let hour = 9; hour < 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const slotTime = new Date(currentDate);
          slotTime.setHours(hour, minute, 0, 0);
          
          // Skip slots in the past
          if (slotTime > new Date()) {
            availableSlots.push({
              dateTime: slotTime,
              available: Math.random() > 0.3 // 70% chance of being available
            });
          }
        }
      }
    }
    
    // Filter only available slots
    const onlyAvailableSlots = availableSlots.filter(slot => slot.available);
    
    res.json(onlyAvailableSlots);
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
