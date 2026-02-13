
import React from 'react';
import { ViewState } from '../App';

interface FooterProps {
  onViewChange: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="footer" className="relative bg-black border-t-8 border-red-marvel py-24 px-8 overflow-hidden">
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <h2 className="font-impact text-[20vw] leading-none text-white uppercase -rotate-12 translate-x-20 translate-y-20">BUGLE</h2>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-20">
          <div className="max-w-2xl">
            <button 
              onClick={() => onViewChange('main')}
              className="bg-white text-black px-4 py-2 font-impact text-4xl tracking-tighter inline-block mb-8 skew-x-[-6deg] hover:bg-red-marvel hover:text-white transition-all"
            >
              EL BUGLE <span className="bg-red-marvel text-white px-2 italic">DIGITAL</span>
            </button>
            <h3 className="font-impact text-7xl md:text-8xl text-white uppercase leading-none tracking-tighter mb-8">
              ¿QUIERES TU NEGOCIO<br/><span className="text-red-marvel italic">EN PRIMERA PLANA?</span>
            </h3>
            <p className="text-zinc-500 font-bold text-xl uppercase max-w-lg leading-tight">
              Desde café artesanal hasta barbería de élite, construimos la presencia digital que domina el ciclo de noticias.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-20">
            <div>
              <p className="text-red-marvel font-black text-xs uppercase tracking-[0.5em] mb-8 underline decoration-2 underline-offset-8">Departamentos</p>
              <ul className="space-y-4 font-impact text-3xl uppercase text-white tracking-tighter">
                <li><button onClick={() => onViewChange('archivos')} className="hover:text-red-marvel transition-colors italic">Los Archivos</button></li>
                <li><button onClick={() => onViewChange('taquilla')} className="hover:text-red-marvel transition-colors italic">Taquilla</button></li>
                <li><button onClick={() => onViewChange('imax')} className="hover:text-red-marvel transition-colors italic">Tecnología IMAX</button></li>
                <li><button onClick={() => onViewChange('clasificados')} className="hover:text-red-marvel transition-colors italic">Clasificados</button></li>
              </ul>
            </div>
            <div>
              <p className="text-red-marvel font-black text-xs uppercase tracking-[0.5em] mb-8 underline decoration-2 underline-offset-8">Terminal Central</p>
              <ul className="space-y-4 font-impact text-2xl uppercase text-zinc-400 tracking-tighter">
                <li>Ciudad de México, MX</li>
                <li>Línea Segura: 01-BUGLE-PRO</li>
                <li><button onClick={() => onViewChange('seguridad')} className="hover:text-white">Protocolos de Seguridad</button></li>
                <li><button onClick={() => onViewChange('terminos')} className="hover:text-white">Términos del Servicio</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-10">
              <span className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.5em]">© 2026 BUGLE CORP</span>
              <span className="text-[10px] font-black uppercase text-red-marvel tracking-[0.5em] animate-pulse">Cifrado: AES-256 Activo</span>
           </div>
           
           <div className="flex gap-8 items-center text-zinc-500">
              <span className="text-[9px] font-black uppercase tracking-widest italic">Prensa Independiente • Vigilancia Digital • Vanguardia Visual</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
