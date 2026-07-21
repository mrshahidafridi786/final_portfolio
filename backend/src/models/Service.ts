import { Schema, model, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  icon: string; // React-icons name, e.g., 'FaCode'
}

const ServiceSchema = new Schema<IService>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }
}, {
  timestamps: true
});

export default model<IService>('Service', ServiceSchema);
