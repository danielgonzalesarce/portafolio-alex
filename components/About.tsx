import React from 'react';
import TechStack from './TechStack';

const WA = 'https://wa.me/51936068781?text=Hola%20Daniel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto';
const LINKEDIN = 'https://www.linkedin.com/in/daniel-alexander-gonzales-arce-537576383';

const RedRays: React.FC = () => (
  <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="about-ray" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff2222" stopOpacity="0" />
        <stop offset="45%" stopColor="#ff2222" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#ff2222" stopOpacity="0" />
      </linearGradient>
      <filter id="about-ray-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#about-ray-glow)" stroke="url(#about-ray)" fill="none">
      <path d="M430 -20 L250 760" strokeWidth="1.4" />
      <path d="M400 -20 L210 760" strokeWidth="2.2" />
      <path d="M360 -20 L160 760" strokeWidth="1" />
      <path d="M310 -20 L90 760" strokeWidth="1.6" />
      <path d="M250 -40 L20 760" strokeWidth="1" opacity="0.7" />
      <path d="M-20 80 L420 280" strokeWidth="1.2" />
      <path d="M-20 150 L420 360" strokeWidth="0.8" opacity="0.8" />
      <path d="M-30 520 L430 400" strokeWidth="1.3" />
    </g>
    <g fill="#ff2222">
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={28 + col * 14} cy={36 + row * 14} r={col % 2 === 0 ? 1.3 : 0.7} opacity={0.35 + (col % 3) * 0.15} />
        ))
      )}
      <circle cx="318" cy="120" r="2" opacity="0.8" />
      <circle cx="346" cy="168" r="1.4" opacity="0.6" />
      <circle cx="300" cy="210" r="1.2" opacity="0.5" />
      <path d="M292 96 V168 H360" stroke="#ff2222" strokeWidth="1" fill="none" opacity="0.7" />
    </g>
  </svg>
);

const WhatsAppLogo: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 skew-x-[8deg] fill-current" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const LinkedInLogo: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 skew-x-[8deg] fill-current" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const About: React.FC = () => {
  return (
    <section id="sobre-mi" className="relative z-10 overflow-hidden bg-black px-6 py-24 md:px-8">
      <div className="relative mx-auto max-w-[1400px]">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Sobre mí</p>
          <h2 className="font-impact text-5xl uppercase italic leading-[0.85] tracking-tighter text-white md:text-7xl">
            Daniel<br /><span className="text-red-marvel">Gonzales</span>
          </h2>
        </header>

        <article className="grid grid-cols-1 border border-white/10 bg-[#0a0a0a] lg:grid-cols-[minmax(0,380px)_1fr]">
          <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden border-b border-white/10 bg-black p-6 lg:min-h-full lg:border-b-0 lg:border-r">
            <RedRays />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,34,34,0.22),transparent_58%)]" />
            <img
              src="/logos/daniel-imagen.png"
              alt="Daniel Gonzales"
              className="relative z-10 h-auto w-full max-w-[300px] rounded-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
            <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
              Soy Daniel Gonzales, desarrollador full stack en Lima. Creo páginas web, aplicaciones a medida y automatizaciones con IA para negocios que quieren verse profesionales y atraer más clientes.
            </p>
            <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
              Trabajo cada proyecto de principio a fin: escucho lo que necesitas, lo diseño, lo desarrollo y lo dejo publicado y funcionando. Desarrollo sitios web para negocios reales, como Aceros Marín, y construyo mis propias plataformas, como Lumina Hotel & Spa, un sistema de gestión para hoteles.
            </p>
            <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
              Mi stack principal es Next.js, TypeScript y Supabase, así que lo que construyo es rápido, escalable y fácil de mantener.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-marvel px-5 py-3 font-impact text-sm uppercase italic tracking-tighter text-white skew-x-[-8deg]"
              >
                <WhatsAppLogo />
                <span className="skew-x-[8deg]">Escríbeme por WhatsApp</span>
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white px-5 py-3 font-impact text-sm uppercase italic tracking-tighter text-black skew-x-[-8deg]"
              >
                <LinkedInLogo />
                <span className="skew-x-[8deg]">LinkedIn</span>
              </a>
            </div>
            <TechStack />
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;
