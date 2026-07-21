import { Schema, model, Document } from 'mongoose';

interface ISocialLink {
  platform: string;
  url: string;
}

export interface ISettings extends Document {
  socialLinks: ISocialLink[];
  email: string;
  phone: string;
  location: string;
}

const SocialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true }
});

const SettingsSchema = new Schema<ISettings>({
  socialLinks: { type: [SocialLinkSchema], default: [] },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true }
}, {
  timestamps: true
});

export default model<ISettings>('Settings', SettingsSchema);
