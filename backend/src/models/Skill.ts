import { Schema, model, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  level: number; // 0 to 100
  iconName: string; // name of icon from react-icons (e.g., 'FaReact', 'SiMongodb')
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['frontend', 'backend', 'database', 'tools', 'other'], 
    required: true 
  },
  level: { type: Number, required: true, min: 0, max: 100 },
  iconName: { type: String, required: true }
});

export default model<ISkill>('Skill', SkillSchema);
