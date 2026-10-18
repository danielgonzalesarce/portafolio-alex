
import React from 'react';
import { ViewState } from '../App';

interface FooterProps {
  onViewChange: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  const scrollToSection = (id?: string) => {
    const run = () => {
      if (!id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    if ((id && document.getElementById(id)) || (!id && document.getElementById('portfolio'))) {
      run();
      return;
    }

    onViewChange('main');
    window.setTimeout(run, 450);
  };

  return (
    <footer id="footer" className="relative bg-black border-t-8 border-red-marvel py-16 md:py-24 px-6 md:px-8 overflow-hidden">
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <span className="font-impact text-[20vw] leading-none text-white uppercase -rotate-12 translate-x-20 translate-y-20 block">DANIEL</span>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 md:gap-20 mb-16 md:mb-20">
          <div className="max-w-2xl w-full">
            <button 
              onClick={() => scrollToSection()}
              className="bg-white text-black px-4 py-2 font-impact text-3xl md:text-4xl tracking-tighter inline-block mb-6 md:mb-8 skew-x-[-6deg] hover:bg-red-marvel hover:text-white transition-all"
              aria-label="Ir al inicio del portafolio de Daniel Gonzales"
            >
              DANIEL <span className="bg-red-marvel text-white px-2 italic">GONZALES</span>
            </button>
            <h2 className="font-impact text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none tracking-tighter mb-6 md:mb-8">
              ¿TIENES UN<br/><span className="text-red-marvel italic">PROYECTO?</span>
            </h2>
            <p className="text-zinc-400 font-bold text-lg md:text-xl uppercase max-w-lg leading-tight mb-6">
              Diseño y desarrollo web full stack. Construyo páginas, aplicaciones y automatizaciones, de la idea al sitio en línea.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded-full">Desarrollador Web</span>
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded-full">Diseño Web</span>
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded-full">Portafolio</span>
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded-full">SEO</span>
            </div>
          </div>

          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-20 w-full lg:w-auto" aria-label="Navegación del pie de página">
            <div>
              <h3 className="text-red-marvel font-black text-xs uppercase tracking-[0.5em] mb-6 md:mb-8 underline decoration-2 underline-offset-8">Navegación</h3>
              <ul className="space-y-4 font-impact text-2xl md:text-3xl uppercase text-white tracking-tighter">
                <li><button onClick={() => scrollToSection()} className="hover:text-red-marvel transition-colors italic">Inicio</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-red-marvel transition-colors italic">Proyectos</button></li>
                <li><button onClick={() => scrollToSection('servicios')} className="hover:text-red-marvel transition-colors italic">Servicios</button></li>
                <li><button onClick={() => scrollToSection('sobre-mi')} className="hover:text-red-marvel transition-colors italic">Sobre mí</button></li>
                <li><button onClick={() => scrollToSection('contacto')} className="hover:text-red-marvel transition-colors italic">Contacto</button></li>
              </ul>
            </div>
            <address className="not-italic">
              <h3 className="text-red-marvel font-black text-xs uppercase tracking-[0.5em] mb-6 md:mb-8 underline decoration-2 underline-offset-8">Contacto</h3>
              <ul className="space-y-4 font-impact text-xl md:text-2xl uppercase text-zinc-400 tracking-tighter">
                <li>Lima, Perú</li>
                <li>
                  <a href="https://wa.me/51936068781?text=Hola%20Daniel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white hover:text-red-marvel transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true"><path d="M20 11.5A8.5 8.5 0 0 1 7.1 18.8L3.5 20l1.3-3.5A8.5 8.5 0 1 1 20 11.5Zm-8.5 6.3c.4 0 .9 0 1.3-.1.4-.1.8-.2 1.1-.4l.2.1 2.2.6-.6-2.1.1-.2c.2-.4.4-.8.5-1.2.1-.4.1-.9.1-1.3A6.3 6.3 0 1 0 11.5 17.8Z"/></svg>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/daniel-alexander-gonzales-arce-537576383" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true"><path d="M6.5 9H4V20h2.5V9ZM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4ZM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H11V9h2.4v1.5c.4-.7 1.3-1.8 3.2-1.8 2.3 0 4 1.5 4 4.8V20Z"/></svg>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </address>
          </nav>
        </div>

        <div className="pt-8 md:pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
           <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
              <span className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.5em]">© 2026 Daniel Gonzales. Todos los derechos reservados.</span>
              <a href="https://danielgonzalesdev.com" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white">Sitio web por Daniel Gonzales · Desarrollador web en Lima, Perú</a>
           </div>
           
           <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center text-zinc-500">
              <span className="text-[9px] font-black uppercase tracking-widest italic">Desarrollador Web Full Stack • Lima, Perú</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
