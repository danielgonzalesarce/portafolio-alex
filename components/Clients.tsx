import React, { useState } from 'react';
import { CLIENTS } from '../constants';

const logoSize: Record<string, { width: number; height: number }> = {
  '/logos/studio-paucolor.png': { width: 608, height: 186 },
  '/logos/go-gym.png': { width: 892, height: 280 },
};

const ClientMark: React.FC<{ name: string; logo: string; eager?: boolean }> = ({ name, logo, eager = false }) => {
  const [failed, setFailed] = useState(false);
  const size = logoSize[logo] ?? { width: 640, height: 200 };

  return (
    <li className="group flex flex-col items-center gap-4">
      <div className="flex h-16 w-full max-w-[12rem] items-center justify-center">
        {!failed && (
          <img
            src={logo}
            alt={`Logo de ${name}`}
            width={size.width}
            height={size.height}
            loading={eager ? 'eager' : 'lazy'}
            className="h-16 w-auto max-w-full object-contain grayscale brightness-0 invert transition duration-300 group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <p className="font-impact text-sm uppercase italic tracking-tighter text-white/70 transition-colors group-hover:text-white">
        {name}
      </p>
    </li>
  );
};

const Clients: React.FC = () => {
  return (
    <section id="clientes" className="relative z-10 border-y border-white/10 bg-black px-6 py-12 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-10 text-center font-impact text-4xl uppercase italic leading-none tracking-tighter text-white md:text-6xl">
          Han confiado<br /><span className="text-red-marvel">en mí</span>
        </h2>
        <ul className="grid grid-cols-2 items-start justify-items-center gap-x-6 gap-y-10 md:grid-cols-3">
          {CLIENTS.map((client, index) => (
            <ClientMark key={client.name} name={client.name} logo={client.logo} eager={index === 0} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Clients;
