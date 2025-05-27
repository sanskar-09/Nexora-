import SymptomCheck from '../models/SymptomCheck.js';

// @desc    Get all symptom checks for a user
// @route   GET /api/symptoms
// @access  Private
export const getSymptomChecks = async (req, res) => {
  try {
    const symptomChecks = await SymptomCheck.find({ user: req.user._id })
      .sort({ timestamp: -1 });
    
    res.json(symptomChecks);
  } catch (error) {
    console.error('Get symptom checks error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get symptom check by ID
// @route   GET /api/symptoms/:id
// @access  Private
export const getSymptomCheckById = async (req, res) => {
  try {
    const symptomCheck = await SymptomCheck.findById(req.params.id);
    
    // Check if symptom check exists
    if (!symptomCheck) {
      return res.status(404).json({ message: 'Symptom check not found' });
    }
    
    // Check if user owns the symptom check
    if (symptomCheck.user.toString() !== req.user._id.toString() && req.user.role !== 'admin' && req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Not authorized to access this symptom check' });
    }
    
    res.json(symptomCheck);
  } catch (error) {
    console.error('Get symptom check by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new symptom check
// @route   POST /api/symptoms
// @access  Private
export const createSymptomCheck = async (req, res) => {
  try {
    const {
      symptoms,
      additionalNotes
    } = req.body;
    
    const symptomCheck = await SymptomCheck.create({
      user: req.user._id,
      symptoms,
      additionalNotes,
      timestamp: new Date()
    });
    
    res.status(201).json(symptomCheck);
  } catch (error) {
    console.error('Create symptom check error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a symptom check
// @route   PUT /api/symptoms/:id
// @access  Private
export const updateSymptomCheck = async (req, res) => {
  try {
    const symptomCheck = await SymptomCheck.findById(req.params.id);
    
    // Check if symptom check exists
    if (!symptomCheck) {
      return res.status(404).json({ message: 'Symptom check not found' });
    }
    
    // Check if user owns the symptom check
    if (symptomCheck.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this symptom check' });
    }
    
    const {
      symptoms,
      additionalNotes
    } = req.body;
    
    // Update symptom check fields
    if (symptoms) symptomCheck.symptoms = symptoms;
    if (additionalNotes !== undefined) symptomCheck.additionalNotes = additionalNotes;
    
    const updatedSymptomCheck = await symptomCheck.save();
    
    res.json(updatedSymptomCheck);
  } catch (error) {
    console.error('Update symptom check error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a symptom check
// @route   DELETE /api/symptoms/:id
// @access  Private
export const deleteSymptomCheck = async (req, res) => {
  try {
    const symptomCheck = await SymptomCheck.findById(req.params.id);
    
    // Check if symptom check exists
    if (!symptomCheck) {
      return res.status(404).json({ message: 'Symptom check not found' });
    }
    
    // Check if user owns the symptom check
    if (symptomCheck.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this symptom check' });
    }
    
    await symptomCheck.deleteOne();
    
    res.json({ message: 'Symptom check removed' });
  } catch (error) {
    console.error('Delete symptom check error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Analyze symptoms and provide recommendations
// @route   POST /api/symptoms/analyze
// @access  Private
export const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    // In a real application, this would connect to a medical API or ML model
    // For demonstration purposes, we'll return mock analysis
    
    const mockAnalysis = {
      possibleConditions: [
        {
          name: 'Common Cold',
          probability: 0.75,
          description: 'A viral infection of the upper respiratory tract.',
          recommendations: [
            'Rest and stay hydrated',
            'Over-the-counter cold medications',
            'Consult a doctor if symptoms persist for more than a week'
          ]
        },
        {
          name: 'Seasonal Allergies',
          probability: 0.45,
          description: 'An immune system response to allergens like pollen or dust.',
          recommendations: [
            'Antihistamines',
            'Avoid known allergens',
            'Consider allergy testing if symptoms are recurring'
          ]
        }
      ],
      recommendedActions: [
        {
          type: 'self_care',
          description: 'Rest, stay hydrated, and monitor symptoms'
        },
        {
          type: 'medication',
          description: 'Over-the-counter pain relievers and decongestants may help relieve symptoms'
        }
      ],
      generalAdvice: 'Your symptoms appear to be mild. Monitor your condition and seek medical attention if symptoms worsen or persist for more than a week.'
    };
    
    // Create a new symptom check with the analysis
    const symptomCheck = await SymptomCheck.create({
      user: req.user._id,
      symptoms,
      analysis: mockAnalysis,
      timestamp: new Date()
    });
    
    res.status(201).json({
      symptomCheck,
      analysis: mockAnalysis
    });
  } catch (error) {
    console.error('Analyze symptoms error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
