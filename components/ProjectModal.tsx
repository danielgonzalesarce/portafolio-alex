
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIframeLoaded(false);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="w-full h-full flex flex-col bg-[#050505] relative">
        
        {/* Workspace Toolbar (Emergent Style) */}
        <div className="bg-[#0a0a0a] border-b border-zinc-800 p-4 flex items-center justify-between z-50">
          <div className="flex items-center gap-6">
            <button 
              onClick={onClose} 
              className="p-2.5 hover:bg-zinc-900 rounded-lg transition-colors text-zinc-500 hover:text-white"
              title="Cerrar Workspace"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-white font-bold text-sm tracking-tight">{project.name}</h2>
                <span className="bg-red-marvel/10 text-red-marvel text-[9px] font-black px-1.5 py-0.5 rounded border border-red-marvel/20 uppercase tracking-tighter italic">DEMO_LIVE</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Estado: Desplegado</span>
              </div>
            </div>
          </div>

          {/* Browser Address Bar */}
          <div className="hidden lg:flex flex-1 max-w-3xl mx-8 bg-[#121212] border border-zinc-800 rounded-lg px-4 py-2 items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 21a10.003 10.003 0 008.384-4.562l.054.091m-9.95.1a10.019 10.019 0 01-5.111-4.498m11.354 0a10.019 10.019 0 01-5.112 4.498m-.001-9.499a5.002 5.002 0 110 10.004 5.002 5.002 0 010-10.004z" />
            </svg>
            <span className="text-[11px] text-zinc-500 font-mono truncate select-all">{project.liveUrl}</span>
            <div className="flex-1"></div>
            <button onClick={handleRefresh} className="p-1 hover:text-white text-zinc-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3">
             <button 
               className="bg-red-marvel text-white px-6 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider shadow-lg shadow-red-marvel/20 hover:scale-105 active:scale-95 transition-all"
               onClick={() => window.open(`https://wa.me/51936068781?text=Hola, estoy interesado en el sistema ${project.name}`, '_blank')}
             >
               Me interesa
             </button>
          </div>
        </div>

        {/* Main Viewport Container */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Interactive Browser Iframe */}
          <div className="flex-1 relative bg-white">
            <AnimatePresence>
              {(!iframeLoaded || isRefreshing) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black"
                >
                  <div className="w-10 h-10 border-2 border-red-marvel border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(226,54,54,0.3)]"></div>
                  <p className="mt-4 text-zinc-500 font-impact text-xs uppercase tracking-[0.3em] italic">Conectando con Servidor Real...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!isRefreshing && (
              <iframe 
                src={project.liveUrl} 
                className={`w-full h-full border-none transition-all duration-1000 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                title={project.name}
                onLoad={() => setIframeLoaded(true)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            )}
          </div>

          {/* Interactive HUD Sidebar */}
          <div className="hidden xl:flex w-72 bg-[#0a0a0a] border-l border-zinc-800 flex-col p-6 overflow-y-auto no-scrollbar">
            <h4 className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-6 underline decoration-red-marvel underline-offset-8">Sistema de Control</h4>
            
            <div className="space-y-6">
              <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <p className="text-[9px] text-zinc-600 font-black uppercase mb-3">Stack del Proyecto</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-black text-red-marvel text-[9px] font-mono rounded border border-red-marvel/20">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <p className="text-[9px] text-zinc-600 font-black uppercase mb-3">Conexión de Demo</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">Latencia</span>
                  <span className="text-[10px] text-green-500 font-mono">18ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">Protocolo</span>
                  <span className="text-[10px] text-white font-mono">HTTPS</span>
                </div>
              </div>

              <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <p className="text-[9px] text-zinc-600 font-black uppercase mb-3">Seguridad</p>
                <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-[10px] text-zinc-300">SSL Certificado</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-[10px] text-zinc-300">Sandbox Aislado</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-zinc-800">
              <button 
                onClick={handleRefresh}
                className="w-full bg-zinc-900 border border-zinc-800 text-white py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Actualizar Vista
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#080808] border-t border-zinc-800 px-6 py-2 flex justify-between items-center text-[9px] font-mono text-zinc-700 uppercase">
          <div className="flex items-center gap-6">
            <span>LIVE_STREAM_ACTIVE</span>
            <span>|</span>
            <span>ENVIROMENT: {project.id}-PRO-V4</span>
          </div>
          <div>BUGLE_DIGITAL_WORKSPACE © 2026</div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectModal;
