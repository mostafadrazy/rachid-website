
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Trash2, Plus, LogOut, ExternalLink, Database, Lock, ChevronRight, ShieldAlert, Activity, AlertCircle, X, ShieldQuestion } from 'lucide-react';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const Admin: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [unconfigured, setUnconfigured] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const [currentPost, setCurrentPost] = useState({
    id: '',
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image_url: '',
    category: '',
    read_time: ''
  });

  const ADMIN_ACCESS_KEY = "admin123";

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setUnconfigured(true);
      return;
    }
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setPosts(data);
    } catch (e) {
      console.error("Fetch failed:", e);
      if (!posts.length) setUnconfigured(true);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_ACCESS_KEY) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    
    const slug = currentPost.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const postData = { 
      title: currentPost.title,
      slug: slug,
      content: currentPost.content,
      excerpt: currentPost.excerpt,
      image_url: currentPost.image_url,
      category: currentPost.category,
      read_time: currentPost.read_time
    };

    try {
      if (currentPost.id) {
        const { error } = await supabase.from('blogs').update(postData).eq('id', currentPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blogs').insert([postData]);
        if (error) throw error;
      }
      setIsEditing(false);
      resetForm();
      fetchPosts();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Error saving transmission.");
    }
  };

  const resetForm = () => {
    setCurrentPost({ id: '', title: '', slug: '', content: '', excerpt: '', image_url: '', category: '', read_time: '' });
  };

  const executeDelete = async (id: string | null) => {
    if (!id || !supabase) {
      console.error("Delete Aborted: Missing ID or Supabase client", { id, supabaseExists: !!supabase });
      return;
    }

    setIsDeletingId(id);
    console.info(`Protocol Initiated: Purging record ${id}...`);

    try {
      const { error, status } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Supabase Deletion Error:", error);
        throw error;
      }

      console.info(`Protocol Success: Status ${status}. Record removed from database.`);
      
      // Update local state immediately for snappy UI
      setPosts(prev => prev.filter(post => post.id !== id));
      setShowDeleteConfirm(null);
    } catch (err: any) {
      console.error("Execution failed:", err);
      alert(`PURGE FAILED: ${err.message || "Unknown Database Error"}. Ensure you have set the DELETE policy in Supabase.`);
    } finally {
      setIsDeletingId(null);
    }
  };

  if (unconfigured) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 pt-32 text-white">
        <div className="max-w-2xl w-full glass p-10 border border-blue-500/20 shadow-2xl">
          <Database size={40} className="text-blue-500 mb-6" />
          <h2 className="text-2xl font-bold font-['Oswald'] uppercase mb-4 tracking-tight">Terminal Disconnected</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            The blog archive requires a valid database link. Ensure you have run the SQL setup and updated your credentials in <code className="text-blue-400">supabaseClient.ts</code>.
          </p>
          <button onClick={() => window.location.reload()} className="w-full py-4 bg-blue-600 text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 transition-all">
            Restart Connection
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 pt-32 text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full glass p-12 border border-white/10 relative z-10 text-center">
          <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Lock className="text-blue-500" size={32} />
          </div>
          <h2 className="text-3xl font-bold font-['Oswald'] uppercase mb-2">Access Control</h2>
          <form onSubmit={handleLogin} className="space-y-6 text-left mt-8">
            <input 
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError(false);
              }}
              className={`w-full bg-black/50 border ${loginError ? 'border-red-500' : 'border-white/10'} p-4 text-white focus:border-blue-500 outline-none transition-all text-center tracking-[0.5em] font-mono`}
              placeholder="••••••••"
            />
            <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-blue-600 hover:text-white transition-all">
              Initialize Terminal
            </button>
          </form>
          <p className="mt-8 text-[9px] text-white/20 uppercase tracking-[0.4em]">admin123</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-12 overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
           <div>
             <h1 className="text-5xl md:text-6xl font-bold font-['Oswald'] uppercase tracking-tighter">Command <span className="text-transparent text-stroke-blue">Center</span></h1>
             <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               Status: Synchronized // Files: {posts.length}
             </p>
           </div>
           <div className="flex gap-4">
             <button onClick={() => setIsAuthenticated(false)} className="px-6 py-3 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-red-900/20 transition-all">Sign Out</button>
             {!isEditing && (
               <button onClick={() => { resetForm(); setIsEditing(true); }} className="bg-blue-600 px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2">
                 <Plus size={14} /> New Transmission
               </button>
             )}
           </div>
        </div>

        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.form key="editor" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleSave} className="glass p-12 border border-white/10 max-w-5xl mx-auto shadow-2xl relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <input type="text" value={currentPost.title} onChange={e => setCurrentPost({...currentPost, title: e.target.value})} className="w-full bg-black/50 border border-white/10 p-5 text-white focus:border-blue-500 outline-none" placeholder="Title" required />
                <input type="text" value={currentPost.image_url} onChange={e => setCurrentPost({...currentPost, image_url: e.target.value})} className="w-full bg-black/50 border border-white/10 p-5 text-white focus:border-blue-500 outline-none" placeholder="Image URL" required />
                <input type="text" value={currentPost.category} onChange={e => setCurrentPost({...currentPost, category: e.target.value})} className="w-full bg-black/50 border border-white/10 p-5 text-white focus:border-blue-500 outline-none" placeholder="Category" />
                <input type="text" value={currentPost.read_time} onChange={e => setCurrentPost({...currentPost, read_time: e.target.value})} className="w-full bg-black/50 border border-white/10 p-5 text-white focus:border-blue-500 outline-none" placeholder="Read Time" />
              </div>
              <textarea value={currentPost.excerpt} onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})} className="w-full bg-black/50 border border-white/10 p-5 text-white focus:border-blue-500 outline-none h-24 mb-6" placeholder="Excerpt" />
              <textarea value={currentPost.content} onChange={e => setCurrentPost({...currentPost, content: e.target.value})} className="w-full bg-black/50 border border-white/10 p-5 text-white focus:border-blue-500 outline-none h-80 mb-10 font-mono text-sm" placeholder="Content (Markdown supported)" required />
              <div className="flex justify-end gap-4">
                 <button type="button" onClick={() => setIsEditing(false)} className="px-10 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-red-900/10 transition-all">Abort</button>
                 <button type="submit" className="bg-white text-black px-12 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2">
                    <Save size={14}/> Save Transmission
                 </button>
              </div>
            </motion.form>
          ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {posts.map(post => (
                <div key={post.id} className="relative glass p-8 border border-white/5 flex flex-col group hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                        <img src={post.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                     </div>
                     <div className="flex gap-2 relative z-20">
                        <button onClick={() => { setCurrentPost(post); setIsEditing(true); }} className="p-3 bg-white/5 hover:bg-blue-600 transition-colors rounded-sm"><ExternalLink size={16} /></button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(post.id); }} 
                          className="p-3 bg-white/5 hover:bg-red-600 transition-colors rounded-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
                  <div className="flex-grow">
                     <span className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-2 block">{post.category}</span>
                     <h3 className="font-bold text-xl font-['Oswald'] uppercase tracking-tight mb-3 text-white">{post.title}</h3>
                     <p className="text-gray-500 text-xs line-clamp-2 font-light leading-relaxed mb-6">{post.excerpt}</p>
                  </div>
                  <div className="pt-6 border-t border-white/5 text-[9px] text-white/30 uppercase tracking-widest flex justify-between">
                     <span className="flex items-center gap-2"><Activity size={10} className="text-blue-500" /> ID: {post.id.substring(0,8)}</span>
                     <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CUSTOM SPATIAL DELETE MODAL */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowDeleteConfirm(null)}
              className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass border border-red-500/20 p-10 text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600/50"></div>
              <div className="w-16 h-16 bg-red-600/10 border border-red-600/20 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500">
                <ShieldQuestion size={32} />
              </div>
              <h3 className="text-2xl font-bold font-['Oswald'] uppercase mb-4 text-white">Critical Alert</h3>
              <p className="text-gray-400 mb-10 leading-relaxed text-sm">
                Are you sure you want to permanently <span className="text-white font-bold">TERMINATE</span> this transmission? This action is irreversible.
              </p>
              <div className="flex flex-col gap-3">
                 <button 
                  onClick={() => executeDelete(showDeleteConfirm)} 
                  disabled={isDeletingId !== null}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
                 >
                   {isDeletingId ? <Activity size={14} className="animate-spin" /> : <Trash2 size={14} />}
                   {isDeletingId ? "Executing..." : "Confirm Purge"}
                 </button>
                 <button 
                  onClick={() => setShowDeleteConfirm(null)}
                  className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold uppercase tracking-widest text-xs transition-all"
                 >
                   Abort Protocol
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
