import { Schema, model, Document } from 'mongoose';

interface IStatistic {
  label: string;
  value: string;
}

export interface IAbout extends Document {
  description: string;
  profileImage: string;
  statistics: IStatistic[];
}

const StatisticSchema = new Schema<IStatistic>({
  label: { type: String, required: true },
  value: { type: String, required: true }
});

const AboutSchema = new Schema<IAbout>({
  description: { type: String, required: true },
  profileImage: { type: String, default: '' },
  statistics: { type: [StatisticSchema], default: [] }
}, {
  timestamps: true
});

export default model<IAbout>('About', AboutSchema);
