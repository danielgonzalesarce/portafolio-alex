import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ViewState } from '../App';

interface InternalPageProps {
  view: ViewState;
  onClose: () => void;
  onViewChange: (view: ViewState) => void;
}

const securityArticles = [
  {
    id: '01',
    title: 'Quién opera esta terminal',
    body: 'Este portafolio es de Daniel Alexander Gonzales Arce, desarrollador web en Lima, Perú. Esta página no es un medio de terceros ni una plataforma con cuentas de usuario.',
  },
  {
    id: '02',
    title: 'Qué datos se piden',
    body: 'El formulario de contacto pide nombre, correo, teléfono, empresa y el detalle del encargo. Esos datos viajan en un mensaje de WhatsApp que tú envías. El sitio no guarda contraseñas ni abre una cuenta a tu nombre.',
  },
  {
    id: '03',
    title: 'Para qué se usan',
    body: 'Solo para responder tu consulta y cotizar un proyecto. No se venden, no se alquilan y no se usan para publicidad de terceros. Si el mensaje no lleva a un encargo, no entra a ninguna base comercial.',
  },
  {
    id: '04',
    title: 'Canal y cifrado en tránsito',
    body: 'La terminal se sirve por HTTPS. El mensaje sale hacia WhatsApp, cuyo tratamiento lo define Meta. En el portafolio no hay panel de login ni archivo de sesiones.',
  },
  {
    id: '05',
    title: 'Cuánto tiempo quedan',
    body: 'El texto permanece en el chat de WhatsApp del titular hasta que se borre. No hay otra copia automática dentro de este sitio. Puedes pedir que se elimine la conversación por el mismo número.',
  },
  {
    id: '06',
    title: 'Tus derechos',
    body: 'Puedes pedir acceso, corrección o borrado de lo que enviaste. Escríbelo por la línea +51 936 068 781 indicando tu nombre y el medio por el que contactaste. La respuesta sale por ese mismo canal.',
  },
  {
    id: '07',
    title: 'Sitios enlazados',
    body: 'Cada proyecto abre su propio dominio (Vercel o GitHub Pages). Esas páginas tienen sus propias reglas. Aquí solo publico el enlace y una ficha. No controlo las cookies de esos destinos.',
  },
  {
    id: '08',
    title: 'Menores y cambios',
    body: 'Este servicio está dirigido a negocios y personas adultas. Esta edición de políticas corresponde a 2026 y se actualiza en esta misma página, sin aviso por correo porque el sitio no guarda una lista de suscriptores.',
  },
];

const termsArticles = [
  {
    id: '01',
    title: 'Qué es este sitio',
    body: 'Es un portafolio para mostrar trabajo publicado: sitios, tiendas y sistemas. Recorrer la terminal, leer las fichas o abrir un demo no crea un contrato.',
  },
  {
    id: '02',
    title: 'Cómo se encarga un proyecto',
    body: 'El acuerdo nace cuando hay alcance, precio y plazo confirmados por WhatsApp o por escrito. Un mensaje de interés no reserva agenda ni fija un costo.',
  },
  {
    id: '03',
    title: 'Propiedad del trabajo',
    body: 'El código y el diseño entregados en un encargo se ceden según lo pactado en esa pieza. Este portafolio y los textos de portada siguen siendo de Daniel Alexander Gonzales Arce.',
  },
  {
    id: '04',
    title: 'Demos y enlaces vivos',
    body: 'Los sitios de la galería pueden cambiar, pausarse o mover de dominio. Una captura o una ficha describen el estado al momento de publicarse, no una promesa eterna de disponibilidad.',
  },
  {
    id: '05',
    title: 'Resultados',
    body: 'No se prometen ventas, posiciones en buscadores ni resultados comerciales. El encargo cubre el producto digital acordado: páginas, flujos y publicación. El desempeño del negocio depende de quien lo opera.',
  },
  {
    id: '06',
    title: 'Uso de la terminal',
    body: 'Puedes leer, compartir el enlace y contactar. No uses el sitio para suplantar a Daniel Gonzales, copiar las fichas como si fueran tuyas o saturar el canal de contacto con mensajes automáticos.',
  },
  {
    id: '07',
    title: 'Ley y contacto',
    body: 'Estos términos se leen bajo la ley peruana, con referencia en Lima. Dudas sobre el servicio: WhatsApp +51 936 068 781 o el perfil de LinkedIn publicado en el pie de página.',
  },
];

const storyBlocks: { id: string; title: string; text: string; tone: 'light' | 'dark' | 'red' }[] = [
  {
    id: '01',
    title: 'El origen',
    tone: 'light',
    text: 'Daniel Alexander Gonzales Arce estudia Diseño y Desarrollo de Software en Tecsup, en Lima. Forma en web, apps, automatización e IA, y construye proyectos propios entre clases.',
  },
  {
    id: '02',
    title: 'El oficio',
    tone: 'dark',
    text: 'Con clientes reales aprendió a escuchar y a convertir una necesidad en un producto que funciona. El trabajo tiene que verse y entenderse.',
  },
  {
    id: '03',
    title: 'La señal',
    tone: 'red',
    text: 'Este portafolio es su presentación: una señal clara de lo que sabe hacer.',
  },
  {
    id: '04',
    title: 'El siguiente paso',
    tone: 'light',
    text: 'Este sitio es la prueba de mi trabajo. Cada proyecto sale con el mismo estándar.',
  },
];

const desks = [
  {
    n: '01',
    role: 'Portada',
    text: 'Jerarquía, titular y la primera pantalla. Ahí se decide si el negocio se entiende.',
  },
  {
    n: '02',
    role: 'Cierre',
    text: 'Código, formularios y el enlace que el cliente puede enviar el mismo día.',
  },
  {
    n: '03',
    role: 'Publicación',
    text: 'Cada encargo queda con nombre, ficha y sitio en línea.',
  },
];

const profileFacts = [
  { label: 'Oficio', value: 'Desarrollo web fullstack' },
  { label: 'Formación', value: 'Tecsup, Lima' },
  { label: 'Ciudad', value: 'Lima, Perú' },
  { label: 'Contacto', value: '+51 936 068 781' },
];

const TeamPortrait: React.FC = () => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative min-h-[28rem] overflow-hidden border-b border-white/10 bg-[#111111] lg:h-full lg:border-b-0 lg:border-r">
      {failed ? (
        <div className="grid h-full min-h-[28rem] place-items-center font-impact text-8xl italic text-white">DA</div>
      ) : (
        <img
          src="https://github.com/danielgonzalesarce.png"
          alt="Daniel Alexander Gonzales Arce"
          className="absolute inset-0 h-full w-full object-cover object-top"
          onError={() => setFailed(true)}
        />
      )}
      <span className="absolute bottom-5 left-5 bg-black/80 px-3 py-1 font-impact text-sm uppercase italic tracking-wide text-white">
        Editor en jefe
      </span>
    </div>
  );
};

const TeamPage: React.FC<{ onViewChange: (view: ViewState) => void }> = ({ onViewChange }) => (
  <div className="relative space-y-16 md:space-y-24">
    <header className="relative max-w-5xl">
      <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Redacción · Lima, Perú</p>
      <h2 className="font-impact text-7xl uppercase italic leading-none tracking-tighter text-white md:text-[10rem]">
        EL <span className="text-red-marvel">AUTOR</span>
      </h2>
      <h3 className="marvel-text-outline -mt-2 font-impact text-4xl uppercase leading-none tracking-tighter md:text-7xl">
        una sola firma
      </h3>
      <p className="mt-8 max-w-2xl text-base font-bold leading-relaxed text-zinc-400 md:text-lg">
        Daniel Alexander Gonzales Arce diseña, desarrolla y publica. La misma persona responde por la ficha y por el sitio en vivo.
      </p>
    </header>

    <article className="grid grid-cols-1 border border-white/10 bg-[#0a0a0a] lg:grid-cols-[minmax(0,460px)_1fr]">
      <TeamPortrait />
      <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
        <div>
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.45em] text-red-marvel">Fullstack · Tecsup · Lima</p>
          <h3 className="font-impact text-5xl uppercase italic leading-[0.85] tracking-tighter text-white md:text-7xl">
            Daniel Alexander<br />Gonzales Arce
          </h3>
          <div className="mt-8 max-w-xl space-y-4 text-sm font-medium leading-relaxed text-zinc-300 md:text-base">
            <p>
              Estudia Diseño y Desarrollo de Software en Tecsup. Construye sitios, tiendas y sistemas para negocios en Lima, de la primera pantalla al enlace publicado.
            </p>
            <p>
              El archivo cubre repostería, flores, hotelería, empresa, comercio, acero, gimnasios y elevadores.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {profileFacts.map((fact) => (
            <div key={fact.label} className="border border-white/10 bg-black px-4 py-4">
              <dt className="text-[10px] font-black uppercase tracking-[0.35em] text-red-marvel">{fact.label}</dt>
              <dd className="mt-2 font-impact text-xl uppercase italic leading-none tracking-tight text-white">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="https://www.linkedin.com/in/daniel-alexander-gonzales-arce-537576383/"
            target="_blank"
            rel="noreferrer"
            className="bg-white px-8 py-4 font-impact text-2xl uppercase italic text-black shadow-[10px_10px_0px_rgba(255,255,255,0.1)] skew-x-[-12deg] transition-all hover:bg-red-marvel hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/danielgonzalesarce"
            target="_blank"
            rel="noreferrer"
            className="font-impact text-xl uppercase italic text-white transition-colors hover:text-red-marvel"
          >
            GitHub
          </a>
          <a
            href="https://wa.me/51936068781"
            target="_blank"
            rel="noreferrer"
            className="font-impact text-xl uppercase italic text-white transition-colors hover:text-red-marvel"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>

    <section>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Cómo se reparte el trabajo</p>
          <h3 className="font-impact text-5xl uppercase italic leading-none tracking-tighter text-white md:text-7xl">
            La <span className="text-red-marvel">mesa</span>
          </h3>
        </div>
        <button
          onClick={() => onViewChange('historia')}
          className="text-left font-impact text-xl uppercase italic text-red-marvel transition-colors hover:text-white"
        >
          Leer la historia →
        </button>
      </div>
      <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {desks.map((desk) => (
          <li key={desk.n} className="border border-white/10 bg-[#0a0a0a] px-6 py-8">
            <p className="font-impact text-4xl italic leading-none text-red-marvel">{desk.n}</p>
            <h4 className="mt-6 font-impact text-3xl uppercase italic tracking-tighter text-white">{desk.role}</h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{desk.text}</p>
          </li>
        ))}
      </ol>
    </section>
  </div>
);

const PolicyList: React.FC<{ items: { id: string; title: string; body: string }[] }> = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {items.map((item) => (
      <article key={item.id} className="bg-zinc-900 border-l-4 border-red-marvel p-8">
        <span className="text-red-marvel font-black text-[10px] tracking-[0.4em] mb-4 block">ARTÍCULO {item.id}</span>
        <h3 className="text-3xl font-impact text-white uppercase mb-4 italic">{item.title}</h3>
        <p className="text-zinc-400 text-sm font-bold leading-relaxed uppercase">{item.body}</p>
      </article>
    ))}
  </div>
);

const InternalPage: React.FC<InternalPageProps> = ({ view, onClose, onViewChange }) => {
  const renderContent = () => {
    switch (view) {
      case 'historia':
        return (
          <div className="relative space-y-16 md:space-y-24">
            <div className="pointer-events-none absolute -top-10 left-0 select-none overflow-hidden opacity-[0.07]">
              <span className="block font-impact text-[28vw] uppercase leading-none tracking-tighter text-white">SEÑAL</span>
            </div>

            <div className="relative">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Edición fundacional · Lima, Perú</p>
              <h2 className="font-impact text-7xl uppercase italic leading-none tracking-tighter text-white md:text-[10rem]">
                LA <span className="text-red-marvel">HISTORIA</span>
              </h2>
              <h3 className="marvel-text-outline -mt-2 font-impact text-4xl uppercase leading-none tracking-tighter md:text-7xl">
                de una señal
              </h3>
            </div>

            <div className="relative space-y-8 md:space-y-12">
              {storyBlocks.map((block, index) => {
                const toTheRight = index % 2 === 1;
                const tone =
                  block.tone === 'light'
                    ? 'bg-white text-black'
                    : block.tone === 'red'
                      ? 'bg-red-marvel text-white'
                      : 'border-l-4 border-red-marvel bg-zinc-900 text-white';
                return (
                  <motion.article
                    key={block.id}
                    initial={{ opacity: 0, x: toTheRight ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className={`relative w-full p-8 italic md:w-[72%] md:p-12 ${tone} ${toTheRight ? 'md:ml-auto' : 'md:mr-auto'}`}
                  >
                    <span className={`mb-4 block font-impact text-sm not-italic tracking-[0.4em] ${block.tone === 'light' ? 'text-red-marvel' : 'text-white/70'}`}>
                      {block.id}
                    </span>
                    <h3 className="mb-6 font-impact text-4xl uppercase leading-none tracking-tighter md:text-6xl">
                      {block.title}
                    </h3>
                    <p className={`max-w-2xl text-base font-bold not-italic leading-relaxed md:text-lg ${block.tone === 'dark' ? 'text-zinc-300' : ''}`}>
                      {block.text}
                    </p>
                  </motion.article>
                );
              })}
            </div>

            <button
              onClick={() => onViewChange('main')}
              className="bg-white px-10 py-4 font-impact text-2xl uppercase italic text-black skew-x-[-12deg] shadow-[10px_10px_0px_rgba(255,255,255,0.1)] transition-all hover:bg-red-marvel hover:text-white"
            >
              Ver la portada
            </button>
          </div>
        );
      case 'equipo':
        return <TeamPage onViewChange={onViewChange} />;
      case 'seguridad':
        return (
          <div className="space-y-12">
             <div className="bg-red-marvel text-white p-4 font-impact text-2xl inline-block skew-x-[-10deg] uppercase italic">
                PROTOCOLO DE ACCESO: SECURITY_V4
             </div>
             <h2 className="text-5xl md:text-7xl font-impact text-white uppercase italic tracking-tighter leading-none">
               Políticas de <span className="text-red-marvel">seguridad</span> y privacidad
             </h2>
             <p className="max-w-3xl font-mono text-zinc-400 text-sm leading-relaxed uppercase">
               [SISTEMA] Comunicado de Daniel Gonzales, edición 2026. Esta página explica qué datos salen del sitio, a dónde van y cómo pedir que se borren. No hay cuentas, no hay panel y no hay archivo oculto de visitantes.
             </p>
             <PolicyList items={securityArticles} />
             <p className="font-mono text-zinc-600 text-xs uppercase">--- Fin del comunicado de seguridad ---</p>
          </div>
        );
      case 'terminos':
        return (
          <div className="space-y-12">
             <div className="bg-red-marvel text-white p-4 font-impact text-2xl inline-block skew-x-[-10deg] uppercase italic">
                PROTOCOLO DE ACCESO: TERMS_OF_USE
             </div>
             <h2 className="text-5xl md:text-7xl font-impact text-white uppercase italic tracking-tighter leading-none">
               Términos y <span className="text-red-marvel">condiciones</span> del servicio
             </h2>
             <p className="max-w-3xl font-mono text-zinc-400 text-sm leading-relaxed uppercase">
               [SISTEMA] Condiciones de uso del sitio y de los encargos. Leer el portafolio es libre. Encargar un proyecto es un acuerdo aparte.
             </p>
             <PolicyList items={termsArticles} />
             <p className="font-mono text-zinc-600 text-xs uppercase">--- Fin del comunicado de servicio ---</p>
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
