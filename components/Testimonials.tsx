
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Send, User as UserIcon } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface Review {
  id: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  createdAt: any;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 'mock-1',
    userName: 'Tony S.',
    userPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'El Bugle Digital entregó el sistema de rastreo antes de lo esperado. Eficiencia nivel Stark.',
    createdAt: { seconds: Date.now() / 1000 }
  },
  {
    id: 'mock-2',
    userName: 'Natasha R.',
    userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Sigilo y precisión en cada línea de código. La mejor red de inteligencia digital que he usado.',
    createdAt: { seconds: Date.now() / 1000 }
  },
  {
    id: 'mock-3',
    userName: 'Steve R.',
    userPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Un trabajo con valores. El Bugle no solo construye webs, construye confianza.',
    createdAt: { seconds: Date.now() / 1000 }
  }
];

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((u) => setUser(u));
    
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(6));
    const unsubscribeReviews = onSnapshot(q, (snapshot) => {
      const loadedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      
      // If there are no reviews in DB, show mock reviews
      if (loadedReviews.length === 0) {
        setReviews(MOCK_REVIEWS);
      } else {
        setReviews(loadedReviews);
      }
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'reviews');
      setReviews(MOCK_REVIEWS);
      setIsLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeReviews();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        userId: user.uid,
        userName: user.displayName || 'Agente Anónimo',
        userPhoto: user.photoURL || '',
        rating: newRating,
        comment: newComment,
        createdAt: serverTimestamp(),
        approved: true
      });
      setNewComment('');
      setNewRating(5);
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-impact italic tracking-tighter text-white uppercase mb-4">
              Informes de <span className="text-red-marvel">Campo</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Lo que dicen nuestros aliados sobre las misiones ejecutadas. Testimonios reales de la red Bugle.
            </p>
          </div>
          
          {user ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-auto bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-md"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={`transition-colors ${newRating >= star ? 'text-yellow-500' : 'text-zinc-700'}`}
                      >
                        <Star size={18} fill={newRating >= star ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Tu Calificación</span>
                </div>
                <div className="relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe tu informe de misión..."
                    className="w-full bg-zinc-800/50 border border-zinc-700 text-white p-4 rounded-xl focus:outline-none focus:border-red-marvel transition-colors text-sm resize-none h-24"
                    maxLength={300}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className="absolute bottom-3 right-3 p-2 bg-red-marvel text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="text-zinc-500 text-sm italic border-l-2 border-red-marvel pl-4">
              Inicia sesión como agente para dejar tu informe.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Skeleton state while loading
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-zinc-900/20 border border-zinc-800/30 p-8 rounded-3xl animate-pulse">
                  <div className="h-4 w-24 bg-zinc-800 rounded mb-6" />
                  <div className="h-20 bg-zinc-800 rounded mb-8" />
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800" />
                    <div className="space-y-2">
                      <div className="h-3 w-20 bg-zinc-800 rounded" />
                      <div className="h-2 w-16 bg-zinc-800 rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              reviews.map((review) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-zinc-900/30 border border-zinc-800/50 p-8 rounded-3xl relative group hover:border-red-marvel/30 transition-all duration-500"
                >
                  <Quote className="absolute top-6 right-8 text-zinc-800 group-hover:text-red-marvel/10 transition-colors" size={48} />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < review.rating ? 'text-yellow-500' : 'text-zinc-800'} 
                        fill={i < review.rating ? 'currentColor' : 'none'} 
                      />
                    ))}
                  </div>

                  <p className="text-zinc-300 mb-8 italic leading-relaxed">
                    "{review.comment}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                      {review.userPhoto ? (
                        <img src={review.userPhoto} alt={review.userName} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <UserIcon size={20} className="text-zinc-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm uppercase tracking-wider">{review.userName}</div>
                      <div className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
                        {review.id.startsWith('mock-') ? 'Agente Honorario' : 'Agente Verificado'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
