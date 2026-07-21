import { Schema, model, Document } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  position: string;
  duration: string;
  description: string;
}

const ExperienceSchema = new Schema<IExperience>({
  company: { type: String, required: true },
  position: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true }
}, {
  timestamps: true
});

export default model<IExperience>('Experience', ExperienceSchema);
