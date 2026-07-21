import { Schema, model, Document } from 'mongoose';

interface ICtaButton {
  label: string;
  action: string;
  primary: boolean;
}

interface ISocialLink {
  platform: string;
  url: string;
}

export interface IHero extends Document {
  name: string;
  title: string;
  subtitle: string;
  profileImage: string;
  ctaButtons: ICtaButton[];
  socialLinks: ISocialLink[];
}

const CtaButtonSchema = new Schema<ICtaButton>({
  label: { type: String, required: true },
  action: { type: String, required: true },
  primary: { type: Boolean, default: false }
});

const SocialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true }
});

const HeroSchema = new Schema<IHero>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  profileImage: { type: String, default: '' },
  ctaButtons: { type: [CtaButtonSchema], default: [] },
  socialLinks: { type: [SocialLinkSchema], default: [] }
}, {
  timestamps: true
});

export default model<IHero>('Hero', HeroSchema);
