import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';
import apiRouter from './routes/api';

// Load environment variables
dotenv.config();

// Ensure default fallback for JWT_SECRET
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'shahid_portfolio_jwt_secret_2026';
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://final-portfolio-frontend-spb2.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());

// Health check endpoint (placed before DB middleware so it responds instantly)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Shahid Afridi Portfolio API is operational.' });
});

// Ensure DB is connected before processing API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('Non-fatal DB connection error in middleware:', err);
  }
  next();
});

// Serve local uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api', apiRouter);

// Start Server
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
