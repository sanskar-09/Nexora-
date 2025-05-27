import Medication from '../models/Medication.js';

// @desc    Get all medications for a user
// @route   GET /api/medications
// @access  Private
export const getMedications = async (req, res) => {
  try {
    const medications = await Medication.find({ user: req.user._id });
    res.json(medications);
  } catch (error) {
    console.error('Get medications error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get medication by ID
// @route   GET /api/medications/:id
// @access  Private
export const getMedicationById = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    
    // Check if medication exists
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    // Check if user owns the medication
    if (medication.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this medication' });
    }
    
    res.json(medication);
  } catch (error) {
    console.error('Get medication by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new medication
// @route   POST /api/medications
// @access  Private
export const createMedication = async (req, res) => {
  try {
    const {
      name,
      dosage,
      frequency,
      startDate,
      endDate,
      instructions,
      prescribedBy,
      purpose,
      sideEffects,
      reminders
    } = req.body;
    
    const medication = await Medication.create({
      user: req.user._id,
      name,
      dosage,
      frequency,
      startDate,
      endDate,
      instructions,
      prescribedBy,
      purpose,
      sideEffects,
      reminders
    });
    
    res.status(201).json(medication);
  } catch (error) {
    console.error('Create medication error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a medication
// @route   PUT /api/medications/:id
// @access  Private
export const updateMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    
    // Check if medication exists
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    // Check if user owns the medication
    if (medication.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this medication' });
    }
    
    const {
      name,
      dosage,
      frequency,
      startDate,
      endDate,
      instructions,
      prescribedBy,
      purpose,
      sideEffects,
      reminders,
      active
    } = req.body;
    
    // Update medication fields
    if (name) medication.name = name;
    if (dosage) medication.dosage = dosage;
    if (frequency) medication.frequency = frequency;
    if (startDate) medication.startDate = startDate;
    if (endDate !== undefined) medication.endDate = endDate;
    if (instructions !== undefined) medication.instructions = instructions;
    if (prescribedBy !== undefined) medication.prescribedBy = prescribedBy;
    if (purpose !== undefined) medication.purpose = purpose;
    if (sideEffects) medication.sideEffects = sideEffects;
    if (reminders) medication.reminders = reminders;
    if (active !== undefined) medication.active = active;
    
    const updatedMedication = await medication.save();
    
    res.json(updatedMedication);
  } catch (error) {
    console.error('Update medication error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a medication
// @route   DELETE /api/medications/:id
// @access  Private
export const deleteMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    
    // Check if medication exists
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    // Check if user owns the medication
    if (medication.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this medication' });
    }
    
    await medication.deleteOne();
    
    res.json({ message: 'Medication removed' });
  } catch (error) {
    console.error('Delete medication error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update medication adherence
// @route   PUT /api/medications/:id/adherence
// @access  Private
export const updateAdherence = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    
    // Check if medication exists
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    // Check if user owns the medication
    if (medication.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this medication' });
    }
    
    const { date, taken, notes } = req.body;
    
    // Add new adherence record
    medication.adherence.push({
      date: date || new Date(),
      taken,
      notes
    });
    
    const updatedMedication = await medication.save();
    
    res.json(updatedMedication);
  } catch (error) {
    console.error('Update adherence error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
