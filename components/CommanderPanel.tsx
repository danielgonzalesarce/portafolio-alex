
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, storage, handleFirestoreError, OperationType } from '../firebase';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  Shield, 
  Mail, 
  Calendar, 
  Trash2, 
  Clock, 
  X, 
  Terminal, 
  ChevronRight, 
  LifeBuoy, 
  LayoutGrid, 
  Plus, 
  ExternalLink, 
  Github,
  Tag,
  FileText,
  User,
  AlertCircle
} from 'lucide-react';
import { Briefing, SupportMessage, Project } from '../types';
import { PROJECTS as STATIC_PROJECTS } from '../constants';

type PanelTab = 'briefings' | 'support' | 'projects';

interface CommanderPanelProps {
  onClose: () => void;
}

const CommanderPanel: React.FC<CommanderPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<PanelTab>('briefings');
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedBriefing, setSelectedBriefing] = useState<Briefing | null>(null);
  const [selectedSupport, setSelectedSupport] = useState<SupportMessage | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const allProjects = useMemo(() => {
    const projectMap = new Map<string, Project>();
    STATIC_PROJECTS.forEach(p => projectMap.set(p.id, p));
    projects.forEach(p => projectMap.set(p.id, p));
    return Array.from(projectMap.values());
  }, [projects]);
  const isStatic = useMemo(() => {
    return STATIC_PROJECTS.some(p => p.id === selectedProject?.id);
  }, [selectedProject]);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editProjectData, setEditProjectData] = useState<Partial<Project>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjectUrl, setNewProjectUrl] = useState('');
  const [newProjectThumbnailUrl, setNewProjectThumbnailUrl] = useState('');
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{collectionName: string, id: string} | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    
    let thumbnailUrl = editProjectData.thumbnail || selectedProject.thumbnail;
    
    if (imageFile) {
        const storageRef = ref(storage, `projects/${selectedProject.id}/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        thumbnailUrl = await getDownloadURL(storageRef);
    }
    
    const finalProjectData = { ...editProjectData, thumbnail: thumbnailUrl };

    console.log("Updating project:", selectedProject.id, finalProjectData);
    try {
      const isProjectInFirestore = projects.some(p => p.id === selectedProject.id);
      if (isProjectInFirestore) {
        await updateDoc(doc(db, 'projects', selectedProject.id), finalProjectData);
        setIsEditingProject(false);
        setImageFile(null);
        const updatedProject = { ...selectedProject, ...finalProjectData } as Project;
        console.log("Updated project state:", updatedProject);
        setSelectedProject(updatedProject);
      } else {
        const docRef = await addDoc(collection(db, 'projects'), { ...selectedProject, ...finalProjectData });
        setIsEditingProject(false);
        setImageFile(null);
        const newProject = { ...selectedProject, ...finalProjectData, id: docRef.id } as Project;
        console.log("New project state:", newProject);
        setSelectedProject(newProject);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      setAlertMessage("Error al actualizar el proyecto.");
    }
  };

  useEffect(() => {
    setLoading(true);
    
    // Listen to Briefings
    const qBriefings = query(collection(db, 'briefings'), orderBy('createdAt', 'desc'));
    const unsubBriefings = onSnapshot(qBriefings, (snapshot) => {
      setBriefings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Briefing[]);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'briefings');
    });

    // Listen to Support
    const qSupport = query(collection(db, 'support_messages'), orderBy('createdAt', 'desc'));
    const unsubSupport = onSnapshot(qSupport, (snapshot) => {
      setSupportMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SupportMessage[]);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'support_messages');
    });

    // Listen to Projects
    const qProjects = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[]);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
      setLoading(false);
    });

    return () => {
      unsubBriefings();
      unsubSupport();
      unsubProjects();
    };
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectUrl) return;
    setIsAddingProject(true);

    try {
      // Simple logic: use URL as name/thumbnail for now, admin can edit later
      // In a real app, we might scrape or use Gemini to get metadata
      const domain = new URL(newProjectUrl).hostname;
      
      await addDoc(collection(db, 'projects'), {
        name: domain.split('.')[0].toUpperCase(),
        shortDescription: `Proyecto importado desde ${domain}`,
        category: 'SaaS',
        thumbnail: newProjectThumbnailUrl || `https://picsum.photos/seed/${domain}/800/600`,
        demoType: 'IFRAME',
        techStack: ['Web'],
        liveUrl: newProjectUrl,
        createdAt: serverTimestamp()
      });

      setNewProjectUrl('');
      setNewProjectThumbnailUrl('');
      setShowAddProject(false);
    } catch (error) {
      console.error("Error adding project:", error);
      setAlertMessage("Error al procesar la URL. Asegúrate de que sea válida.");
    } finally {
      setIsAddingProject(false);
    }
  };

  const updateStatus = async (collectionName: string, id: string, status: string) => {
    try {
      await updateDoc(doc(db, collectionName, id), { status });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const requestDelete = (collectionName: string, id: string) => {
    if (collectionName === 'projects') {
      const isProjectInFirestore = projects.some(p => p.id === id);
      if (!isProjectInFirestore) {
        setAlertMessage("Este es un proyecto estático del sistema. Para eliminarlo permanentemente, debes editar el código fuente (constants.tsx).");
        return;
      }
    }
    setDeleteConfirmation({ collectionName, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;
    const { collectionName, id } = deleteConfirmation;
    try {
      await deleteDoc(doc(db, collectionName, id));
      if (activeTab === 'briefings') setSelectedBriefing(null);
      if (activeTab === 'support') setSelectedSupport(null);
      if (activeTab === 'projects') setSelectedProject(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setDeleteConfirmation(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col font-sans overflow-hidden"
    >
      {/* High-tech Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(226,54,54,0.05),transparent_70%)]"></div>
      </div>

      {/* Header */}
      <header className="h-20 border-b border-red-marvel/30 bg-black flex items-center justify-between px-8 relative z-20">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-12 h-12 bg-red-marvel rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(226,54,54,0.4)]">
              <Shield className="text-white" size={28} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-impact uppercase italic tracking-widest text-white leading-none">
                Panel de Control <span className="text-red-marvel">Comandante</span>
              </h1>
            </div>
            <p className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.3em] mt-1">Terminal Central de Administración // Cifrado AES-256</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-red-marvel hover:text-white transition-all border border-zinc-800"
          >
            <X size={24} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-20">
        {/* Sidebar Navigation */}
        <nav className="w-20 border-r border-zinc-800/50 bg-black/60 flex flex-col items-center py-8 gap-8">
          <button 
            onClick={() => setActiveTab('briefings')}
            className={`p-4 rounded-2xl transition-all ${activeTab === 'briefings' ? 'bg-red-marvel text-white shadow-[0_0_15px_rgba(226,54,54,0.4)]' : 'text-zinc-600 hover:text-zinc-400'}`}
            title="Briefings"
          >
            <Terminal size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('support')}
            className={`p-4 rounded-2xl transition-all ${activeTab === 'support' ? 'bg-red-marvel text-white shadow-[0_0_15px_rgba(226,54,54,0.4)]' : 'text-zinc-600 hover:text-zinc-400'}`}
            title="Soporte Técnico"
          >
            <LifeBuoy size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`p-4 rounded-2xl transition-all ${activeTab === 'projects' ? 'bg-red-marvel text-white shadow-[0_0_15px_rgba(226,54,54,0.4)]' : 'text-zinc-600 hover:text-zinc-400'}`}
            title="Gestión de Proyectos"
          >
            <LayoutGrid size={24} />
          </button>
        </nav>

        {/* List Sidebar */}
        <aside className="w-[400px] border-r border-zinc-800/50 overflow-y-auto bg-black/40 backdrop-blur-md">
          <div className="p-6 border-b border-zinc-800/50 bg-zinc-900/20 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-zinc-400">
              <div className="flex items-center gap-2">
                {activeTab === 'briefings' && <Terminal size={14} className="text-red-marvel" />}
                {activeTab === 'support' && <LifeBuoy size={14} className="text-red-marvel" />}
                {activeTab === 'projects' && <LayoutGrid size={14} className="text-red-marvel" />}
                <span>
                  {activeTab === 'briefings' && 'Briefings de Misión'}
                  {activeTab === 'support' && 'Soporte Técnico'}
                  {activeTab === 'projects' && 'Repositorio de Proyectos'}
                </span>
              </div>
              {activeTab === 'projects' && (
                <button 
                  onClick={() => setShowAddProject(true)}
                  className="bg-red-marvel/20 text-red-marvel border border-red-marvel/30 p-1 rounded hover:bg-red-marvel hover:text-white transition-all"
                >
                  <Plus size={14} />
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-red-marvel border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/30">
              {activeTab === 'briefings' && briefings.map(b => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBriefing(b);
                    if (b.status === 'new') updateStatus('briefings', b.id, 'read');
                  }}
                  className={`w-full p-8 text-left transition-all hover:bg-zinc-900/30 relative ${selectedBriefing?.id === b.id ? 'bg-red-marvel/10 border-l-4 border-red-marvel' : 'border-l-4 border-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-impact text-lg italic tracking-wider truncate">{b.agentName}</span>
                    {b.status === 'new' && <span className="w-2 h-2 rounded-full bg-red-marvel animate-pulse" />}
                  </div>
                  <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest truncate">{b.objective}</div>
                </button>
              ))}

              {activeTab === 'support' && supportMessages.map(m => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedSupport(m);
                    if (m.status === 'new') updateStatus('support_messages', m.id, 'read');
                  }}
                  className={`w-full p-8 text-left transition-all hover:bg-zinc-900/30 relative ${selectedSupport?.id === m.id ? 'bg-red-marvel/10 border-l-4 border-red-marvel' : 'border-l-4 border-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-impact text-lg italic tracking-wider truncate">{m.name}</span>
                    {m.status === 'new' && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                  </div>
                  <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest truncate">{m.subject}</div>
                </button>
              ))}

              {activeTab === 'projects' && allProjects.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProject(p);
                    setIsEditingProject(false);
                    setEditProjectData({});
                  }}
                  className={`w-full p-8 text-left transition-all hover:bg-zinc-900/30 relative ${selectedProject?.id === p.id ? 'bg-red-marvel/10 border-l-4 border-red-marvel' : 'border-l-4 border-transparent'}`}
                >
                  <div className="flex gap-4 items-center">
                    <img src={p.thumbnail || null} className="w-12 h-12 rounded object-cover border border-zinc-800" alt="" />
                    <div>
                      <div className="text-white font-impact text-lg italic tracking-wider">{p.name}</div>
                      <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">{p.category}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#080808] relative p-16">
          <AnimatePresence mode="wait">
            {showAddProject ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <h2 className="text-4xl font-impact uppercase italic text-white mb-8">Importar Nuevo Proyecto</h2>
                <form onSubmit={handleAddProject} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">URL del Proyecto (Live Demo)</label>
                    <input 
                      type="url" 
                      required
                      placeholder="https://mi-proyecto.vercel.app"
                      value={newProjectUrl}
                      onChange={(e) => setNewProjectUrl(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-white focus:border-red-marvel outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">URL de la Imagen de Portada (Opcional)</label>
                    <input 
                      type="url" 
                      placeholder="https://ejemplo.com/imagen.jpg"
                      value={newProjectThumbnailUrl}
                      onChange={(e) => setNewProjectThumbnailUrl(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-white focus:border-red-marvel outline-none transition-all"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="submit"
                      disabled={isAddingProject}
                      className="flex-1 bg-red-marvel text-white font-impact uppercase italic py-4 rounded-xl hover:bg-red-600 transition-all disabled:opacity-50"
                    >
                      {isAddingProject ? 'Procesando...' : 'Lanzar al Repositorio'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowAddProject(false)}
                      className="px-8 bg-zinc-800 text-white font-impact uppercase italic rounded-xl hover:bg-zinc-700 transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : activeTab === 'briefings' && selectedBriefing ? (
              <motion.div key={selectedBriefing.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-start mb-12">
                  <h2 className="text-6xl font-impact uppercase italic text-white">{selectedBriefing.agentName}</h2>
                  <button onClick={() => requestDelete('briefings', selectedBriefing.id)} className="text-zinc-600 hover:text-red-marvel p-2"><Trash2 /></button>
                </div>
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800">
                    <div className="text-[10px] font-black text-zinc-500 uppercase mb-2">Email</div>
                    <div className="text-xl text-white">{selectedBriefing.email}</div>
                  </div>
                  <div className="bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800">
                    <div className="text-[10px] font-black text-zinc-500 uppercase mb-2">Fecha</div>
                    <div className="text-xl text-white">{selectedBriefing.createdAt?.toDate().toLocaleString()}</div>
                  </div>
                </div>
                <div className="mb-12">
                  <div className="text-[10px] font-black text-zinc-500 uppercase mb-4">Objetivo</div>
                  <div className="text-2xl text-white font-bold border-l-4 border-red-marvel pl-6">{selectedBriefing.objective}</div>
                </div>
                <div className="bg-zinc-900/50 p-10 rounded-3xl border border-zinc-800 font-mono text-zinc-300 whitespace-pre-wrap">
                  {selectedBriefing.details}
                </div>
              </motion.div>
            ) : activeTab === 'support' && selectedSupport ? (
              <motion.div key={selectedSupport.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-start mb-12">
                  <h2 className="text-6xl font-impact uppercase italic text-white">{selectedSupport.name}</h2>
                  <button onClick={() => requestDelete('support_messages', selectedSupport.id)} className="text-zinc-600 hover:text-red-marvel p-2"><Trash2 /></button>
                </div>
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800">
                    <div className="text-[10px] font-black text-zinc-500 uppercase mb-2">Email</div>
                    <div className="text-xl text-white">{selectedSupport.email}</div>
                  </div>
                  <div className="bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800">
                    <div className="text-[10px] font-black text-zinc-500 uppercase mb-2">Fecha</div>
                    <div className="text-xl text-white">{selectedSupport.createdAt?.toDate().toLocaleString()}</div>
                  </div>
                </div>
                <div className="mb-12">
                  <div className="text-[10px] font-black text-zinc-500 uppercase mb-4">Asunto</div>
                  <div className="text-2xl text-emerald-500 font-bold border-l-4 border-emerald-500 pl-6">{selectedSupport.subject}</div>
                </div>
                <div className="bg-zinc-900/50 p-10 rounded-3xl border border-zinc-800 font-mono text-zinc-300 whitespace-pre-wrap">
                  {selectedSupport.message}
                </div>
              </motion.div>
            ) : activeTab === 'projects' && selectedProject ? (
              <motion.div key={selectedProject.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {isEditingProject ? (
                  <form onSubmit={handleUpdateProject} className="space-y-6">
                    <h2 className="text-4xl font-impact uppercase italic text-white mb-8">Editar {selectedProject.name}</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">Nombre</label>
                        <input type="text" defaultValue={selectedProject.name} onChange={e => setEditProjectData({...editProjectData, name: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-white" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">Categoría</label>
                        <input type="text" defaultValue={selectedProject.category} onChange={e => setEditProjectData({...editProjectData, category: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-white" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">URL Imagen Portada</label>
                        <div className="flex gap-4 items-center">
                          <input type="url" defaultValue={selectedProject.thumbnail} onChange={e => setEditProjectData({...editProjectData, thumbnail: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-white" placeholder="O pega una URL de imagen" />
                          <input type="file" onChange={e => setImageFile(e.target.files?.[0] || null)} className="text-zinc-500 text-xs" />
                          <img src={(imageFile ? URL.createObjectURL(imageFile) : (editProjectData.thumbnail || selectedProject.thumbnail)) || null} className="w-16 h-16 rounded-lg object-cover border border-zinc-800" alt="Preview" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">Stack Tecnológico (separado por comas)</label>
                        <input type="text" defaultValue={selectedProject.techStack.join(', ')} onChange={e => setEditProjectData({...editProjectData, techStack: e.target.value.split(',').map(s => s.trim())})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-white" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">URL Proyecto (Live)</label>
                        <input type="url" defaultValue={selectedProject.liveUrl} onChange={e => setEditProjectData({...editProjectData, liveUrl: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-white" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">URL GitHub</label>
                        <input type="url" defaultValue={selectedProject.githubUrl} onChange={e => setEditProjectData({...editProjectData, githubUrl: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">Descripción</label>
                      <textarea defaultValue={selectedProject.shortDescription} onChange={e => setEditProjectData({...editProjectData, shortDescription: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-white" />
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="bg-red-marvel text-white font-impact uppercase italic py-4 px-8 rounded-xl hover:bg-red-600">Guardar Cambios</button>
                      <button type="button" onClick={() => setIsEditingProject(false)} className="bg-zinc-800 text-white font-impact uppercase italic py-4 px-8 rounded-xl hover:bg-zinc-700">Cancelar</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-12">
                      <div className="flex gap-8 items-center">
                        <img src={selectedProject.thumbnail || null} className="w-32 h-32 rounded-2xl object-cover border border-zinc-800" alt="" />
                        <div>
                          <h2 className="text-6xl font-impact uppercase italic text-white">{selectedProject.name}</h2>
                          <div className="flex gap-2 mt-2">
                            <span className="bg-red-marvel/20 text-red-marvel px-3 py-1 rounded-full text-[10px] font-black uppercase">{selectedProject.category}</span>
                            <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">{selectedProject.demoType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setIsEditingProject(true); setEditProjectData(selectedProject); }} className="text-zinc-600 hover:text-white p-2">Editar</button>
                        <button onClick={() => requestDelete('projects', selectedProject.id)} className="text-zinc-600 hover:text-red-marvel p-2"><Trash2 /></button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      <div className="bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800">
                        <div className="text-[10px] font-black text-zinc-500 uppercase mb-4">Enlaces</div>
                        <div className="space-y-4">
                          {selectedProject.liveUrl && (
                            <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white hover:text-red-marvel transition-colors">
                              <ExternalLink size={18} />
                              <span>Live Demo</span>
                            </a>
                          )}
                          {selectedProject.githubUrl && (
                            <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white hover:text-red-marvel transition-colors">
                              <Github size={18} />
                              <span>GitHub Repo</span>
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800">
                        <div className="text-[10px] font-black text-zinc-500 uppercase mb-4">Stack Tecnológico</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.techStack.map(tech => (
                            <span key={tech} className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-lg text-xs font-mono">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-12">
                      <div className="text-[10px] font-black text-zinc-500 uppercase mb-4">Descripción</div>
                      <p className="text-xl text-zinc-300 leading-relaxed">{selectedProject.shortDescription}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-800">
                <Terminal size={120} className="opacity-10 mb-8" />
                <p className="font-impact uppercase italic text-4xl tracking-widest">SISTEMA EN ESPERA</p>
                <p className="text-[10px] uppercase font-black tracking-[0.5em] mt-4">Selecciona un elemento para administrar</p>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer Status Bar */}
      <footer className="h-8 bg-black border-t border-zinc-900 flex items-center justify-between px-6 text-[8px] font-black uppercase tracking-[0.2em] text-zinc-600 relative z-20">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Servidor Central: ONLINE
          </span>
          <span>Briefings: {briefings.length}</span>
          <span>Soporte: {supportMessages.length}</span>
          <span>Proyectos: {projects.length}</span>
        </div>
        <div className="flex items-center gap-6">
          <span>© 2026 Bugle Corp // Vigilancia Digital</span>
        </div>
      </footer>

      {/* Custom Alert Modal */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl"
            >
              <AlertCircle className="w-16 h-16 text-red-marvel mx-auto mb-6" />
              <p className="text-white text-lg mb-8">{alertMessage}</p>
              <button onClick={() => setAlertMessage(null)} className="w-full bg-red-marvel text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-red-600 transition-colors">Entendido</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Confirm Modal */}
      <AnimatePresence>
        {deleteConfirmation && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl"
            >
              <Trash2 className="w-16 h-16 text-red-marvel mx-auto mb-6" />
              <h3 className="text-2xl font-impact uppercase italic text-white mb-4">¿Confirmar Eliminación?</h3>
              <p className="text-zinc-400 mb-8">Esta acción no se puede deshacer. El elemento será eliminado permanentemente de la base de datos.</p>
              <div className="flex gap-4 justify-center">
                <button onClick={confirmDelete} className="flex-1 bg-red-marvel text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-red-600 transition-colors">Eliminar</button>
                <button onClick={() => setDeleteConfirmation(null)} className="flex-1 bg-zinc-800 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors">Cancelar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CommanderPanel;
