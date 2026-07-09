const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    global.useMockDB = false;
  } catch (error) {
    console.warn(`\n[WARNING] MongoDB connection failed: ${error.message}`);
    console.warn(`[WARNING] Falling back to MOCK DATABASE MODE (persistent JSON database).\n`);
    global.useMockDB = true;
  }
};

module.exports = connectDB;
