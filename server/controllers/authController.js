import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import crypto from 'crypto';
import mockDb from '../config/mockDb.js';

// Flag to determine if we're using mock database
const useMockDb = process.env.USE_MOCK_DB === 'true' || false;

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // For development/demo purposes - handle demo account creation
    if (email.includes('demo@example') && password === 'password') {
      console.log('Creating demo account:', email);
      
      const mockUser = {
        _id: 'demo_user_' + Date.now(),
        name: name || 'Demo User',
        email: email,
        role: role || 'patient',
      };
      
      return res.status(201).json({
        ...mockUser,
        token: generateToken(mockUser._id),
      });
    }

    // Check if user already exists
    let userExists;
    let user;
    
    if (useMockDb) {
      userExists = mockDb.findUserByEmail(email);
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Create new user in mock DB
      user = mockDb.createUser({
        name,
        email,
        password, // Note: In a real app, you'd hash this password
        role: role || 'patient',
      });
    } else {
      // Check if user already exists in MongoDB
      userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user in MongoDB
      user = await User.create({
        name,
        email,
        password,
        role: role || 'patient',
      });
    }

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // For development/demo purposes - allow login with mock credentials
    if (email.includes('demo@example.com') && password === 'password') {
      const mockUser = {
        _id: 'demo_user_' + Date.now(),
        name: 'Demo User',
        email: email,
        role: 'patient',
      };
      
      console.log('Demo login successful:', mockUser.email);
      
      return res.json({
        ...mockUser,
        token: generateToken(mockUser._id),
      });
    }
    
    // Try to find user in database
    let user;
    
    try {
      // Find user by email in MongoDB
      user = await User.findOne({ email });
    } catch (dbError) {
      console.log('MongoDB query failed, using mock DB:', dbError.message);
      // If MongoDB fails, try mock database
      user = mockDb.findUserByEmail(email);
    }

    // Check if user exists and password matches
    if (user) {
      let passwordMatches = false;
      
      try {
        // Try to use the model's comparePassword method
        passwordMatches = await user.comparePassword(password);
      } catch (compareError) {
        // For mock users or if comparePassword fails
        console.log('Password comparison using model method failed');
        // For demo purposes, accept 'password' for any user
        passwordMatches = password === 'password';
      }
      
      if (passwordMatches) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        });
      }
    }
    
    // If we get here, authentication failed
    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'No user with that email' });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
      
    // Set expire
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    await user.save();
    
    // In a real application, you would send an email with the reset token
    // For now, just return the token in the response
    res.json({
      message: 'Password reset token generated',
      resetToken,
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password/:resetToken
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');
      
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    
    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();
    
    res.json({
      message: 'Password updated successfully',
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
export const googleCallback = async (req, res) => {
  try {
    // Passport has already authenticated the user and attached it to req.user
    const user = req.user;
    
    if (!user) {
      return res.status(400).json({ message: 'Google authentication failed' });
    }
    
    // Generate JWT token
    const token = generateToken(user._id);
    
    // Redirect to frontend with token
    // In a production app, you'd use a more secure method to pass the token
    res.redirect(`http://localhost:5173/auth-callback?token=${token}&userId=${user._id}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&role=${user.role}`);
  } catch (error) {
    console.error('Google callback error:', error);
    res.redirect('http://localhost:5173/login?error=authentication_failed');
  }
};
