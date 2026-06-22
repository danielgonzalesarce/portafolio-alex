
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
  }
];
