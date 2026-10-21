import React, { useState } from 'react';
import { CLIENTS } from '../constants';

const logoSize: Record<string, { width: number; height: number }> = {
  '/logos/LogoAcerosMarin.png': { width: 442, height: 564 },
  '/logos/studio-paucolor.png': { width: 608, height: 186 },
  '/logos/go-gym.png': { width: 892, height: 280 },
  '/logos/Angular%20Layers%20Corp.%20Logo.png': { width: 866, height: 288 },
};

const ClientMark: React.FC<{ name: string; logo: string; eager?: boolean }> = ({ name, logo, eager = false }) => {
  const [failed, setFailed] = useState(false);
  const size = logoSize[logo] ?? { width: 640, height: 200 };

  return (
    <li className="group flex flex-col items-center gap-4">
      <div className="flex h-16 w-44 items-center justify-center md:h-20 md:w-56">
        {!failed && (
          <img
            src={logo}
            alt={`Logo de ${name}`}
            width={size.width}
            height={size.height}
            loading={eager ? 'eager' : 'lazy'}
            className={`max-h-full max-w-full object-contain ${logo.includes('Layers') ? 'invert' : ''}`}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </li>
  );
};

const Clients: React.FC = () => {
  return (
    <section id="clientes" className="relative z-10 border-y border-white/10 bg-black px-6 py-12 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-10 text-center font-impact text-4xl uppercase italic leading-none tracking-tighter text-white md:text-6xl">
          Negocios que<br /><span className="text-red-marvel">confiaron en mí</span>
        </h2>
        <ul className="grid grid-cols-2 items-start justify-items-center gap-x-6 gap-y-10 lg:grid-cols-4">
          {CLIENTS.map((client, index) => (
            <ClientMark key={client.name} name={client.name} logo={client.logo} eager={index === 0} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Clients;
