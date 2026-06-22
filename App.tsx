
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';
import SecurityOverlay from './components/SecurityOverlay';
import Footer from './components/Footer';
import InternalPage from './components/InternalPage';
import WhatsAppButton from './components/WhatsAppButton';
import CustomCursor from './components/CustomCursor';
import SoundManager from './components/SoundManager';
import AuthModal from './components/AuthModal';
import UserAccount from './components/UserAccount';
import CommanderPanel from './components/CommanderPanel';
import { auth, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Project } from './types';

export type ViewState = 'main' | 'archivos' | 'taquilla' | 'imax' | 'clasificados' | 'seguridad' | 'terminos' | 'equipo' | 'cuenta' | 'comandante';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<ViewState>('main');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Sync user to Firestore
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);
          const role = currentUser.email === 'daniel.gonzales.a@tecsup.edu.pe' ? 'admin' : 'user';
          
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              role: role,
              createdAt: serverTimestamp()
            });
          } else if (userSnap.data()?.role !== role) {
            await updateDoc(userRef, { role: role });
          }
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      }
    });

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
      unsubscribe();
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  const handleViewChange = (view: ViewState) => {
    // If trying to access account without being logged in, show modal
    if (view === 'cuenta' && !user) {
      setIsAuthModalOpen(true);
      return;
    }

    // Protection for Commander Panel
    if (view === 'comandante') {
      if (!user || user.email !== 'daniel.gonzales.a@tecsup.edu.pe') {
        // Not authorized, maybe show a security alert or just ignore
        console.warn("Acceso denegado al Panel de Comandante");
        return;
      }
    }

    // Play transition sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2592/2592-preview.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-black selection:bg-transparent overflow-x-hidden cursor-none">
      <CustomCursor />
      <SoundManager />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_70%)]" />
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

      {currentView !== 'comandante' && (
        <Navbar 
          onSearch={setSearchQuery} 
          onViewChange={handleViewChange} 
          user={user}
          onAuthClick={() => setIsAuthModalOpen(true)}
        />
      )}
      
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
              <Testimonials />
              <ContactSection />
            </motion.div>
          ) : currentView === 'cuenta' ? (
            <motion.div
              key="cuenta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <UserAccount />
            </motion.div>
          ) : currentView === 'comandante' ? (
            <CommanderPanel key="comandante" onClose={() => handleViewChange('main')} />
          ) : (
            <InternalPage key={currentView} view={currentView} onClose={() => handleViewChange('main')} />
          )}
        </AnimatePresence>
      </main>

      {currentView !== 'comandante' && <Footer onViewChange={handleViewChange} />}

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
