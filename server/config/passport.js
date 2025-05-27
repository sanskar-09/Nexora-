import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';

// Configure Passport with Local strategy
const configurePassport = () => {
  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Configure Local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          // For demo purposes, allow demo account
          if (email === 'demo@example.com' && password === 'password') {
            const demoUser = {
              _id: 'demo_user',
              name: 'Demo User',
              email: 'demo@example.com',
              role: 'patient'
            };
            return done(null, demoUser);
          }

          // Find user by email
          const user = await User.findOne({ email });
          
          if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          // Check password
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default configurePassport;
