import React from 'react';

const services = [
  {
    n: '01',
    title: 'Páginas web y landing pages',
    text: 'Sitios claros para presentar un negocio, una oferta o una campaña, listos para publicarse.',
  },
  {
    n: '02',
    title: 'Aplicaciones web a medida',
    text: 'Productos con Next.js, TypeScript y Supabase: cuentas, datos y flujos que el negocio usa de verdad.',
  },
  {
    n: '03',
    title: 'Apps móviles',
    text: 'Aplicaciones para Android, pensadas para el uso diario y conectadas con el resto del sistema.',
  },
  {
    n: '04',
    title: 'Automatización e integraciones con IA',
    text: 'WhatsApp, mapas y tareas repetidas conectadas, con IA donde ahorra tiempo de verdad.',
  },
];

const Services: React.FC = () => {
  return (
    <section id="servicios" className="relative z-10 overflow-hidden bg-black px-6 py-24 md:px-8">
      <div className="relative mx-auto max-w-[1400px]">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Servicios</p>
          <h2 className="font-impact text-5xl uppercase italic leading-[0.85] tracking-tighter text-white md:text-7xl">
            Lo que puedo<br /><span className="text-red-marvel">construir</span>
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.n} className="border border-white/10 bg-[#0a0a0a] px-6 py-8">
              <p className="font-impact text-4xl italic leading-none text-red-marvel">{service.n}</p>
              <h3 className="mt-6 font-impact text-2xl uppercase italic tracking-tighter text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.text}</p>
            </li>
          ))}
        </ul>
        <a
          href="https://wa.me/51936068781?text=Hola%20Daniel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block bg-red-marvel px-6 py-3 font-impact text-lg uppercase italic tracking-tighter text-white skew-x-[-8deg]"
        >
          Cotiza tu proyecto
        </a>
      </div>
    </section>
  );
};

export default Services;
