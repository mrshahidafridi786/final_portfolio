import { Schema, model, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  logoUrl?: string;
  content: string;
  rating: number; // 1 to 5
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  logoUrl: { type: String },
  content: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 }
});

export default model<ITestimonial>('Testimonial', TestimonialSchema);
