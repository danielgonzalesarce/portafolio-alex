
export type ProjectCategory = 'AI' | '3D' | 'Data' | 'UI/UX';

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  category: ProjectCategory;
  thumbnail: string;
  demoType: 'GEMINI' | 'VISUALIZER' | 'INTERACTIVE';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
