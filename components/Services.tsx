import React from 'react';

const services = [
  {
    n: '01',
    title: 'Páginas web para negocios',
    text: 'El sitio explica qué ofreces, cómo contactarte y por qué elegirte. Lo dejo publicado para que lo compartas con tus clientes.',
  },
  {
    n: '02',
    title: 'Aplicaciones web a medida',
    text: 'Si necesitas cuentas, pedidos o un panel para ver tus ventas, lo armo a la medida de cómo trabaja tu negocio. No es una plantilla genérica.',
  },
  {
    n: '03',
    title: 'Apps móviles',
    text: 'Desarrollo aplicaciones Android para el uso diario, conectadas con la web o con los datos del negocio. Sirven cuando el teléfono es la herramienta de trabajo.',
  },
  {
    n: '04',
    title: 'Automatización con IA',
    text: 'Conecto WhatsApp, mapas y tareas que hoy se hacen a mano. Uso la IA solo donde ahorra tiempo, no para rellenar la página.',
  },
];

const Services: React.FC = () => {
  return (
    <section id="servicios" className="relative z-10 overflow-hidden bg-black px-6 py-24 md:px-8">
      <div className="relative mx-auto max-w-[1400px]">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Servicios</p>
          <h2 className="font-impact text-5xl uppercase italic leading-[0.85] tracking-tighter text-white md:text-7xl">
            Servicios de desarrollo web <span className="text-red-marvel">en Lima</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white md:text-lg">
            Para negocios de Lima y de todo el Perú. El precio va de S/ 300 a S/ 15 000, según lo que haya que construir. Se paga con Yape, Plin o transferencia.
          </p>
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
