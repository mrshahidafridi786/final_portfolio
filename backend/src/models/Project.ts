import { Schema, model, Document } from 'mongoose';

interface ICodeSnippet {
  title: string;
  code: string;
  language: string;
}

export interface IProject extends Document {
  title: string;
  description: string;
  heroImage: string;
  gallery: string[];
  category: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  // Case Study Sections
  problem: string;
  solution: string;
  responsibilities: string[];
  features: string[];
  results: string;
  challenge: string;
  research: string;
  planning: string;
  wireframes?: string;
  designDecisions: string;
  developmentProcess: string;
  architecture: string;
  codeSnippets: ICodeSnippet[];
  performance: string;
  lessonsLearned: string;
}

const CodeSnippetSchema = new Schema<ICodeSnippet>({
  title: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, default: 'typescript' }
});

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  heroImage: { type: String, required: true },
  gallery: { type: [String], default: [] },
  category: { type: String, required: true },
  technologies: { type: [String], required: true },
  liveLink: { type: String },
  githubLink: { type: String },
  
  // Case Study
  problem: { type: String, default: '' },
  solution: { type: String, default: '' },
  responsibilities: { type: [String], default: [] },
  features: { type: [String], default: [] },
  results: { type: String, default: '' },
  challenge: { type: String, default: '' },
  research: { type: String, default: '' },
  planning: { type: String, default: '' },
  wireframes: { type: String },
  designDecisions: { type: String, default: '' },
  developmentProcess: { type: String, default: '' },
  architecture: { type: String, default: '' },
  codeSnippets: { type: [CodeSnippetSchema], default: [] },
  performance: { type: String, default: '' },
  lessonsLearned: { type: String, default: '' }
});

export default model<IProject>('Project', ProjectSchema);
