import { Schema, model, Document } from 'mongoose';

export interface IResume extends Document {
  resumeUrl: string;
}

const ResumeSchema = new Schema<IResume>({
  resumeUrl: { type: String, required: true }
}, {
  timestamps: true
});

export default model<IResume>('Resume', ResumeSchema);
