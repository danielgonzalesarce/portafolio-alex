
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project, ProjectCategory } from '../types';

interface ProjectGridProps {
  onProjectSelect: (project: Project) => void;
  searchQuery: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ onProjectSelect, searchQuery }) => {
  const [filter, setFilter] = useState<ProjectCategory | 'Todos'>('Todos');

  const categories = ['Todos', 'AI', '3D', 'Data', 'UI/UX'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchesCategory = filter === 'Todos' || p.category === filter;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <section id="portfolio" className="relative z-10 bg-black py-40">
      <div className="max-w-[1800px] mx-auto px-8">
        
        {/* Cabecera de Sección Masiva */}
        <div className="mb-32 relative">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-6">
              <div className="h-0.5 w-20 bg-red-marvel"></div>
              <p className="text-red-marvel font-black text-xs uppercase tracking-[0.6em]">Asignaciones Clasificadas</p>
            </div>
            <h2 className="font-impact text-8xl md:text-[12rem] lg:text-[15rem] leading-[0.85] tracking-tighter text-white uppercase italic">
              PORTAFOLIO<br/><span className="text-white/10 marvel-text-outline not-italic">DE PORTADA</span>
            </h2>
          </motion.div>
        </div>

        {/* Navegación de Filtros */}
        <div className="flex flex-wrap gap-8 mb-20 border-b border-white/5 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`font-impact text-4xl uppercase tracking-tighter transition-all relative group ${
                filter === cat ? 'text-red-marvel skew-x-[-10deg]' : 'text-white/20 hover:text-white'
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.div layoutId="underline" className="absolute -bottom-2 left-0 right-0 h-1 bg-red-marvel" />
              )}
            </button>
          ))}
        </div>

        {/* Cuadrícula */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 min-h-[400px]">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -20 }}
                  onClick={() => onProjectSelect(project)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border-4 border-transparent group-hover:border-red-marvel transition-all duration-500">
                    <img 
                      src={project.thumbnail} 
                      alt={project.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110"
                    />
                    
                    {/* Superposición */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                    
                    {/* Elementos Decorativos */}
                    <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 font-impact text-xs uppercase italic tracking-tighter transform -rotate-6">
                      Edición #0{project.id}
                    </div>

                    {/* Contenido de Texto */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-red-marvel font-black text-[10px] uppercase tracking-[0.5em] mb-2">{project.category}</p>
                      <h3 className="font-impact text-5xl text-white uppercase leading-none tracking-tighter mb-4">{project.name}</h3>
                      <div className="h-1 w-0 group-hover:w-full bg-red-marvel transition-all duration-700"></div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <p className="font-impact text-4xl text-zinc-600 uppercase italic">Sin resultados para "{searchQuery}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
