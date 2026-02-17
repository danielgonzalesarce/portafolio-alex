
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project, ProjectCategory } from '../types';

interface ProjectGridProps {
  onProjectSelect: (project: Project) => void;
  searchQuery: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ onProjectSelect, searchQuery }) => {
  const [filter, setFilter] = useState<ProjectCategory | 'Todo'>('Todo');
  const categories: (ProjectCategory | 'Todo')[] = ['Todo', 'SaaS', 'CRM', 'Data', 'AI'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchesCategory = filter === 'Todo' || p.category === filter;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <section id="portfolio" className="relative z-10 bg-[#080808] pt-32 pb-48">
      <div className="max-w-[1400px] mx-auto px-8">
        
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-marvel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <h2 className="text-white font-impact text-xl uppercase tracking-widest italic">Galería Workspace</h2>
          </div>
          <p className="text-zinc-400 font-medium text-lg max-w-2xl mb-10">
            Interfaces funcionales listas para producción. Haz clic en <span className="text-white">Lanzar Demo</span> para interactuar con el entorno real de cada proyecto.
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-lg text-[11px] font-bold tracking-widest transition-all uppercase ${
                  filter === cat 
                  ? 'bg-white text-black' 
                  : 'bg-[#121212] text-zinc-500 border border-zinc-800/50 hover:border-zinc-600 hover:text-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex flex-col"
              >
                {/* Emergent Style Browser Frame */}
                <div className="relative aspect-[16/11] bg-[#141414] rounded-[12px] overflow-hidden border border-zinc-800 group-hover:border-zinc-700 transition-all duration-300 shadow-xl group-hover:shadow-2xl">
                  {/* Fake Browser Toolbar */}
                  <div className="h-7 bg-[#1a1a1a] border-b border-zinc-800 flex items-center px-3 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                  </div>

                  <img 
                    src={project.thumbnail} 
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Interaction HUD */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button 
                      onClick={() => onProjectSelect(project)}
                      className="bg-zinc-100 text-black px-4 py-2 rounded-md font-bold text-[11px] uppercase tracking-wider hover:bg-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Vista previa
                    </button>
                    <button 
                      onClick={() => onProjectSelect(project)}
                      className="bg-red-marvel text-white px-4 py-2 rounded-md font-bold text-[11px] uppercase tracking-wider hover:bg-red-600 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Lanzar Demo
                    </button>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-red-marvel transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] bg-red-marvel/10 text-red-marvel border border-red-marvel/20 px-2 py-0.5 rounded font-black uppercase tracking-tighter">
                      {project.category}
                    </span>
                    <div className="h-1 w-1 bg-zinc-800 rounded-full"></div>
                    <p className="text-zinc-500 text-[11px] font-medium truncate max-w-[200px]">{project.shortDescription}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[9px] text-zinc-400 font-mono bg-zinc-900 px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
