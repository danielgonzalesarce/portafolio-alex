
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const handleScroll = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const techStack = [
    { name: 'RE', label: 'React' },
    { name: 'NO', label: 'Node.js' },
    { name: 'FI', label: 'Figma' },
    { name: 'GI', label: 'Git' },
    { name: 'TW', label: 'Tailwind' },
    { name: 'TS', label: 'TypeScript' },
    { name: 'JS', label: 'JavaScript' },
    { name: 'NX', label: 'Next.js' },
    { name: 'DB', label: 'Database' },
    { name: 'DK', label: 'Docker' },
  ];

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* 1. Fondo: Texto STACK Monumental */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none select-none overflow-hidden z-0">
        <h1 className="font-impact text-[45vw] tracking-tighter leading-none text-white whitespace-nowrap">
          STACK
        </h1>
      </div>

      {/* 2. Efecto de Luz Roja (Glow) y Anillos */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-[50vw] h-[50vw] bg-red-marvel/10 rounded-full blur-[140px]"
        />
        <div className="w-[80%] aspect-square border border-white/5 rounded-full absolute opacity-20"></div>
        <div className="w-[60%] aspect-square border border-white/10 rounded-full absolute opacity-10"></div>
      </div>

      {/* 3. Contenido Principal */}
      <div className="relative z-30 w-full max-w-[1800px] px-8 flex items-center justify-between">
        
        {/* Etiqueta Izquierda */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="hidden xl:block text-left w-1/4"
        >
          <p className="text-white/40 font-impact text-xl uppercase tracking-tighter">FRONT-END</p>
          <p className="text-white font-impact text-6xl uppercase tracking-tighter leading-none">UI & UX</p>
        </motion.div>

        {/* Título Central */}
        <div className="flex-1 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-white font-impact text-[18vw] md:text-[14rem] lg:text-[18rem] leading-[0.75] tracking-tighter uppercase">
              PORTAFOLIO
            </h2>
            <h3 className="marvel-text-outline font-impact text-[8vw] md:text-[6rem] lg:text-[8rem] leading-none tracking-tighter uppercase -mt-4">
              WEB FULLSTACK
            </h3>
          </motion.div>
        </div>

        {/* Etiqueta Derecha */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="hidden xl:block text-right w-1/4"
        >
          <p className="text-white/40 font-impact text-xl uppercase tracking-tighter">BACK-END</p>
          <p className="text-white font-impact text-6xl uppercase tracking-tighter leading-none">BASES DE DATOS</p>
        </motion.div>
      </div>

      {/* 4. Interfaz Inferior (HUD) */}
      <div className="absolute bottom-0 left-0 right-0 z-40 p-8 md:p-12">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
          
          {/* Info Izquierda */}
          <div className="hidden md:block text-left pb-4">
            <p className="text-red-marvel font-black text-[10px] uppercase tracking-[0.5em] mb-1">Unidad de Desarrollo</p>
            <h4 className="text-white font-impact text-4xl uppercase tracking-tighter">CORE ENGINE V3.0</h4>
          </div>

          {/* Centro: Tech Stack + Botón */}
          <div className="flex flex-col items-center gap-6 w-full md:w-auto">
            <div className="flex gap-2 items-center">
              {techStack.map((tech, i) => (
                <motion.div 
                  key={tech.name}
                  whileHover={{ scale: 1.2, borderColor: '#E23636' }}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all ${
                    i === 0 || i === 3 || i === 6 || i === 9 ? 'border-red-marvel bg-red-marvel/10' : 'border-white/20'
                  }`}
                >
                  <span className="font-impact text-[10px] text-white/80">{tech.name}</span>
                </motion.div>
              ))}
            </div>
            
            <button 
              onClick={handleScroll}
              className="group relative"
            >
              <div className="absolute inset-0 bg-red-marvel blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-red-marvel text-white px-10 md:px-16 py-4 md:py-5 font-impact text-3xl md:text-4xl uppercase tracking-tighter italic skew-x-[-12deg] transition-transform hover:scale-105 active:scale-95 shadow-[10px_10px_0px_rgba(255,255,255,0.1)]">
                EXPLORAR PROYECTOS >
              </div>
            </button>
          </div>

          {/* Info Derecha */}
          <div className="hidden md:block text-right pb-4">
            <p className="text-red-marvel font-black text-[10px] uppercase tracking-[0.5em] mb-1">Estado del Sistema</p>
            <h4 className="text-white font-impact text-4xl uppercase tracking-tighter">TOTALMENTE OPERATIVO</h4>
          </div>

        </div>
      </div>

      {/* Elemento decorativo móvil para etiquetas si no caben */}
      <div className="xl:hidden absolute top-[20%] w-full flex justify-between px-8 z-30 opacity-50">
          <div className="text-[10px] font-black tracking-widest text-white uppercase border-l-2 border-red-marvel pl-2">UI/UX Designer</div>
          <div className="text-[10px] font-black tracking-widest text-white uppercase border-r-2 border-red-marvel pr-2">Fullstack Dev</div>
      </div>
    </section>
  );
};

export default Hero;
