import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Try to connect to MongoDB, fallback to in-memory database if not available
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nexora', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.log('Using mock database for development');
    // Instead of exiting, we'll continue without a database for development purposes
    // In production, you would want to exit the process
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
