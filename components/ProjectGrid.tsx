
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
      alt={`Captura del sitio web de ${project.name}. ${project.shortDescription}`}
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
            Sitios que ya están publicados. Pasa el cursor por la foto, o tócala en el celular, para abrir la vista previa.
          </p>

          <div className="mt-8 flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-full border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`relative font-impact text-xs uppercase tracking-[0.2em] transition-colors ${
                  filter === cat.value ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {cat.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-red-marvel transition-all ${filter === cat.value ? 'w-full' : 'w-0'}`} />
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex h-full flex-col"
                >
                  <button
                    type="button"
                    onClick={openProject}
                    aria-label={`Vista previa de ${project.name}`}
                    className="relative aspect-[16/10] shrink-0 overflow-hidden"
                  >
                    <ProjectThumb project={project} />
                    <span className="absolute bottom-4 left-4 skew-x-[-12deg] bg-white px-3 py-1.5 font-impact text-sm uppercase italic tracking-tighter text-black shadow-[6px_6px_0_rgba(255,255,255,0.15)] md:hidden">
                      Vista previa &gt;
                    </span>
                    <span className="absolute inset-0 hidden items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 md:flex md:group-hover:opacity-100">
                      <span className="skew-x-[-12deg] bg-white px-6 py-3 font-impact text-2xl uppercase italic tracking-tighter text-black shadow-[8px_8px_0_rgba(255,255,255,0.15)]">
                        Vista previa &gt;
                      </span>
                    </span>
                  </button>

                  <div className="mt-3 flex min-h-[4.5rem] items-stretch">
                    <h3 className="flex flex-1 items-center bg-white px-3 py-2 font-impact text-xl uppercase italic leading-[0.9] tracking-tighter text-black sm:text-2xl">
                      {project.name}
                    </h3>
                    <span className="flex w-[5.75rem] shrink-0 items-center justify-center bg-red-marvel px-2 text-center font-impact text-[11px] uppercase italic leading-[0.9] tracking-tighter text-white">
                      {project.category}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{project.shortDescription}</p>
                  <p className="mt-auto pt-4 font-impact text-[10px] uppercase tracking-[0.22em] text-white/45">
                    {project.techStack.join(' · ')}
                  </p>
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
