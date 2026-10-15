import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const WA = 'https://wa.me/51936068781?text=Hola%20Daniel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto';

const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({
    agentName: '',
    email: '',
    phone: '',
    company: '',
    objective: 'Página web',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = `Hola Daniel, soy ${formData.agentName}. Vi tu portafolio y me gustaría cotizar un proyecto. Correo: ${formData.email}. WhatsApp: ${formData.phone}. Negocio: ${formData.company || 'no indicado'}. Necesito: ${formData.objective}. Detalles: ${formData.details}`;
    const whatsappUrl = `https://wa.me/51936068781?text=${encodeURIComponent(whatsappMessage)}`;
    const opened = window.open(whatsappUrl, '_blank');
    if (opened) opened.opener = null;

    if (!opened) {
      setStatus('error');
      return;
    }

    setStatus('sent');
    setFormData({ agentName: '', email: '', phone: '', company: '', objective: 'Página web', details: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacto" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-marvel to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-red-marvel">Contáctame</p>
            
            <h2 className="text-6xl md:text-7xl font-impact italic tracking-tighter text-white uppercase leading-none">
              CUÉNTAME TU <span className="text-red-marvel">PROYECTO</span>
            </h2>
            
            <p className="text-zinc-500 text-lg max-w-md">
              Cuéntame tu proyecto. Te respondo yo, por WhatsApp, en menos de 24 horas.
            </p>

            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm">Respuesta en menos de 24 horas</h4>
              <div>
                <h4 className="text-white font-bold uppercase tracking-wider text-sm">¿Es urgente? Escríbeme directo por WhatsApp</h4>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block bg-red-marvel px-5 py-3 font-impact text-sm uppercase italic tracking-tighter text-white skew-x-[-8deg]"
                >
                  Escríbeme por WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-red-marvel/5 blur-3xl rounded-full" />
            
            <form 
              onSubmit={handleSubmit}
              className="relative bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-[2rem] backdrop-blur-xl space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Tu nombre</label>
                  <input 
                    type="text" 
                    name="agentName"
                    value={formData.agentName}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-marvel transition-colors"
                    placeholder="Ej. María Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Correo</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-marvel transition-colors"
                    placeholder="tu@correo.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">WhatsApp</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-marvel transition-colors"
                    placeholder="936 068 781"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Negocio o empresa</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-marvel transition-colors"
                    placeholder="Nombre del negocio"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">¿Qué necesitas?</label>
                <select 
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-marvel transition-colors appearance-none"
                >
                  <option>Página web</option>
                  <option>Tienda en línea</option>
                  <option>Aplicación</option>
                  <option>Automatización</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Detalles</label>
                <textarea 
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-red-marvel transition-colors h-32 resize-none"
                  placeholder="Cuéntame qué necesitas"
                />
              </div>

              <button
                type="submit"
                className="w-full group relative overflow-hidden bg-red-marvel text-white font-impact text-2xl uppercase italic tracking-widest py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Send size={20} /> Enviar mensaje
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </button>

              {status === 'sent' && (
                <p className="flex items-start gap-2 text-sm text-white" role="status">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-red-marvel" />
                  Listo. Se abrió WhatsApp con tu mensaje. Envíalo desde ahí para que me llegue.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-white" role="status">
                  No pude abrir WhatsApp. Escríbeme directo al 936 068 781.
                </p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
