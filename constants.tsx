
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: "Maison d'Or Repostería",
    shortDescription: 'Sistema de gestión y catálogo exclusivo para alta repostería artesanal.',
    category: 'SaaS',
    thumbnail: 'https://st.depositphotos.com/1585997/4589/i/450/depositphotos_45899497-stock-photo-pastry-shop.jpg',
    demoType: 'IFRAME',
    techStack: ['HTML', 'CSS', 'JS'],
    liveUrl: 'https://danielgonzalesarce.github.io/reposteria-/',
    githubUrl: 'https://github.com/danielgonzalesarce/reposteria-'
  },
  {
    id: '2',
    name: "Florería Magaly",
    shortDescription: 'Catálogo en línea y sistema de pedidos para florería.',
    category: 'SaaS',
    thumbnail: 'https://st5.depositphotos.com/5903596/69799/i/450/depositphotos_697995684-stock-photo-outdoor-flower-shop-paris-france.jpg',
    demoType: 'IFRAME',
    techStack: ['Web'],
    liveUrl: 'https://floreria-magaly-g3kq.vercel.app/',
    githubUrl: ''
  },
  {
    id: '3',
    name: "Lumina Hotel & Spa",
    shortDescription: 'Plataforma de reservas y servicios para hotel de lujo.',
    category: 'Web',
    thumbnail: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    demoType: 'IFRAME',
    techStack: ['React', 'Firebase'],
    liveUrl: 'https://lumina-hotel-spa.vercel.app/',
    githubUrl: ''
  },
  {
    id: '4',
    name: "Portafolio JB Empresa",
    shortDescription: 'Solución corporativa para gestión de portafolios.',
    category: 'Web',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    demoType: 'IFRAME',
    techStack: ['React', 'Next.js'],
    liveUrl: 'https://portafoliojb-empresa-g1qz.vercel.app/',
    githubUrl: ''
  },
  {
    id: '5',
    name: "Luxe Tech E-commerce",
    shortDescription: 'Tienda en línea premium para tecnología de vanguardia.',
    category: 'E-commerce',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    demoType: 'IFRAME',
    techStack: ['React', 'Node.js'],
    liveUrl: 'https://luxe-tech-e-commerce-premium-lima.vercel.app/',
    githubUrl: ''
  }
];
