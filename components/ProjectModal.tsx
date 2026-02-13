
import React from 'react';
import { motion } from 'framer-motion';
import DemoRenderer from './DemoRenderer';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Immersive Blurred Background */}
      <div className="absolute inset-0 z-0 bg-red-marvel/20 backdrop-blur-3xl" onClick={onClose}></div>
      
      <motion.div 
        layoutId={project.id}
        className="relative z-10 w-full h-full max-w-[100vw] max-h-[100vh] bg-black border-y-[10px] md:border-[10px] border-zinc-900 overflow-hidden flex flex-col shadow-[0_0_150px_rgba(0,0,0,1)]"
      >
        {/* Immersive Top Toolbar */}
        <div className="px-6 py-4 bg-zinc-900 text-white flex justify-between items-center z-50 border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="bg-red-marvel px-3 py-1 font-impact text-xl uppercase italic skew-x-[-10deg]">BUGLE-LIVE</div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-0.5 text-zinc-500">Misión Actual</p>
              <h2 className="font-impact text-2xl uppercase tracking-tighter leading-none italic">{project.name}</h2>
            </div>
          </div>
          
          <div className="flex gap-6 items-center">
             <div className="hidden lg:flex flex-col items-end border-r border-white/10 pr-6">
                <span className="text-[9px] font-black uppercase text-zinc-600">Entorno de Producción</span>
                <span className="text-[10px] font-bold text-green-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  SESIÓN ACTIVA Y SEGURA
                </span>
             </div>
             <button 
               onClick={onClose}
               className="group flex items-center gap-3 bg-white text-black pl-5 pr-2 py-2 rounded-full hover:bg-red-marvel hover:text-white transition-all transform hover:scale-105 active:scale-95"
             >
               <span className="font-impact text-lg uppercase tracking-tighter">FINALIZAR</span>
               <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-red-marvel transition-all transform group-hover:rotate-90">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </div>
             </button>
          </div>
        </div>

        {/* Content Area - Immersive Viewer */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-black">
          <DemoRenderer project={project} />
        </div>

        {/* Cinematic Bottom HUD */}
        <div className="px-6 py-2 bg-zinc-900 text-zinc-600 flex justify-between items-center font-impact text-sm uppercase italic tracking-tighter z-50">
          <div className="flex gap-10">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-marvel rounded-full"></span>
              Cifrado: End-to-End
            </span>
            <span className="hidden sm:block opacity-40">Host: Digital_Bugle_Cloud_S3</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-black tracking-widest opacity-50 italic">© 2026 PRODUCCIONES BUGLE</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
