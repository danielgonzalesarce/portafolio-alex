
export type ProjectCategory = 'AI' | '3D' | 'Data' | 'UI/UX' | 'SaaS' | 'ERP' | 'CRM' | 'Web' | 'E-commerce' | 'Proyecto propio';

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  problem: string;
  work: string;
  outcome?: string;
  category: ProjectCategory;
  thumbnail: string;
  slug?: string;
  demoType: 'GEMINI' | 'VISUALIZER' | 'INTERACTIVE' | 'IFRAME';
  techStack: string[];
  liveUrl?: string; // URL de Vercel/GitHub Pages
  githubUrl?: string;
  openInNewTab?: boolean;
}

export interface Client {
  name: string;
  logo: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface SupportMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'resolved';
  createdAt: any;
}

export interface Briefing {
  id: string;
  agentName: string;
  email: string;
  objective: string;
  details: string;
  status: 'new' | 'read' | 'replied';
  createdAt: any;
}
