import React from 'react';
import { showTestimonials, TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  const visible = showTestimonials && TESTIMONIALS.some((item) => !item.quote.startsWith('[Pendiente'));
  if (!visible) return null;

  return (
    <section id="testimonios" className="relative z-10 overflow-hidden bg-black px-6 py-24 md:px-8">
      <div className="relative mx-auto max-w-[1400px]">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Testimonios</p>
          <h2 className="font-impact text-5xl uppercase italic leading-[0.85] tracking-tighter text-white md:text-7xl">
            Lo que dicen<br /><span className="text-red-marvel">de mi trabajo</span>
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {TESTIMONIALS.map((item) => (
            <li key={item.business} className="border border-white/10 bg-[#0a0a0a] px-6 py-8">
              <blockquote className="font-impact text-2xl uppercase italic leading-tight tracking-tighter text-white md:text-3xl">
                {item.quote}
              </blockquote>
              <p className="mt-8 font-impact text-lg uppercase italic tracking-tighter text-white">{item.name}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.35em] text-red-marvel">{item.business}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
