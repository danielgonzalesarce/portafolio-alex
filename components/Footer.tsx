
import React from 'react';
import { ViewState } from '../App';

interface FooterProps {
  onViewChange: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="footer" className="relative bg-black border-t-8 border-red-marvel py-16 md:py-24 px-6 md:px-8 overflow-hidden">
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <span className="font-impact text-[20vw] leading-none text-white uppercase -rotate-12 translate-x-20 translate-y-20 block">BUGLE</span>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 md:gap-20 mb-16 md:mb-20">
          <div className="max-w-2xl w-full">
            <button 
              onClick={() => onViewChange('main')}
              className="bg-white text-black px-4 py-2 font-impact text-3xl md:text-4xl tracking-tighter inline-block mb-6 md:mb-8 skew-x-[-6deg] hover:bg-red-marvel hover:text-white transition-all"
              aria-label="Ir a la página principal de El Bugle Digital"
            >
              EL BUGLE <span className="bg-red-marvel text-white px-2 italic">DIGITAL</span>
            </button>
            <h2 className="font-impact text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none tracking-tighter mb-6 md:mb-8">
              ¿QUIERES TU NEGOCIO<br/><span className="text-red-marvel italic">EN PRIMERA PLANA?</span>
            </h2>
            <p className="text-zinc-400 font-bold text-lg md:text-xl uppercase max-w-lg leading-tight mb-6">
              Desarrollo Web, Diseño UI/UX y Soluciones Digitales. Desde café artesanal hasta barbería de élite, construimos la presencia digital que domina el ciclo de noticias.
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
                <li><button onClick={() => onViewChange('main')} className="hover:text-red-marvel transition-colors italic">Inicio</button></li>
                <li><button onClick={() => onViewChange('equipo')} className="hover:text-red-marvel transition-colors italic">Nuestro Equipo</button></li>
                <li><button onClick={() => onViewChange('imax')} className="hover:text-red-marvel transition-colors italic">Tecnología IMAX</button></li>
              </ul>
            </div>
            <address className="not-italic">
              <h3 className="text-red-marvel font-black text-xs uppercase tracking-[0.5em] mb-6 md:mb-8 underline decoration-2 underline-offset-8">Terminal Central</h3>
              <ul className="space-y-4 font-impact text-xl md:text-2xl uppercase text-zinc-400 tracking-tighter">
                <li>Ciudad de México, MX</li>
                <li>Línea Segura: 01-BUGLE-PRO</li>
                <li><button onClick={() => onViewChange('seguridad')} className="hover:text-white">Protocolos de Seguridad</button></li>
                <li><button onClick={() => onViewChange('terminos')} className="hover:text-white">Términos del Servicio</button></li>
              </ul>
            </address>
          </nav>
        </div>

        <div className="pt-8 md:pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
           <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
              <span className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.5em]">© 2026 BUGLE CORP</span>
              <span className="text-[10px] font-black uppercase text-red-marvel tracking-[0.5em] animate-pulse">Cifrado: AES-256 Activo</span>
           </div>
           
           <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center text-zinc-500">
              <span className="text-[9px] font-black uppercase tracking-widest italic">Prensa Independiente • Vigilancia Digital • Vanguardia Visual</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
