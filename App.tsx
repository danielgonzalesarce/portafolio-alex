
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import ProjectModal from './components/ProjectModal';
import SecurityOverlay from './components/SecurityOverlay';
import Footer from './components/Footer';
import InternalPage from './components/InternalPage';
import WhatsAppButton from './components/WhatsAppButton';
import { Project } from './types';

export type ViewState = 'main' | 'archivos' | 'taquilla' | 'imax' | 'clasificados' | 'seguridad' | 'terminos' | 'equipo';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<ViewState>('main');

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 'u' || e.key === 's')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    const timer = setTimeout(() => setIsLoading(false), 1500);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  const handleViewChange = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-black selection:bg-transparent overflow-x-hidden">
      <div className="noise-bg absolute inset-0 z-0 opacity-10"></div>
      
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-red-marvel font-impact text-6xl italic tracking-widest uppercase animate-pulse"
            >
              BUGLE DIGITAL
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar onSearch={setSearchQuery} onViewChange={handleViewChange} />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'main' ? (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <ProjectGrid onProjectSelect={setSelectedProject} searchQuery={searchQuery} />
            </motion.div>
          ) : (
            <InternalPage key={currentView} view={currentView} onClose={() => handleViewChange('main')} />
          )}
        </AnimatePresence>
      </main>

      <Footer onViewChange={handleViewChange} />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <SecurityOverlay />
      <WhatsAppButton />
    </div>
  );
};

export default App;
