
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Calendar, LogOut, Shield, ChevronRight, ExternalLink } from 'lucide-react';
import { auth, db, logOut, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

interface Acquisition {
  id: string;
  projectId: string;
  projectName: string;
  acquiredAt: any;
  status: string;
}

const UserAccount: React.FC = () => {
  const [acquisitions, setAcquisitions] = useState<Acquisition[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const path = 'acquisitions';
    const q = query(collection(db, path), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Acquisition));
      setAcquisitions(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar - Profile Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-marvel" />
            
            <div className="relative inline-block mb-4">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-24 h-24 rounded-full border-4 border-zinc-800 mx-auto" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mx-auto border-4 border-zinc-700">
                  <User size={40} className="text-zinc-500" />
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-red-marvel p-1.5 rounded-full border-4 border-zinc-900">
                <Shield size={14} className="text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">{user.displayName || 'Agente Anónimo'}</h2>
            <p className="text-zinc-500 text-sm mb-6">{user.email}</p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => logOut()}
                className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-800 hover:bg-red-500/10 hover:text-red-500 text-zinc-400 rounded-xl transition-all"
              >
                <LogOut size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Cerrar Sesión</span>
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">Estado del Sistema</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">Nivel de Acceso</span>
                <span className="text-red-marvel text-sm font-mono">NIVEL 4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">Encriptación</span>
                <span className="text-green-500 text-sm font-mono">ACTIVA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">ID de Agente</span>
                <span className="text-zinc-300 text-xs font-mono">{user.uid.substring(0, 8)}...</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Acquisitions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold text-white italic uppercase tracking-tighter">
              Mis <span className="text-red-marvel">Adquisiciones</span>
            </h2>
            <div className="px-4 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
              <span className="text-zinc-500 text-xs font-bold uppercase">{acquisitions.length} Activos</span>
            </div>
          </div>

          {acquisitions.length === 0 ? (
            <div className="bg-zinc-900/50 border border-dashed border-zinc-800 rounded-3xl p-20 text-center">
              <Package size={48} className="text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-zinc-400 mb-2">No se han detectado adquisiciones</h3>
              <p className="text-zinc-600 text-sm max-w-xs mx-auto">
                Explora la galería de proyectos y adquiere licencias para verlas reflejadas en tu terminal.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {acquisitions.map((acq, index) => (
                <motion.div
                  key={acq.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-red-marvel/50 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-red-marvel group-hover:scale-110 transition-transform">
                      <Package size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-red-marvel transition-colors">{acq.projectName}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                          <Calendar size={12} />
                          <span>{acq.acquiredAt?.toDate().toLocaleDateString() || 'Reciente'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest">{acq.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-3 bg-zinc-800 text-zinc-400 rounded-xl hover:bg-red-marvel hover:text-white transition-all">
                    <ExternalLink size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Additional Section - System Messages */}
          <div className="bg-red-marvel/5 border border-red-marvel/10 rounded-3xl p-8">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-red-marvel/20 rounded-lg text-red-marvel">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="text-red-marvel font-bold text-sm uppercase tracking-wider mb-1">Aviso de Seguridad</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Todas las adquisiciones están protegidas por encriptación de grado militar. Si detectas alguna anomalía en tus activos, contacta inmediatamente con el soporte técnico de Daily Bugle.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserAccount;
