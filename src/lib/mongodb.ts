import mongoose from 'mongoose';

export async function connectMongoDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
    throw error;
  }
} 