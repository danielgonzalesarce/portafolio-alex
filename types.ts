
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
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
