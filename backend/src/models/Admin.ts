import { Schema, model, Document } from 'mongoose';

export interface IAdmin extends Document {
  username: string;
  password: string; // Will store bcrypt-hashed password
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

export default model<IAdmin>('Admin', AdminSchema);
