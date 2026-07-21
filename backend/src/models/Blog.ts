import { Schema, model, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  slug: string;
  content?: string;
  isComingSoon: boolean;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  readTime: { type: String, required: true },
  date: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String },
  isComingSoon: { type: Boolean, default: false }
});

export default model<IBlog>('Blog', BlogSchema);
