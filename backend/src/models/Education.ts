import { Schema, model, Document } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

const EducationSchema = new Schema<IEducation>({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true }
}, {
  timestamps: true
});

export default model<IEducation>('Education', EducationSchema);
