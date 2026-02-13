
import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "51936068781";
  const message = "Hola Bugle Digital, me gustaría poner mi negocio en primera plana. ¿Podemos hablar de una asignación?";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] group"
    >
      <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity"></div>
      
      <div className="relative bg-white p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] flex items-center justify-center border-4 border-black group-hover:border-green-500 transition-colors">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-black group-hover:text-green-500 transition-colors"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
        </svg>

        {/* Tooltip Cinematográfico */}
        <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
           <div className="bg-red-marvel text-white font-impact text-lg uppercase italic px-4 py-2 skew-x-[-12deg] shadow-2xl">
              LÍNEA DIRECTA: +51 936068781
           </div>
        </div>
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
