
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewState } from '../App';

interface NavbarProps {
  onSearch: (query: string) => void;
  onViewChange: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onViewChange }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

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
    { name: 'ARCHIVOS', view: 'archivos' as ViewState },
    { name: 'TAQUILLA', view: 'taquilla' as ViewState },
    { name: 'IMAX', view: 'imax' as ViewState },
    { name: 'CLASIFICADOS', view: 'clasificados' as ViewState },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] px-6 md:px-12 py-4 md:py-6 pointer-events-none">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onViewChange('main')}
          >
            <div className="bg-white text-black px-2 py-1 font-impact text-lg md:text-2xl tracking-tighter flex items-center gap-1">
              <span className="font-bold">EL BUGLE</span> 
              <span className="bg-red-marvel text-white px-1 italic">DIGITAL</span>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => onViewChange(link.view)}
                className="text-white/60 hover:text-white font-impact text-xs tracking-[0.2em] transition-colors uppercase"
              >
                {link.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 relative">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: window.innerWidth < 768 ? '160px' : '320px', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden flex items-center relative"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="BUSCANDO..."
                    value={searchValue}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 backdrop-blur-md border-b-2 border-red-marvel text-white font-impact text-[10px] tracking-[0.2em] px-3 py-2 outline-none placeholder:text-zinc-600 uppercase"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={handleSearchToggle}
              className={`p-2 rounded-full transition-all transform hover:scale-110 ${isSearchOpen ? 'bg-red-marvel text-white' : 'bg-white/5 text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSearchOpen ? "M6 18L18 6M6 6l12 12" : "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"} />
              </svg>
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white">
              <div className="w-6 h-0.5 bg-white mb-1.5"></div>
              <div className="w-6 h-0.5 bg-white mb-1.5"></div>
              <div className="w-6 h-0.5 bg-white"></div>
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
                  onViewChange(link.view);
                  setIsMenuOpen(false);
                }}
                className="font-impact text-5xl text-white hover:text-red-marvel my-4 uppercase italic"
              >
                {link.name}
              </button>
            ))}
            <button onClick={() => setIsMenuOpen(false)} className="mt-12 text-red-marvel font-impact text-xl">CERRAR</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
