import React, { useState } from 'react';
import { Sparkles, Workflow } from 'lucide-react';

type Tool = {
  name: string;
  slug?: string;
  color?: string;
  icon?: 'ia' | 'auto';
};

const tools: Tool[] = [
  { name: 'Next.js', slug: 'nextdotjs', color: 'white' },
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Supabase', slug: 'supabase' },
  { name: 'Firebase', slug: 'firebase' },
  { name: 'Kotlin / Android', slug: 'kotlin' },
  { name: 'Vercel', slug: 'vercel', color: 'white' },
  { name: 'WhatsApp API', slug: 'whatsapp' },
  { name: 'Google Maps', slug: 'googlemaps' },
  { name: 'IA', icon: 'ia' },
  { name: 'Automatización', icon: 'auto' },
];

const Mark: React.FC<{ tool: Tool }> = ({ tool }) => {
  const [failed, setFailed] = useState(false);

  if (tool.icon === 'ia') return <Sparkles size={18} className="text-white" aria-hidden="true" />;
  if (tool.icon === 'auto') return <Workflow size={18} className="text-white" aria-hidden="true" />;
  if (failed || !tool.slug) {
    return <span className="font-impact text-xs text-white">{tool.name.slice(0, 2)}</span>;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${tool.slug}${tool.color ? `/${tool.color}` : ''}`}
      alt=""
      width={18}
      height={18}
      className="h-[18px] w-[18px] object-contain"
      onError={() => setFailed(true)}
    />
  );
};

const TechStack: React.FC = () => {
  return (
    <div className="mt-10 border-t border-white/10 pt-8">
      <p className="mb-5 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Stack</p>
      <ul className="flex flex-wrap gap-x-6 gap-y-4">
        {tools.map((tool) => (
          <li key={tool.name} className="flex items-center gap-2">
            <Mark tool={tool} />
            <span className="font-impact text-sm uppercase italic tracking-tighter text-white">{tool.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechStack;
