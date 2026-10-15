
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewState } from '../App';
import { Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onViewChange: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onViewChange }) => {
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
      if (document.getElementById('portfolio')) {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onViewChange('main');
        window.setTimeout(() => {
          document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
        }, 450);
      }
    }
  };

  const scrollToSection = (id?: string) => {
    const run = () => {
      if (!id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    if (!id && document.getElementById('portfolio')) {
      run();
      return;
    }

    if (id && document.getElementById(id)) {
      run();
      return;
    }

    onViewChange('main');
    window.setTimeout(run, 450);
  };

  const waLink = 'https://wa.me/51936068781?text=Hola%20Daniel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto';

  const WhatsAppMark = ({ className }: { className: string }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );

  const navLinks: { name: string; id?: string }[] = [
    { name: 'HOME' },
    { name: 'PROYECTOS', id: 'portfolio' },
    { name: 'SERVICIOS', id: 'servicios' },
    { name: 'SOBRE MÍ', id: 'sobre-mi' },
    { name: 'CONTACTO', id: 'contacto' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 pointer-events-none ${isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-red-marvel/30 py-3 px-6 md:px-12 shadow-[0_10px_30px_rgba(255,34,34,0.1)]' : 'px-6 md:px-12 py-6 bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="max-w-[1800px] mx-auto flex justify-between items-center pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollToSection()}
          >
            <div className="flex flex-col items-start gap-1">
              <div className="bg-white text-black px-2 py-1 font-impact text-base tracking-tighter flex items-center gap-1 transition-transform group-hover:scale-105 sm:px-3 sm:py-1.5 sm:text-lg md:text-2xl">
                <span className="font-bold">DANIEL</span>
                <span className="bg-red-marvel text-white px-1.5 italic shadow-[0_0_10px_rgba(255,34,34,0.5)]">GONZALES</span>
              </div>
              <span className="hidden font-impact text-[9px] uppercase tracking-[0.22em] text-white/60 sm:block md:text-[10px]">Desarrollador Web Full Stack</span>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12 bg-black/40 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-white/70 hover:text-white font-impact text-xs tracking-[0.2em] transition-all hover:scale-110 uppercase relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-marvel transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-1.5 bg-red-marvel px-4 py-2 font-impact text-xs uppercase italic tracking-tighter text-white skew-x-[-8deg] lg:inline-flex"
          >
            <WhatsAppMark className="h-3.5 w-3.5 shrink-0 skew-x-[8deg] fill-current" />
            <span className="skew-x-[8deg]">Contáctame</span>
          </a>
          
          <div className="flex items-center gap-2 md:gap-4 relative">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 bg-red-marvel px-2.5 py-1.5 font-impact text-[10px] uppercase italic tracking-tighter text-white skew-x-[-8deg] sm:px-4 sm:text-xs lg:hidden"
            >
              <WhatsAppMark className="h-3 w-3 shrink-0 skew-x-[8deg] fill-current" />
              <span className="skew-x-[8deg]">Contáctame</span>
            </a>
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
                    className="w-full bg-black/80 backdrop-blur-xl border border-red-marvel/50 rounded-full text-white font-impact text-[10px] tracking-[0.2em] px-4 py-2.5 outline-none placeholder:text-zinc-500 uppercase shadow-[0_0_15px_rgba(255,34,34,0.2)] focus:border-red-marvel focus:shadow-[0_0_20px_rgba(255,34,34,0.4)] transition-all"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={handleSearchToggle}
              className={`p-2.5 rounded-full transition-all transform hover:scale-110 ${isSearchOpen ? 'bg-red-marvel text-white shadow-[0_0_15px_rgba(255,34,34,0.5)]' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md'}`}
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
                  scrollToSection(link.id);
                  setIsMenuOpen(false);
                }}
                className="font-impact text-5xl text-white hover:text-red-marvel my-4 uppercase italic transition-colors"
              >
                {link.name}
              </button>
            ))}

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 bg-red-marvel px-8 py-4 font-impact text-3xl uppercase italic tracking-tighter text-white skew-x-[-8deg]"
            >
              <WhatsAppMark className="h-8 w-8 shrink-0 skew-x-[8deg] fill-current" />
              <span className="skew-x-[8deg]">Contáctame</span>
            </a>

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
