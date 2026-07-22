import mongoose from 'mongoose';

const MONGODB_FALLBACK = 'mongodb+srv://shahidullahafridi31_db_user:CrsL1nngFFt7C4J2@cluster0.lrke4fj.mongodb.net/shahid_portfolio?appName=Cluster0';

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const connString = process.env.MONGODB_URI || MONGODB_FALLBACK;
    const conn = await mongoose.connect(connString, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error}`);
  }
};
