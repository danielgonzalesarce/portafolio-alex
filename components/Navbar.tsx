
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewState } from '../App';
import { User as FirebaseUser } from 'firebase/auth';
import { User, LogIn, Shield, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onViewChange: (view: ViewState) => void;
  user: FirebaseUser | null;
  onAuthClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onViewChange, user, onAuthClick }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      setSearchValue('');
      onSearch('');
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
    }
  };

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);

    if (value.length > 0) {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        onViewChange('main');
      }
    }
  };

  const navLinks = [
    { name: 'HOME', view: 'main' as ViewState },
    { name: 'EQUIPO', view: 'equipo' as ViewState },
    { name: 'CONTACTO', action: () => {
      const el = document.getElementById('contacto');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }},
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 pointer-events-none ${isScrolled ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-red-marvel/30 py-3 px-6 md:px-12 shadow-[0_10px_30px_rgba(226,54,54,0.1)]' : 'px-6 md:px-12 py-6 bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="max-w-[1800px] mx-auto flex justify-between items-center pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onViewChange('main')}
          >
            <div className="bg-white text-black px-3 py-1.5 font-impact text-lg md:text-2xl tracking-tighter flex items-center gap-1 transition-transform group-hover:scale-105">
              <span className="font-bold">EL BUGLE</span> 
              <span className="bg-red-marvel text-white px-1.5 italic shadow-[0_0_10px_rgba(226,54,54,0.5)]">DIGITAL</span>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12 bg-black/40 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => link.view ? onViewChange(link.view) : link.action?.()}
                className="text-white/70 hover:text-white font-impact text-xs tracking-[0.2em] transition-all hover:scale-110 uppercase relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-marvel transition-all group-hover:w-full"></span>
              </button>
            ))}
            
            {user?.email === 'daniel.gonzales.a@tecsup.edu.pe' && (
              <button
                onClick={() => onViewChange('comandante')}
                className="text-red-marvel hover:text-white font-impact text-xs tracking-[0.2em] transition-all hover:scale-110 uppercase flex items-center gap-2 relative group"
              >
                <Shield size={14} className="group-hover:animate-pulse" />
                COMANDANTE
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-marvel transition-all group-hover:w-full"></span>
              </button>
            )}
            
            {user ? (
              <button
                onClick={() => onViewChange('cuenta')}
                className="flex items-center gap-2 text-red-marvel hover:text-white font-impact text-xs tracking-[0.2em] transition-all hover:scale-110 uppercase relative group"
              >
                <User size={14} />
                CUENTA
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-marvel transition-all group-hover:w-full"></span>
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 text-white/70 hover:text-white font-impact text-xs tracking-[0.2em] transition-all hover:scale-110 uppercase relative group"
              >
                <LogIn size={14} />
                LOGIN
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-marvel transition-all group-hover:w-full"></span>
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 md:gap-4 relative">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0, x: 20 }}
                  animate={{ width: window.innerWidth < 768 ? '180px' : '320px', opacity: 1, x: 0 }}
                  exit={{ width: 0, opacity: 0, x: 20 }}
                  className="overflow-hidden flex items-center relative"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="BUSCANDO PROYECTOS..."
                    value={searchValue}
                    onChange={handleInputChange}
                    className="w-full bg-black/80 backdrop-blur-xl border border-red-marvel/50 rounded-full text-white font-impact text-[10px] tracking-[0.2em] px-4 py-2.5 outline-none placeholder:text-zinc-500 uppercase shadow-[0_0_15px_rgba(226,54,54,0.2)] focus:border-red-marvel focus:shadow-[0_0_20px_rgba(226,54,54,0.4)] transition-all"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={handleSearchToggle}
              className={`p-2.5 rounded-full transition-all transform hover:scale-110 ${isSearchOpen ? 'bg-red-marvel text-white shadow-[0_0_15px_rgba(226,54,54,0.5)]' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md'}`}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-all"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (link.view) onViewChange(link.view);
                  else link.action?.();
                  setIsMenuOpen(false);
                }}
                className="font-impact text-5xl text-white hover:text-red-marvel my-4 uppercase italic transition-colors"
              >
                {link.name}
              </button>
            ))}

            {user?.email === 'daniel.gonzales.a@tecsup.edu.pe' && (
              <button
                onClick={() => {
                  onViewChange('comandante');
                  setIsMenuOpen(false);
                }}
                className="font-impact text-5xl text-red-marvel hover:text-white my-4 uppercase italic flex items-center gap-4 transition-colors"
              >
                <Shield size={40} />
                COMANDANTE
              </button>
            )}

            {user ? (
              <button
                onClick={() => {
                  onViewChange('cuenta');
                  setIsMenuOpen(false);
                }}
                className="font-impact text-5xl text-red-marvel hover:text-white my-4 uppercase italic transition-colors"
              >
                CUENTA
              </button>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  setIsMenuOpen(false);
                }}
                className="font-impact text-5xl text-white hover:text-red-marvel my-4 uppercase italic transition-colors"
              >
                LOGIN
              </button>
            )}
            
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="mt-12 text-red-marvel font-impact text-xl flex items-center gap-2 hover:text-white transition-colors"
            >
              <X size={24} />
              CERRAR
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
