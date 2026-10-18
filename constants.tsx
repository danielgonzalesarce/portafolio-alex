import { Client, Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: "Maison d'Or Repostería",
    shortDescription: 'Maison d\'Or no tenía una carta pública de su repostería. El catálogo quedó publicado para que vean los productos sin llamar.',
    problem: 'La pastelería no tenía un catálogo público para mostrar sus productos.',
    work: 'Publiqué un sitio con la carta de la repostería artesanal.',
    category: 'Web',
    slug: 'maison-dor',
    thumbnail: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1400&q=80',
    demoType: 'IFRAME',
    techStack: ['HTML', 'CSS', 'JS'],
    liveUrl: 'https://danielgonzalesarce.github.io/reposteria-/',
    githubUrl: 'https://github.com/danielgonzalesarce/reposteria-'
  },
  {
    id: '2',
    name: "Florería Magaly",
    shortDescription: 'Florería Magaly recibía encargos solo por teléfono. El catálogo deja ver los arreglos y pedir sin depender de una llamada.',
    problem: 'Los encargos dependían del teléfono, sin un catálogo para elegir.',
    work: 'Armé un catálogo en línea para ver arreglos y encargar.',
    category: 'Web',
    slug: 'floreria-magaly',
    thumbnail: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1400&q=80',
    demoType: 'IFRAME',
    techStack: ['Web'],
    liveUrl: 'https://floreria-magaly-g3kq.vercel.app/',
    githubUrl: ''
  },
  {
    id: '3',
    name: "Lumina Hotel & Spa",
    shortDescription: 'Lumina Hotel & Spa es un proyecto propio para mostrar habitaciones y reservas juntas. La plataforma quedó publicada con React y Firebase.',
    problem: 'El hotel necesitaba presentar habitaciones y reservas en un solo sitio.',
    work: 'Construí la plataforma de reservas y servicios con React y Firebase.',
    category: 'Proyecto propio',
    slug: 'lumina-hotel',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
    demoType: 'IFRAME',
    techStack: ['React', 'Firebase'],
    liveUrl: 'https://lumina-hotel-spa.vercel.app/',
    githubUrl: ''
  },
  {
    id: '4',
    name: "Portafolio JB Empresa",
    shortDescription: 'JB Empresa no tenía una portada clara de lo que ofrece. El sitio ordena los servicios y deja un camino directo de contacto.',
    problem: 'La empresa no tenía una portada clara de lo que ofrece.',
    work: 'Desarrollé el sitio corporativo para ordenar servicios y contacto.',
    category: 'Web',
    slug: 'portafolio-jb',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
    demoType: 'IFRAME',
    techStack: ['React', 'Next.js'],
    liveUrl: 'https://portafoliojb-empresa-g1qz.vercel.app/',
    githubUrl: ''
  },
  {
    id: '5',
    name: "Luxe Tech E-commerce",
    shortDescription: 'Luxe Tech no tenía cómo vender tecnología en línea. La tienda quedó con catálogo y un flujo de compra.',
    problem: 'La tienda de tecnología no tenía un canal de venta en línea.',
    work: 'Monté el comercio con catálogo y flujo de compra.',
    category: 'E-commerce',
    slug: 'luxe-tech',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
    demoType: 'IFRAME',
    techStack: ['React', 'Node.js'],
    liveUrl: 'https://luxe-tech-e-commerce-premium-lima.vercel.app/',
    githubUrl: ''
  },
  {
    id: '6',
    name: "Aceros Marín",
    shortDescription: 'Aceros Marín no mostraba su línea de acero en la web. El sitio presenta los productos metalmecánicos y cómo pedirlos.',
    problem: 'El negocio de acero no mostraba su línea de productos en la web.',
    work: 'Diseñé y publiqué el sitio de la línea metalmecánica.',
    category: 'Web',
    slug: 'aceros-marin',
    thumbnail: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1400&q=80',
    demoType: 'IFRAME',
    techStack: ['React'],
    liveUrl: 'https://aceros-marin.vercel.app/',
    githubUrl: ''
  },
  {
    id: '7',
    name: "Go Gym",
    shortDescription: 'Go Gym no tenía una página para explicar planes y entrenamiento. El sitio ya muestra esa información a quien busca el gimnasio.',
    problem: 'El gimnasio no tenía una página para mostrar planes y entrenamiento.',
    work: 'Desarrollé el sitio para presentar esa información.',
    category: 'Web',
    slug: 'go-gym',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80',
    demoType: 'IFRAME',
    techStack: ['React'],
    liveUrl: 'https://go-gym-nine.vercel.app/',
    githubUrl: ''
  }
];

export const CLIENTS: Client[] = [
  { name: 'Aceros Marín', logo: '/logos/aceros-marin.png' },
  { name: 'Studio Paucolor', logo: '/logos/studio-paucolor.png' },
  { name: 'Go Gym', logo: '/logos/go-gym.png' },
];

export type Testimonial = {
  quote: string;
  name: string;
  business: string;
};

export const showTestimonials = false;

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: '[Pendiente: testimonio real]',
    name: '[Pendiente: nombre]',
    business: 'Aceros Marín',
  },
];
