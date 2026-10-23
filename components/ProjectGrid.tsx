
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
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
      alt={`Captura del sitio web de ${project.name}. ${project.shortDescription}`}
      width={1400}
      height={875}
      loading="lazy"
      className="h-full w-full object-cover"
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
    <section id="portfolio" className="relative z-10 overflow-hidden bg-black px-6 py-24 md:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden opacity-[0.07] select-none">
        <span className="font-impact text-[42vw] leading-none tracking-tighter text-white whitespace-nowrap">WEB</span>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-16 h-[36vw] w-[36vw] -translate-x-1/2 rounded-full bg-red-marvel/25 blur-[120px]" />

      <div className="relative mx-auto max-w-[1800px]">
        <header className="mb-14 flex flex-col items-center text-center">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Trabajos publicados</p>
          <h2 className="font-impact text-[14vw] uppercase leading-[0.75] tracking-tighter text-white md:text-[7.5rem]">
            Proyectos
          </h2>
          <p className="marvel-text-outline -mt-1 font-impact text-[7vw] uppercase leading-none tracking-tighter md:-mt-3 md:text-[3.5rem]">
            En línea
          </p>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
            Sitios que ya están publicados. Toca una tarjeta para abrir la vista previa.
          </p>

          <div className="mt-8 flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${
                  filter === cat.value
                    ? 'rounded-full bg-[#ff2222] px-4 py-1.5 text-white'
                    : 'px-1 py-1.5 text-white/55 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const openProject = () => {
                if (project.openInNewTab && project.liveUrl) {
                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                } else {
                  onProjectSelect(project);
                }
              };

              return (
                <motion.article
                  layout
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  onClick={openProject}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openProject();
                    }
                  }}
                  aria-label={`Vista previa de ${project.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex h-full cursor-pointer flex-col rounded-[22px] border border-[#ff2a2a] bg-[#090909] p-3 shadow-[0_0_14px_rgba(255,34,34,0.28)]"
                >
                  <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-[14px]">
                    <ProjectThumb project={project} />
                    {project.inDevelopment && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#ff2222] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                        En desarrollo
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col px-1.5 pb-1 pt-4">
                    <h3 className="text-lg font-black uppercase leading-none tracking-[0.03em] text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-400">{project.shortDescription}</p>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/15 pt-3">
                      <p className="flex min-w-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                        <Globe className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        <span className="truncate">{project.techStack.join(' · ')}</span>
                      </p>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff2222] text-white">
                        <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-20 flex flex-col items-center gap-8 text-center">
          <p className="font-impact text-5xl uppercase leading-[0.8] tracking-tighter text-white md:text-7xl">
            ¿Quieres una web<br />
            <span className="marvel-text-outline">como estas?</span>
          </p>
          <a
            href="https://wa.me/51936068781?text=Hola%20Daniel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <span className="absolute inset-0 bg-red-marvel opacity-20 blur-2xl transition-opacity group-hover:opacity-40" />
            <span className="relative block skew-x-[-12deg] bg-red-marvel px-8 py-4 font-impact text-2xl uppercase italic tracking-tighter text-white shadow-[10px_10px_0_rgba(255,255,255,0.1)] transition-transform hover:scale-105 md:px-12 md:text-3xl">
              Escríbeme por WhatsApp &gt;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
