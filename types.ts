
export type ProjectCategory = 'AI' | '3D' | 'Data' | 'UI/UX' | 'SaaS' | 'ERP' | 'CRM';

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  category: ProjectCategory;
  thumbnail: string;
  demoType: 'GEMINI' | 'VISUALIZER' | 'INTERACTIVE' | 'IFRAME';
  techStack: string[];
  liveUrl?: string; // URL de Vercel/GitHub Pages
  githubUrl?: string;
  openInNewTab?: boolean;
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
