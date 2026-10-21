import React from 'react';

const questions = [
  {
    q: '¿Cuánto cuesta una página web en Lima?',
    a: 'El precio va de S/ 300 a S/ 15 000. Una página simple está cerca del inicio; una tienda o una aplicación con más pantallas sube. El monto exacto depende de la complejidad y se confirma por WhatsApp, sin compromiso.',
  },
  {
    q: '¿Cómo puedo pagar?',
    a: 'Puedes pagar con Yape, Plin o transferencia. Lo coordinamos al cerrar la cotización.',
  },
  {
    q: '¿Cuánto tarda en estar lista?',
    a: 'Una página sencilla suele estar lista en una o dos semanas. Una tienda o una aplicación toma más, según las pantallas y los datos. La fecha se acuerda antes de empezar.',
  },
  {
    q: '¿Incluye dominio y hosting?',
    a: 'El sitio puede quedar publicado y el dominio se puede gestionar en el mismo trabajo. Si ya tienes dominio o hosting, se usa el tuyo. Eso se aclara en la cotización.',
  },
  {
    q: '¿Atiendes solo en Lima?',
    a: 'Estoy en Lima y trabajo a distancia con negocios de todo el Perú. No hace falta reunirnos para empezar.',
  },
  {
    q: '¿Cómo cotizo por WhatsApp?',
    a: 'Escribe al 936 068 781 o usa el botón de esta página. Cuento el negocio y qué necesitas. Atiendo las 24 horas, los 7 días de la semana.',
  },
];

const Faq: React.FC = () => {
  return (
    <section id="preguntas" className="relative z-10 overflow-hidden bg-black px-6 py-24 md:px-8">
      <div className="relative mx-auto max-w-[1400px]">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Antes de escribir</p>
          <h2 className="font-impact text-5xl uppercase italic leading-[0.85] tracking-tighter text-white md:text-7xl">
            Preguntas <span className="text-red-marvel">frecuentes</span>
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {questions.map((item) => (
            <li key={item.q} className="border border-white/10 bg-[#0a0a0a] px-6 py-8">
              <h3 className="font-impact text-2xl uppercase italic tracking-tighter text-white">{item.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
