
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts';

interface DemoRendererProps {
  project: Project;
}

const DemoRenderer: React.FC<DemoRendererProps> = ({ project }) => {
  switch (project.id) {
    case '1': return <CoffeeDemo />;
    case '2': return <RestaurantDemo />;
    case '3': return <BarberDemo />;
    case '4': return <BakeryDemo />;
    default: return <div className="p-20 text-center text-white font-impact uppercase text-4xl">Cargando Terminal...</div>;
  }
};

/**
 * PROJECT 1: COFFEE (ESPRESSO ENGINE)
 * Industrial, technical, red/dark theme.
 */
const CoffeeDemo: React.FC = () => {
  const [grind, setGrind] = useState(18);
  return (
    <div className="bg-[#0a0a0a] min-h-full text-white font-sans selection:bg-red-marvel">
      <nav className="p-8 flex justify-between items-center border-b border-white/5">
        <div className="font-impact text-3xl italic tracking-tighter">ESPRESSO <span className="text-red-marvel">ENGINE</span></div>
        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
          <span>Control</span><span>Flujo</span><span>Sensores</span>
        </div>
      </nav>
      <div className="p-12 flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8">
          <div className="bg-red-marvel/10 text-red-marvel px-4 py-1 inline-block text-[10px] font-black uppercase tracking-widest rounded-sm border border-red-marvel/20">
            Control de Extracción IA
          </div>
          <h2 className="text-8xl font-impact uppercase italic leading-none tracking-tighter">EL ARTE DE LA <br/><span className="text-red-marvel">PRECISIÓN</span></h2>
          <p className="text-zinc-400 max-w-md text-lg leading-relaxed">Ajuste molecular automático basado en el origen del grano y la humedad ambiente.</p>
          <div className="space-y-4 pt-4">
            <div className="flex justify-between font-impact text-xl">
              <span>Molienda: {grind}μm</span>
              <span className="text-red-marvel">ÓPTIMO</span>
            </div>
            <input type="range" min="10" max="40" value={grind} onChange={(e) => setGrind(Number(e.target.value))} className="w-full accent-red-marvel" />
          </div>
          <button className="bg-red-marvel text-white px-12 py-5 font-impact text-3xl italic skew-x-[-10deg] hover:bg-white hover:text-black transition-all">
            CALIBRAR SISTEMA
          </button>
        </div>
        <div className="flex-1 relative">
          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800" className="w-full grayscale border-2 border-red-marvel/30" alt="Coffee" />
          <div className="absolute -bottom-6 -right-6 bg-red-marvel p-8 font-impact text-5xl italic tracking-tighter">98% PURE</div>
        </div>
      </div>
    </div>
  );
};

/**
 * PROJECT 2: RESTAURANTE (GOURMET ANALYTICS)
 * Modern, dashboard-style, high-contrast.
 */
const RestaurantDemo: React.FC = () => {
  const data = [
    { name: 'Lun', val: 120 }, { name: 'Mar', val: 150 }, { name: 'Mie', val: 320 },
    { name: 'Jue', val: 280 }, { name: 'Vie', val: 450 }, { name: 'Sab', val: 510 }
  ];
  return (
    <div className="bg-zinc-950 min-h-full text-white p-12">
      <header className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
        <div>
          <h2 className="text-6xl font-impact uppercase italic tracking-tighter leading-none">GOURMET<br/><span className="text-red-marvel">ANALYTICS</span></h2>
          <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.4em] mt-2">Gestión de Despacho Inteligente</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-zinc-900 px-6 py-2 border border-white/5 text-right">
              <p className="text-[10px] text-zinc-500 font-black">TAQUERÍA CENTRAL</p>
              <p className="font-impact text-2xl text-red-marvel">ONLINE</p>
           </div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-zinc-900/50 p-8 border border-white/5 rounded-lg">
          <p className="font-impact text-2xl mb-8 uppercase tracking-tighter">Flujo Semanal de Órdenes</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                <Bar dataKey="val">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#E23636' : '#333'} />
                  ))}
                </Bar>
                <Tooltip cursor={{ fill: '#222' }} contentStyle={{ background: '#000', border: '1px solid #333' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-8">
           <div className="bg-white text-black p-8 italic font-impact text-5xl tracking-tighter">
              12m <span className="text-sm block font-sans font-black not-italic opacity-50 uppercase tracking-widest">Tiem. Prep</span>
           </div>
           <div className="bg-red-marvel text-white p-8 italic font-impact text-5xl tracking-tighter">
              98% <span className="text-sm block font-sans font-black not-italic opacity-50 uppercase tracking-widest">Satisfacción</span>
           </div>
        </div>
      </div>
    </div>
  );
};

/**
 * PROJECT 3: BARBERÍA (FILO & CONTORNO)
 * Sharp, monochrome, high-fashion vibe.
 */
const BarberDemo: React.FC = () => {
  return (
    <div className="bg-black min-h-full text-white flex flex-col md:flex-row font-impact uppercase italic">
      <div className="w-full md:w-1/2 p-12 flex flex-col justify-between border-r border-white/5">
        <div className="space-y-20">
          <h2 className="text-9xl leading-none tracking-tighter">FILO <br/><span className="text-zinc-600">&</span><br/> CONTORNO</h2>
          <div className="space-y-4">
             <div className="flex justify-between border-b border-white/10 pb-4">
               <span>Corte Clásico</span>
               <span>$45.00</span>
             </div>
             <div className="flex justify-between border-b border-white/10 pb-4 text-red-marvel">
               <span>Diseño Barba Real-Time</span>
               <span>$60.00</span>
             </div>
          </div>
        </div>
        <button className="w-full bg-white text-black py-8 text-4xl hover:bg-red-marvel hover:text-white transition-all transform hover:scale-105 duration-500">
           RESERVAR EXPERIENCIA
        </button>
      </div>
      <div className="w-full md:w-1/2 relative overflow-hidden group">
        <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200" className="h-full w-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-12">
          <p className="text-6xl text-white">ISSUE #03</p>
          <p className="text-zinc-500 text-xs font-sans not-italic font-black tracking-[0.5em] uppercase">The Modern Gentleman</p>
        </div>
      </div>
    </div>
  );
};

/**
 * PROJECT 4: REPOSTERÍA (MAISON D'OR)
 * Gold, luxury, elegant serif typography.
 */
const BakeryDemo: React.FC = () => {
  return (
    <div className="bg-[#0c0c0c] min-h-full text-[#d4af37] font-serif overflow-x-hidden selection:bg-[#d4af37] selection:text-black">
      <nav className="flex justify-between items-center px-12 py-8 border-b border-[#d4af37]/10 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex flex-col">
          <span className="font-impact text-3xl tracking-tighter text-white uppercase italic">MAISON <span className="text-[#d4af37]">D'OR</span></span>
          <span className="text-[9px] tracking-[0.6em] text-white/50 uppercase font-sans font-black">Haute Pâtisserie</span>
        </div>
        <div className="hidden lg:flex gap-12 text-[10px] font-sans font-black uppercase tracking-[0.3em] text-white/70">
          {['Colección', 'Pedidos', 'Nosotros', 'Contacto'].map(link => (
            <a key={link} href="#" className="hover:text-[#d4af37] transition-all relative group">
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4af37] group-hover:w-full transition-all duration-500"></span>
            </a>
          ))}
        </div>
        <div className="w-10 h-10 border border-[#d4af37]/40 rounded-full flex items-center justify-center group cursor-pointer hover:bg-[#d4af37]/10 transition-colors">
           <div className="w-1 h-1 bg-[#d4af37] rounded-full group-hover:scale-150 transition-transform"></div>
        </div>
      </nav>

      <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-12 py-20 gap-20 overflow-hidden">
        {/* Background Decorative Text */}
        <div className="absolute -bottom-20 -left-20 text-[25vw] font-impact text-white opacity-[0.02] pointer-events-none select-none uppercase -rotate-12">LUXE</div>
        
        <div className="flex-1 space-y-10 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="inline-block border border-[#d4af37]/40 px-6 py-1.5 rounded-full text-[10px] font-sans font-black tracking-[0.4em] uppercase text-white/80 mb-8">
              Sabor Artesanal • Herencia Francesa
            </div>
            <h2 className="text-8xl md:text-[11rem] font-impact leading-[0.8] text-[#d4af37] uppercase tracking-tighter italic">
              SABOR<br/><span className="text-white not-italic marvel-text-outline">ETERNO</span>
            </h2>
            <p className="max-w-md text-white/60 text-xl leading-relaxed font-light italic mt-8 border-l border-[#d4af37]/30 pl-8">
              Una experiencia donde el lujo se funde con la tradición para crear momentos de placer absoluto.
            </p>
            <div className="flex gap-8 pt-8 items-center">
              <button className="bg-[#d4af37] text-black px-14 py-5 font-impact text-2xl uppercase italic tracking-tighter rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                Explorar Menú
              </button>
              <div className="flex flex-col text-[10px] font-sans font-black uppercase tracking-widest text-zinc-500">
                 <span>Desde $120.00</span>
                 <span className="text-[#d4af37]">Entregas Prime</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex-1 relative group"
        >
           <div className="absolute inset-0 bg-[#d4af37]/5 blur-[120px] rounded-full animate-pulse"></div>
           <div className="relative aspect-square border-[12px] border-zinc-900 rounded-[50px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
              <img 
                src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                alt="Luxury Pastry"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
           </div>
           
           {/* Animated Badge */}
           <div className="absolute -bottom-12 -left-12 bg-black border-2 border-[#d4af37] w-48 h-48 rounded-full flex items-center justify-center animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#d4af37]">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text font-family="Oswald" font-size="11" letter-spacing="4" font-weight="900" text-transform="uppercase">
                  <textPath xlinkHref="#circlePath">ESTUDIO DE LUJO • NOUVEAU • LUXE • 2026 • </textPath>
                </text>
              </svg>
           </div>
        </motion.div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-12 right-12 flex flex-col items-end gap-6 z-50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="bg-zinc-900/80 backdrop-blur-xl border border-[#d4af37]/20 px-8 py-3 rounded-full text-white text-[10px] font-sans font-black uppercase tracking-[0.4em] shadow-2xl"
        >
          ¿Desea asesoría privada?
        </motion.div>
        <button className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-all transform hover:scale-110 active:scale-90 group">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 16 16" className="group-hover:rotate-12 transition-transform">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
           </svg>
        </button>
      </div>
    </div>
  );
};

export default DemoRenderer;
