
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project, ProjectCategory } from '../types';

interface ProjectGridProps {
  onProjectSelect: (project: Project) => void;
  searchQuery: string;
}

const categories: { label: string; value: ProjectCategory | 'Todo' }[] = [
  { label: 'Todo', value: 'Todo' },
  { label: 'Web', value: 'Web' },
  { label: 'E-commerce', value: 'E-commerce' },
  { label: 'Proyectos propios', value: 'Proyecto propio' },
];

const ProjectThumb: React.FC<{ project: Project }> = ({ project }) => {
  const sources = project.slug
    ? [`/projects/${project.slug}.webp`, `/projects/${project.slug}.png`, project.thumbnail]
    : [project.thumbnail];
  const [index, setIndex] = useState(0);
  const src = sources[Math.min(index, sources.length - 1)];

  return (
    <img
      src={src}
      alt={`Captura del sitio web de ${project.name}`}
      width={1400}
      height={875}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-[1.04]"
      onError={() => {
        if (index < sources.length - 1) setIndex((current) => current + 1);
      }}
    />
  );
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ onProjectSelect, searchQuery }) => {
  const [filter, setFilter] = useState<ProjectCategory | 'Todo'>('Todo');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchesCategory = filter === 'Todo' || p.category === filter;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <section id="portfolio" className="relative z-10 bg-[#050505] pt-12 pb-24 md:pt-16 md:pb-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        
        <header className="mb-10 md:mb-16">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Galería</p>
          <h2 className="font-impact text-5xl uppercase italic leading-none tracking-tighter text-white sm:text-6xl md:text-8xl">
            Proyectos
          </h2>
          <p className="mb-8 mt-5 max-w-xl text-sm text-white/50 md:mb-10 md:mt-6 md:text-base">
            Sitios publicados. Toca la foto para abrir la <span className="text-white">vista previa</span>.
          </p>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`skew-x-[-8deg] px-4 py-2 font-impact text-base uppercase italic tracking-tighter transition-colors md:px-6 md:text-lg ${
                  filter === cat.value
                  ? 'bg-red-marvel text-white'
                  : 'text-white/40 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const openProject = () => {
                if (project.openInNewTab && project.liveUrl) {
                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                } else {
                  onProjectSelect(project);
                }
              };

              const beats: [string, string, string][] = [
                ['01', 'Problema', project.problem],
                ['02', 'Trabajo', project.work],
                ...(project.outcome ? [['03', 'Resultado', project.outcome] as [string, string, string]] : []),
              ];

              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex h-full flex-col overflow-hidden border border-white/10 bg-black transition-colors duration-300 hover:border-red-marvel/70"
                >
                  <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/10 px-4">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-red-marvel"></span>
                      <span className="h-2 w-2 rounded-full bg-white/20"></span>
                      <span className="h-2 w-2 rounded-full bg-white/20"></span>
                    </div>
                    <span className="font-impact text-[10px] uppercase tracking-[0.35em] text-white/40">{project.category}</span>
                  </div>

                  <button
                    type="button"
                    onClick={openProject}
                    aria-label={`Vista previa de ${project.name}`}
                    className="relative aspect-[16/10] shrink-0 overflow-hidden"
                  >
                    <ProjectThumb project={project} />
                    <span className="absolute bottom-3 left-3 skew-x-[-8deg] bg-white px-3 py-1.5 font-impact text-[11px] uppercase italic tracking-tighter text-black shadow-[3px_3px_0_rgba(0,0,0,0.55)] md:hidden">
                      Vista previa
                    </span>
                    <span className="absolute inset-0 hidden items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 md:flex md:group-hover:opacity-100">
                      <span className="skew-x-[-8deg] bg-white px-5 py-2.5 font-impact text-lg uppercase italic tracking-tighter text-black">
                        Vista previa
                      </span>
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col px-4 py-4 md:px-5">
                    <h3 className="font-impact text-2xl uppercase italic leading-[0.9] tracking-tighter text-white sm:text-3xl">
                      {project.name}
                    </h3>

                    <ol className="mt-4 flex flex-col gap-2">
                      {beats.map(([index, label, text]) => (
                        <li key={index} className="grid grid-cols-[1.35rem_1fr] items-baseline gap-2">
                          <span className="font-impact text-xs italic text-red-marvel">{index}</span>
                          <p className="text-sm leading-snug text-white/70">
                            <span className="mr-1.5 font-impact text-sm uppercase tracking-tighter text-white/40">{label}</span>
                            {text}
                          </p>
                        </li>
                      ))}
                    </ol>

                    <p className="mt-4 border-t border-white/10 pt-3 font-impact text-[11px] uppercase tracking-tighter text-white/35">
                      {project.techStack.join(' · ')}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-white/10 pt-10">
          <p className="font-impact text-4xl uppercase italic leading-none tracking-tighter text-white md:text-6xl">
            ¿Quieres una web<br /><span className="text-red-marvel">como estas?</span>
          </p>
          <a
            href="https://wa.me/51936068781?text=Hola%20Daniel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-marvel px-6 py-3 font-impact text-lg uppercase italic tracking-tighter text-white skew-x-[-8deg]"
          >
            Escríbeme por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
