import { Router, Request, Response } from 'express';
import authRouter from './auth';
import contentRouter from './content';

// Existing models
import Blog from '../models/Blog';
import Testimonial from '../models/Testimonial';

const router = Router();

// Mount sub-routers
router.use('/auth', authRouter);
router.use('/', contentRouter);

// ==========================================
// ADDITIONAL PUBLIC PORTFOLIO ENDPOINTS
// ==========================================

// GET all blogs
router.get('/blogs', async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
});

// GET all testimonials
router.get('/testimonials', async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
  }
});

export default router;
