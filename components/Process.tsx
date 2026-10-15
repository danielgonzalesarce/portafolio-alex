import React from 'react';

const steps = [
  {
    n: '01',
    title: 'Conversación',
    text: 'Me escribes por WhatsApp. Escucho el encargo y lo que el negocio necesita resolver.',
  },
  {
    n: '02',
    title: 'Alcance',
    text: 'Definimos qué se construye, el plazo y el precio antes de escribir código.',
  },
  {
    n: '03',
    title: 'Construcción',
    text: 'Diseño y desarrollo con el mismo criterio que ves en los proyectos de esta portada.',
  },
  {
    n: '04',
    title: 'Publicación',
    text: 'El sitio queda en línea, con un enlace para que el cliente lo use y lo comparta.',
  },
];

const Process: React.FC = () => {
  return (
    <section id="proceso" className="relative z-10 overflow-hidden bg-black px-6 py-24 md:px-8">
      <div className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-red-marvel/15 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px]">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Mi proceso</p>
          <h2 className="font-impact text-5xl uppercase italic leading-[0.85] tracking-tighter text-white md:text-7xl">
            De la conversación<br /><span className="text-red-marvel">a la publicación</span>
          </h2>
        </header>

        <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <li key={step.n} className="border border-white/10 bg-[#0a0a0a] px-6 py-8">
              <p className="font-impact text-4xl italic leading-none text-red-marvel">{step.n}</p>
              <h3 className="mt-6 font-impact text-2xl uppercase italic tracking-tighter text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
