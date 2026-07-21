import { Schema, model, Document } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  organization: string;
  image: string;
  issueDate: string;
}

const CertificateSchema = new Schema<ICertificate>({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  image: { type: String, default: '' },
  issueDate: { type: String, required: true }
}, {
  timestamps: true
});

export default model<ICertificate>('Certificate', CertificateSchema);
