import HealthData from '../models/HealthData.js';

// @desc    Get all health data for a user
// @route   GET /api/health-data
// @access  Private
export const getHealthData = async (req, res) => {
  try {
    const { limit = 100, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    const healthData = await HealthData.find({ user: req.user._id })
      .sort({ timestamp: -1 })
      .limit(Number(limit))
      .skip(skip);
      
    const total = await HealthData.countDocuments({ user: req.user._id });
    
    res.json({
      data: healthData,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get health data error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get health data by ID
// @route   GET /api/health-data/:id
// @access  Private
export const getHealthDataById = async (req, res) => {
  try {
    const healthData = await HealthData.findById(req.params.id);
    
    // Check if health data exists
    if (!healthData) {
      return res.status(404).json({ message: 'Health data not found' });
    }
    
    // Check if user owns the health data
    if (healthData.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this health data' });
    }
    
    res.json(healthData);
  } catch (error) {
    console.error('Get health data by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get health data by type
// @route   GET /api/health-data/type/:type
// @access  Private
export const getHealthDataByType = async (req, res) => {
  try {
    const { limit = 100, page = 1, startDate, endDate } = req.query;
    const skip = (page - 1) * limit;
    
    const query = { 
      user: req.user._id,
      type: req.params.type
    };
    
    // Add date range filter if provided
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    
    const healthData = await HealthData.find(query)
      .sort({ timestamp: -1 })
      .limit(Number(limit))
      .skip(skip);
      
    const total = await HealthData.countDocuments(query);
    
    res.json({
      data: healthData,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get health data by type error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new health data
// @route   POST /api/health-data
// @access  Private
export const createHealthData = async (req, res) => {
  try {
    const {
      type,
      value,
      unit,
      timestamp,
      notes,
      source,
      metadata
    } = req.body;
    
    const healthData = await HealthData.create({
      user: req.user._id,
      type,
      value,
      unit,
      timestamp: timestamp || new Date(),
      notes,
      source: source || 'manual',
      metadata
    });
    
    res.status(201).json(healthData);
  } catch (error) {
    console.error('Create health data error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update health data
// @route   PUT /api/health-data/:id
// @access  Private
export const updateHealthData = async (req, res) => {
  try {
    const healthData = await HealthData.findById(req.params.id);
    
    // Check if health data exists
    if (!healthData) {
      return res.status(404).json({ message: 'Health data not found' });
    }
    
    // Check if user owns the health data
    if (healthData.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this health data' });
    }
    
    const {
      value,
      unit,
      timestamp,
      notes,
      source,
      metadata
    } = req.body;
    
    // Update health data fields
    if (value !== undefined) healthData.value = value;
    if (unit !== undefined) healthData.unit = unit;
    if (timestamp) healthData.timestamp = timestamp;
    if (notes !== undefined) healthData.notes = notes;
    if (source) healthData.source = source;
    if (metadata) healthData.metadata = metadata;
    
    const updatedHealthData = await healthData.save();
    
    res.json(updatedHealthData);
  } catch (error) {
    console.error('Update health data error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete health data
// @route   DELETE /api/health-data/:id
// @access  Private
export const deleteHealthData = async (req, res) => {
  try {
    const healthData = await HealthData.findById(req.params.id);
    
    // Check if health data exists
    if (!healthData) {
      return res.status(404).json({ message: 'Health data not found' });
    }
    
    // Check if user owns the health data
    if (healthData.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this health data' });
    }
    
    await healthData.deleteOne();
    
    res.json({ message: 'Health data removed' });
  } catch (error) {
    console.error('Delete health data error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
