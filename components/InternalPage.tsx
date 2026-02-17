
import React from 'react';
import { motion } from 'framer-motion';
import { ViewState } from '../App';

interface InternalPageProps {
  view: ViewState;
  onClose: () => void;
}

const InternalPage: React.FC<InternalPageProps> = ({ view, onClose }) => {
  const renderContent = () => {
    switch (view) {
      case 'equipo':
        return (
          <div className="space-y-12 md:space-y-20">
            <h2 className="text-7xl md:text-[10rem] font-impact uppercase italic leading-none text-white tracking-tighter">
              NUESTRO <span className="text-red-marvel">STAFF</span>
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start bg-zinc-900/40 p-8 md:p-12 border border-white/5 rounded-3xl relative overflow-hidden group">
               {/* Decorative background element */}
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <span className="font-impact text-9xl text-white italic">EDITOR</span>
               </div>

               {/* Photo Section */}
               <div className="relative w-full max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-red-marvel/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="relative h-full w-full rounded-2xl overflow-hidden border-4 border-zinc-800 group-hover:border-red-marvel transition-colors bg-zinc-950">
                     {/* Placeholder loading effect */}
                     <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <div className="w-full h-full bg-[radial-gradient(circle,rgba(226,54,54,0.2)_1px,transparent_1px)] bg-[size:20px_20px] animate-[pulse_3s_infinite]"></div>
                     </div>
                     
                     <img 
                        src="https://github.com/danielgonzalesarce.png" 
                        alt="Daniel Gonzales Arce" 
                        className="relative z-10 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop";
                        }}
                     />
                     
                     {/* HUD Overlay on image */}
                     <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none z-20"></div>
                     <div className="absolute bottom-4 left-4 z-30 bg-red-marvel text-white text-[8px] font-black px-2 py-1 uppercase tracking-widest italic shadow-xl">
                        ID: DG-001
                     </div>
                  </div>
               </div>

               {/* Info Section */}
               <div className="flex-1 space-y-8 relative z-10 text-center lg:text-left">
                  <div>
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                      <span className="w-2 h-2 bg-red-marvel rounded-full animate-pulse"></span>
                      <span className="text-red-marvel font-black text-xs uppercase tracking-[0.5em] block">AUTORIZADO: ACCESO NIVEL 5</span>
                    </div>
                    <h3 className="text-5xl md:text-7xl font-impact text-white uppercase italic leading-none tracking-tighter">
                      DANIEL ALEXANDER <br/>GONZALES ARCE
                    </h3>
                    <p className="text-zinc-500 font-impact text-2xl uppercase mt-2 tracking-tighter">EDITOR EN JEFE / FULLSTACK ARCHITECT</p>
                  </div>

                  <div className="space-y-4 max-w-xl mx-auto lg:mx-0">
                    <p className="text-zinc-400 font-bold text-sm leading-relaxed uppercase">
                      Estratega digital especializado en la construcción de infraestructuras visuales de alto impacto. Responsable de la visión tecnológica de "El Bugle Digital" y del despliegue de sistemas SaaS escalables.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
                       {['Liderazgo', 'Visión 360', 'Código Balístico', 'Diseño Élite'].map(tag => (
                         <span key={tag} className="bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-black uppercase text-zinc-500 tracking-widest hover:text-red-marvel hover:border-red-marvel/30 transition-colors cursor-default">{tag}</span>
                       ))}
                    </div>
                  </div>

                  <div className="pt-8 flex flex-col md:flex-row items-center gap-6 justify-center lg:justify-start">
                     <button 
                        onClick={() => window.open('https://www.linkedin.com/in/daniel-alexander-gonzales-arce-537576383/', '_blank')}
                        className="bg-white text-black px-10 py-4 font-impact text-2xl uppercase italic skew-x-[-12deg] hover:bg-red-marvel hover:text-white transition-all transform hover:scale-105 flex items-center gap-3 shadow-[10px_10px_0px_rgba(255,255,255,0.1)] active:translate-y-1"
                     >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        MI PERFIL PROFESIONAL
                     </button>
                     
                     <div className="text-left font-mono text-[9px] text-zinc-600 space-y-1 border-l border-zinc-800 pl-6">
                        <p>ID_TAG: BUGLE-01-DGA</p>
                        <p>STATUS: ACTIVE_DEVOLOPER</p>
                        <p>LOCATION: LIMA, PE / GLOBAL</p>
                        <p>LAST_SYNC: {new Date().toLocaleDateString()}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'archivos':
        return (
          <div className="space-y-20">
            <h2 className="text-8xl md:text-[12rem] font-impact uppercase italic leading-none text-white tracking-tighter">
              LOS <span className="text-red-marvel">ARCHIVOS</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-zinc-900 border-l-4 border-red-marvel p-8 group hover:bg-zinc-800 transition-colors">
                  <span className="text-red-marvel font-black text-[10px] tracking-[0.4em] mb-4 block">EXPEDIENTE #BUG-{i}00X</span>
                  <h3 className="text-3xl font-impact text-white uppercase mb-4 italic">Operación: {['Aurora', 'Nebula', 'Cortex', 'Vortex', 'Sentinel', 'Titan'][i-1]}</h3>
                  <p className="text-zinc-500 text-sm font-bold leading-relaxed mb-6">INTELIGENCIA: Desarrollo de arquitectura escalable para entorno de alto tráfico. Implementación exitosa de sistemas redundantes.</p>
                  <div className="h-1 w-0 group-hover:w-full bg-red-marvel transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'taquilla':
        return (
          <div className="space-y-20">
            <h2 className="text-8xl md:text-[12rem] font-impact uppercase italic leading-none text-white tracking-tighter">
              LA <span className="text-red-marvel">TAQUILLA</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="bg-white text-black p-12 italic">
                  <h3 className="text-6xl font-impact uppercase leading-none mb-6">RÉCORD DE<br/>NOTICIAS</h3>
                  <div className="text-9xl font-impact tracking-tighter mb-4">+350%</div>
                  <p className="text-xl font-bold uppercase tracking-tight border-t-4 border-black pt-4">Incremento en Conversión Digital para Clientes de Portada</p>
               </div>
               <div className="bg-red-marvel text-white p-12 italic">
                  <h3 className="text-6xl font-impact uppercase leading-none mb-6">SOLD OUT<br/>CAMPAIGNS</h3>
                  <div className="text-9xl font-impact tracking-tighter mb-4">98/100</div>
                  <p className="text-xl font-bold uppercase tracking-tight border-t-4 border-white pt-4">Tasa de éxito en lanzamiento de MVPs y Productos Visuales</p>
               </div>
            </div>
          </div>
        );
      case 'imax':
        return (
          <div className="space-y-20">
            <h2 className="text-8xl md:text-[12rem] font-impact uppercase italic leading-none text-white tracking-tighter">
              TEC. <span className="text-red-marvel">IMAX</span>
            </h2>
            <div className="flex flex-col gap-4">
               {['REACT 19', 'TYPESCRIPT', 'FRAMER MOTION', 'TAILWIND CSS', 'GOOGLE GENAI', 'NODE.JS'].map((tech, idx) => (
                 <div key={tech} className="flex items-center gap-10 border-b border-white/10 py-8 group">
                    <span className="text-zinc-700 font-impact text-4xl">0{idx + 1}</span>
                    <h3 className="text-7xl md:text-9xl font-impact text-white uppercase tracking-tighter italic group-hover:text-red-marvel transition-colors cursor-default">{tech}</h3>
                    <div className="hidden lg:block h-px flex-1 bg-white/5"></div>
                    <span className="text-[10px] font-black tracking-widest text-zinc-600 uppercase">Estado: Optimizado</span>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'clasificados':
        return (
          <div className="space-y-20">
             <div className="flex justify-between items-end border-b-4 border-white pb-6">
                <h2 className="text-8xl font-impact uppercase italic leading-none text-white tracking-tighter">CLASIFICADOS</h2>
                <span className="text-zinc-500 font-impact text-2xl uppercase">Edición 2026</span>
             </div>
             <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
                {[
                  { t: 'SE BUSCA: MARCAS ATREVIDAS', d: 'Buscamos socios para transformar identidades digitales aburridas en imperios visuales. Requisito: No tener miedo al éxito.' },
                  { t: 'SERVICIO: CÓDIGO BALÍSTICO', d: 'Desarrollo Fullstack con tiempos de entrega de precisión quirúrgica. Garantía de por vida en arquitectura.' },
                  { t: 'AVISO: IA GENERATIVA', d: 'Entrenamos agentes Gemini para automatizar tu flujo de trabajo. El futuro es ahora, no te quedes en el pasado.' },
                  { t: 'VENDO: INTERFACES DE LUJO', d: 'Diseños UI que hacen que la competencia se vea obsoleta. Alta fidelidad garantizada.' },
                  { t: 'URGENTE: TRANSFORMACIÓN 360', d: 'Migración de legacy apps a ecosistemas modernos. Sin pérdida de datos, solo ganancia de velocidad.' },
                  { t: 'TRATO DIRECTO: EL BUGLE', d: 'Consultoría personalizada para startups en etapa de escalado. Precios competitivos, resultados de portada.' },
                ].map((item, i) => (
                  <div key={i} className="break-inside-avoid border border-white/20 p-6 bg-zinc-900/30">
                     <h4 className="font-impact text-2xl text-red-marvel uppercase mb-4 italic underline decoration-2">{item.t}</h4>
                     <p className="text-sm font-bold text-zinc-300 uppercase leading-snug">{item.d}</p>
                     <p className="mt-4 text-[10px] text-zinc-500 font-black tracking-widest italic">CONTACTO: +51 936068781</p>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'seguridad':
      case 'terminos':
        return (
          <div className="max-w-4xl mx-auto space-y-12 py-20">
             <div className="bg-red-marvel text-white p-4 font-impact text-2xl inline-block skew-x-[-10deg] uppercase italic mb-10">
                PROTOCOLO DE ACCESO: {view === 'seguridad' ? 'SECURITY_V4' : 'TERMS_OF_USE'}
             </div>
             <h2 className="text-6xl font-impact text-white uppercase italic tracking-tighter">
               {view === 'seguridad' ? 'POLÍTICAS DE SEGURIDAD Y PRIVACIDAD' : 'TÉRMINOS Y CONDICIONES DEL SERVICIO'}
             </h2>
             <div className="space-y-8 font-mono text-zinc-400 text-sm leading-relaxed uppercase">
                <p>[SISTEMA] Iniciando despliegue de políticas corporativas Bugle Digital v2026...</p>
                <p>1. PROTECCIÓN DE DATOS: Todos los activos compartidos en esta terminal están bajo cifrado de grado militar AES-256. No recolectamos datos personales sin el consentimiento explícito del agente.</p>
                <p>2. PROPIEDAD INTELECTUAL: El código fuente, los diseños y la marca Bugle Digital son propiedad exclusiva. La replicación sin licencia será tratada como brecha de seguridad.</p>
                <p>3. USO DE LA TERMINAL: Se prohíbe el uso de scripts automatizados para la extracción de datos (scraping) fuera de los canales autorizados por la API.</p>
                <p>4. LIMITACIÓN DE RESPONSABILIDAD: No nos hacemos responsables de las ganancias explosivas que tu negocio pueda experimentar tras contratar nuestros servicios.</p>
                <p>--- FIN DEL COMUNICADO ---</p>
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="min-h-screen pt-40 pb-20 px-8 bg-black relative"
    >
      <div className="max-w-[1800px] mx-auto relative z-10">
        <button 
          onClick={onClose}
          className="mb-12 flex items-center gap-4 text-zinc-500 hover:text-red-marvel transition-colors font-impact text-xl uppercase italic group"
        >
          <span className="transform group-hover:-translate-x-2 transition-transform">←</span> 
          VOLVER AL MENÚ PRINCIPAL
        </button>
        {renderContent()}
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none select-none overflow-hidden z-0">
         <span className="font-impact text-[50vh] text-white leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">DEPARTAMENTOS</span>
      </div>
    </motion.section>
  );
};

export default InternalPage;
