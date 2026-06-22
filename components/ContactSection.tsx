
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Send, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({
    agentName: '',
    email: '',
    objective: 'Desarrollo Web Fullstack',
    details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const isSupport = formData.objective === 'Soporte Técnico';
      const collectionName = isSupport ? 'support_messages' : 'briefings';
      
      const payload = isSupport ? {
        name: formData.agentName,
        email: formData.email,
        subject: 'Soporte Técnico',
        message: formData.details,
        createdAt: serverTimestamp(),
        status: 'new'
      } : {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      };

      await addDoc(collection(db, collectionName), payload);
      setStatus('sent');
      setFormData({ agentName: '', email: '', objective: 'Desarrollo Web Fullstack', details: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Error submitting message:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      handleFirestoreError(error, OperationType.CREATE, formData.objective === 'Soporte Técnico' ? 'support_messages' : 'briefings');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacto" className="py-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-marvel to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-marvel/10 border border-red-marvel/20 text-red-marvel text-[10px] font-black uppercase tracking-[0.3em]">
              <Shield size={12} />
              Canal de Comunicación Seguro
            </div>
            
            <h2 className="text-6xl md:text-7xl font-impact italic tracking-tighter text-white uppercase leading-none">
              ENVÍA TU <span className="text-red-marvel">BRIEFING</span> DE MISIÓN
            </h2>
            
            <p className="text-zinc-500 text-lg max-w-md">
              ¿Tienes un proyecto que necesita el toque Bugle? Envía los detalles y nuestro equipo de inteligencia se pondrá en contacto.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-marvel">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider text-sm">Protocolo de Inicio</h4>
                  <p className="text-zinc-500 text-xs">Respuesta garantizada en menos de 24 horas.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-marvel">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider text-sm">Urgencia Máxima</h4>
                  <p className="text-zinc-500 text-xs">Para lanzamientos inmediatos, usa la línea roja.</p>
                </div>
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
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Nombre del Agente</label>
                  <input 
                    type="text" 
                    name="agentName"
                    value={formData.agentName}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-marvel transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Frecuencia (Email)</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-marvel transition-colors"
                    placeholder="agente@bugle.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Objetivo de la Misión</label>
                <select 
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-marvel transition-colors appearance-none"
                >
                  <option>Desarrollo Web Fullstack</option>
                  <option>Diseño de Interfaz UI/UX</option>
                  <option>Consultoría de Inteligencia</option>
                  <option>Producción Audiovisual</option>
                  <option>Soporte Técnico</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Detalles Clasificados</label>
                <textarea 
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-red-marvel transition-colors h-32 resize-none"
                  placeholder="Describe los objetivos de tu proyecto..."
                />
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className="w-full group relative overflow-hidden bg-red-marvel text-white font-impact text-2xl uppercase italic tracking-widest py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {status === 'idle' && <><Send size={20} /> Transmitir Briefing</>}
                  {status === 'sending' && "Cifrando Mensaje..."}
                  {status === 'sent' && <><CheckCircle size={20} /> Misión Recibida</>}
                  {status === 'error' && "Error en Transmisión"}
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
