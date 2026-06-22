
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, X, Mail, Lock, Github, Chrome } from 'lucide-react';
import { signInWithGoogle, auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
      onClose();
    } catch (err: any) {
      console.error("Auth error:", err.code, err.message);
      if (err.code === 'auth/operation-not-allowed') {
        setError('El registro con correo no está habilitado en la consola de Firebase. Por favor, usa Google o contacta al administrador.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado. Intenta iniciar sesión.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña es muy débil. Usa al menos 6 caracteres.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El formato del correo no es válido.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Error de red. Verifica tu conexión, desactiva bloqueadores de anuncios (AdBlock/Brave Shields) o asegúrate de que este dominio esté autorizado en Firebase.');
      } else {
        setError('Error de autenticación: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error("Google Auth error:", err.code, err.message);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('La ventana de Google se cerró antes de completar el acceso.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('El acceso con Google no está habilitado en la consola de Firebase.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Error de red. Verifica tu conexión, desactiva bloqueadores de anuncios (AdBlock/Brave Shields) o asegúrate de que este dominio esté autorizado en Firebase.');
      } else {
        setError('Error con Google: ' + err.message);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-red-marvel/30 p-8 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-marvel/5 blur-3xl rounded-full -mr-16 -mt-16" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter uppercase italic">
                {isLogin ? 'Acceso de Agente' : 'Registro de Recluta'}
              </h2>
              <p className="text-zinc-400 text-sm">
                {isLogin ? 'Ingresa tus credenciales para acceder a la terminal.' : 'Crea una cuenta para gestionar tus activos.'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-xs text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                    <LogIn size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-red-marvel transition-colors"
                    required
                  />
                </div>
              )}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-red-marvel transition-colors"
                  required
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-red-marvel transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-marvel text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-marvel/20 disabled:opacity-50 uppercase tracking-widest text-sm"
              >
                {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-zinc-500">O continuar con</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-white py-2 rounded-xl hover:bg-zinc-700 transition-colors"
              >
                <Chrome size={18} />
                <span className="text-xs font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-white py-2 rounded-xl hover:bg-zinc-700 transition-colors">
                <Github size={18} />
                <span className="text-xs font-medium">GitHub</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-zinc-400 hover:text-red-marvel text-xs transition-colors"
              >
                {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya eres agente? Inicia sesión'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
