import mongoose from 'mongoose';
import config from './config';

async function connectToDatabase(): Promise<typeof mongoose> {
  try {
    const connection = await mongoose.connect(config.MONGO_URI);
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

export { connectToDatabase };