
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Services from './components/Services';
import About from './components/About';
import ProjectGrid from './components/ProjectGrid';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Faq from './components/Faq';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';
import Footer from './components/Footer';
import InternalPage from './components/InternalPage';
import WhatsAppButton from './components/WhatsAppButton';
import { Analytics } from '@vercel/analytics/react';
import { Project } from './types';

export type ViewState = 'main' | 'seguridad' | 'terminos' | 'equipo' | 'historia';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<ViewState>('main');

  const handleViewChange = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-black selection:bg-red-marvel selection:text-white overflow-x-hidden">
      
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,34,34,0.16),transparent_52%)]" />
        <div className="noise-bg absolute inset-0 opacity-[0.03]" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-marvel/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5
            }}
            animate={{ 
              y: [null, '-100%'],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: Math.random() * 20 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>
      
      <div className="noise-bg absolute inset-0 z-0 opacity-10"></div>
      
      <Navbar 
        onSearch={setSearchQuery} 
        onViewChange={handleViewChange} 
      />
      
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
              <Clients />
              <Services />
              <ProjectGrid onProjectSelect={setSelectedProject} searchQuery={searchQuery} />
              <Process />
              <About />
              <Testimonials />
              <Faq />
              <ContactSection />
            </motion.div>
          ) : (
            <InternalPage key={currentView} view={currentView} onClose={() => handleViewChange('main')} onViewChange={handleViewChange} />
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

      <WhatsAppButton />
      <Analytics />
    </div>
  );
};

export default App;
