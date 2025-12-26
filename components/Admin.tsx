
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, Trash2, Plus, ExternalLink, Database, Lock, 
  Activity, ShieldQuestion, Bold, Italic, Underline, List, ListOrdered, 
  Heading1, Heading2, Heading3, Image as ImageIcon, 
  Code, Eye, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon,
  Highlighter
} from 'lucide-react';
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
  const [editMode, setEditMode] = useState<'visual' | 'html'>('visual');
  const visualEditorRef = useRef<HTMLDivElement>(null);
  
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
    
    let finalContent = currentPost.content;
    if (editMode === 'visual' && visualEditorRef.current) {
      finalContent = visualEditorRef.current.innerHTML;
    }

    const slug = currentPost.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const postData = { 
      title: currentPost.title,
      slug: slug,
      content: finalContent,
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
    setEditMode('visual');
  };

  const executeDelete = async (id: string | null) => {
    if (!id || !supabase) return;
    setIsDeletingId(id);
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      setPosts(prev => prev.filter(post => post.id !== id));
      setShowDeleteConfirm(null);
    } catch (err: any) {
      alert(`PURGE FAILED: ${err.message || "Unknown Error"}`);
    } finally {
      setIsDeletingId(null);
    }
  };

  // --- EDITOR LOGIC ---

  // Helper to execute commands without losing focus
  const execCmd = (command: string, value: any = null) => {
    // Ensure focus is in the editor
    if (visualEditorRef.current) {
        visualEditorRef.current.focus();
    }
    document.execCommand(command, false, value);
    updateContentFromVisual();
  };

  // We use onMouseDown with preventDefault for toolbar buttons to avoid blurring the editor
  const handleToolbarAction = (e: React.MouseEvent, command: string, value: any = null) => {
    e.preventDefault();
    execCmd(command, value);
  };

  const insertImage = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Save current selection before prompt blurs focus
    const selection = window.getSelection();
    const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    
    const url = prompt("Enter Direct Image URL:");
    
    // Restore focus to editor
    if (visualEditorRef.current) {
        visualEditorRef.current.focus();
    }
    
    // Restore selection range
    if (range) {
        const sel = window.getSelection();
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    if (url) {
      // We insert HTML directly to ensure style control
      const imgHtml = `<img src="${url}" style="max-width:100%; height:auto; display:block; margin: 2rem auto; border-radius: 4px; border:1px solid rgba(255,255,255,0.1);" />`;
      document.execCommand('insertHTML', false, imgHtml);
      updateContentFromVisual();
    }
  };

  const insertLink = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Save current selection
    const selection = window.getSelection();
    const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    const url = prompt("Enter Link URL:", "https://");
    
    // Restore focus
    if (visualEditorRef.current) {
        visualEditorRef.current.focus();
    }
    
    // Restore selection
    if (range) {
        const sel = window.getSelection();
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    if (url) {
      document.execCommand('createLink', false, url);
      updateContentFromVisual();
    }
  };

  const updateContentFromVisual = () => {
    if (visualEditorRef.current) {
      setCurrentPost(prev => ({ ...prev, content: visualEditorRef.current!.innerHTML }));
    }
  };

  // Paste handler to preserve Word formatting as much as possible
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const html = e.clipboardData.getData('text/html');

    if (html) {
      // Basic sanitization if needed, but here we prioritize preserving format
      document.execCommand('insertHTML', false, html);
    } else {
      document.execCommand('insertText', false, text);
    }
    updateContentFromVisual();
  };

  const handleModeSwitch = (mode: 'visual' | 'html') => {
    if (mode === 'html' && visualEditorRef.current) {
      setCurrentPost(prev => ({ ...prev, content: visualEditorRef.current!.innerHTML }));
    }
    setEditMode(mode);
  };

  if (unconfigured) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 pt-32 text-white">
        <div className="max-w-2xl w-full glass p-10 border border-blue-500/20 shadow-2xl">
          <Database size={40} className="text-blue-500 mb-6" />
          <h2 className="text-2xl font-bold font-['Oswald'] uppercase mb-4 tracking-tight">Terminal Disconnected</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            The blog archive requires a valid database link. Ensure you have run the SQL setup and updated your credentials.
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
            <motion.form key="editor" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleSave} className="glass p-8 md:p-12 border border-white/10 max-w-6xl mx-auto shadow-2xl relative">
              
              <div className="flex flex-col lg:flex-row gap-8 md:gap-10 mb-8 md:mb-10">
                <div className="flex-grow space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <input type="text" value={currentPost.title} onChange={e => setCurrentPost({...currentPost, title: e.target.value})} className="w-full bg-black/50 border border-white/10 p-4 md:p-5 text-white focus:border-blue-500 outline-none" placeholder="Transmission Title" required />
                    <input type="text" value={currentPost.image_url} onChange={e => setCurrentPost({...currentPost, image_url: e.target.value})} className="w-full bg-black/50 border border-white/10 p-4 md:p-5 text-white focus:border-blue-500 outline-none" placeholder="Header Hero Image URL" required />
                    <input type="text" value={currentPost.category} onChange={e => setCurrentPost({...currentPost, category: e.target.value})} className="w-full bg-black/50 border border-white/10 p-4 md:p-5 text-white focus:border-blue-500 outline-none" placeholder="Sector / Category" />
                    <input type="text" value={currentPost.read_time} onChange={e => setCurrentPost({...currentPost, read_time: e.target.value})} className="w-full bg-black/50 border border-white/10 p-4 md:p-5 text-white focus:border-blue-500 outline-none" placeholder="Sync Duration (e.g. 5 min read)" />
                  </div>
                  <textarea value={currentPost.excerpt} onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})} className="w-full bg-black/50 border border-white/10 p-4 md:p-5 text-white focus:border-blue-500 outline-none h-20 md:h-24" placeholder="Brief Summary (Excerpt)" />
                </div>
                
                <div className="lg:w-1/3">
                  <div className="h-full min-h-[150px] md:min-h-[200px] border border-white/10 bg-black/30 rounded-lg overflow-hidden flex flex-col">
                    <div className="p-3 border-b border-white/10 bg-white/5 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                       <ImageIcon size={12} className="text-blue-500" /> Hero Preview
                    </div>
                    <div className="flex-grow flex items-center justify-center bg-checkered p-4 overflow-hidden">
                      {currentPost.image_url ? (
                        <img src={currentPost.image_url} className="max-w-full max-h-[250px] object-contain shadow-2xl" alt="Preview" />
                      ) : (
                        <div className="text-gray-700 text-[10px] uppercase font-bold tracking-widest">No Hero Linked</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Editor Controls */}
              <div className="mb-0 flex flex-wrap items-center justify-between gap-4 p-3 md:p-4 border border-white/10 bg-white/5 rounded-t-lg sticky top-24 md:top-32 z-30 backdrop-blur-md">
                <div className="flex items-center gap-2">
                   <button 
                    type="button" 
                    onClick={() => handleModeSwitch('visual')}
                    className={`px-3 md:px-4 py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${editMode === 'visual' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'hover:bg-white/5'}`}
                   >
                     <Eye size={14} /> Visual
                   </button>
                   <button 
                    type="button" 
                    onClick={() => handleModeSwitch('html')}
                    className={`px-3 md:px-4 py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${editMode === 'html' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'hover:bg-white/5'}`}
                   >
                     <Code size={14} /> Source
                   </button>
                </div>

                {editMode === 'visual' && (
                  <div className="flex flex-wrap items-center gap-1">
                    <div className="flex gap-1 items-center px-1 md:px-2 border-r border-white/10">
                      <button type="button" title="Heading 1" onMouseDown={(e) => handleToolbarAction(e, 'formatBlock', 'H1')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors"><Heading1 size={16} /></button>
                      <button type="button" title="Heading 2" onMouseDown={(e) => handleToolbarAction(e, 'formatBlock', 'H2')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors"><Heading2 size={16} /></button>
                      <button type="button" title="Heading 3" onMouseDown={(e) => handleToolbarAction(e, 'formatBlock', 'H3')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors"><Heading3 size={16} /></button>
                      <select onChange={(e) => execCmd('fontSize', e.target.value)} className="bg-black/50 border border-white/10 text-[9px] px-1 py-0.5 outline-none text-white ml-1">
                        <option value="3">Size</option>
                        <option value="1">Small</option>
                        <option value="3">Normal</option>
                        <option value="5">Large</option>
                        <option value="7">XL</option>
                      </select>
                    </div>

                    <div className="flex gap-1 items-center px-1 md:px-2 border-r border-white/10">
                      <button type="button" title="Bold" onMouseDown={(e) => handleToolbarAction(e, 'bold')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors"><Bold size={16} /></button>
                      <button type="button" title="Italic" onMouseDown={(e) => handleToolbarAction(e, 'italic')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors"><Italic size={16} /></button>
                      <button type="button" title="Underline" onMouseDown={(e) => handleToolbarAction(e, 'underline')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors"><Underline size={16} /></button>
                      <button type="button" title="Highlight" onMouseDown={(e) => handleToolbarAction(e, 'backColor', '#2563eb')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors text-blue-500"><Highlighter size={16} /></button>
                    </div>

                    <div className="flex gap-1 items-center px-1 md:px-2 border-r border-white/10">
                      <button type="button" title="Align Left" onMouseDown={(e) => handleToolbarAction(e, 'justifyLeft')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors"><AlignLeft size={16} /></button>
                      <button type="button" title="Align Center" onMouseDown={(e) => handleToolbarAction(e, 'justifyCenter')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors"><AlignCenter size={16} /></button>
                      <button type="button" title="Align Right" onMouseDown={(e) => handleToolbarAction(e, 'justifyRight')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors"><AlignRight size={16} /></button>
                    </div>

                    <div className="flex gap-1 items-center px-1 md:px-2">
                      <button type="button" title="Bullet List" onMouseDown={(e) => handleToolbarAction(e, 'insertUnorderedList')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors"><List size={16} /></button>
                      <button type="button" title="Numbered List" onMouseDown={(e) => handleToolbarAction(e, 'insertOrderedList')} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors"><ListOrdered size={16} /></button>
                      <button type="button" title="Insert Link" onMouseDown={insertLink} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors text-blue-400"><LinkIcon size={16} /></button>
                      <button type="button" title="Insert Image" onMouseDown={insertImage} className="p-1.5 md:p-2 hover:bg-white/10 transition-colors text-green-400"><ImageIcon size={16} /></button>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Editor Area */}
              <div className="relative mb-10 min-h-[600px] border border-white/10 bg-black/20 overflow-hidden">
                {editMode === 'visual' ? (
                  <div 
                    ref={visualEditorRef}
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: currentPost.content }}
                    onBlur={updateContentFromVisual}
                    onInput={updateContentFromVisual}
                    onPaste={handlePaste}
                    className="visual-editor-root p-6 md:p-12 outline-none prose prose-invert max-w-none min-h-[600px] font-light leading-relaxed text-gray-200 overflow-y-auto"
                    data-placeholder="Commence data entry... (Direct Paste from Word/Docs supported)"
                  />
                ) : (
                  <textarea 
                    value={currentPost.content} 
                    onChange={e => setCurrentPost({...currentPost, content: e.target.value})} 
                    className="w-full bg-black/50 p-6 md:p-12 text-blue-400 focus:border-blue-500 outline-none h-[600px] font-mono text-sm leading-relaxed border-none" 
                    placeholder="Enter raw HTML protocol..." 
                    required 
                  />
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-end gap-4">
                 <button type="button" onClick={() => setIsEditing(false)} className="px-10 py-4 md:py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-red-900/10 transition-all">Abort Transmission</button>
                 <button type="submit" className="bg-white text-black px-12 py-4 md:py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Save size={14}/> Save Archive
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
      
      {/* Advanced Visual Editor Styles - Supporting Word Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .visual-editor-root { min-height: 600px; color: #e5e7eb; }
        .visual-editor-root:empty:before { content: attr(data-placeholder); color: #444; pointer-events: none; }
        .visual-editor-root h1 { font-size: 3.5rem; font-weight: 700; margin-bottom: 2rem; text-transform: uppercase; font-family: 'Oswald', sans-serif; border-left: 8px solid #2563eb; padding-left: 1.5rem; color: #fff; line-height: 1; }
        .visual-editor-root h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; text-transform: uppercase; font-family: 'Oswald', sans-serif; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 0.75rem; color: #fff; }
        .visual-editor-root h3 { font-size: 1.8rem; font-weight: 600; margin-bottom: 1.25rem; text-transform: uppercase; font-family: 'Oswald', sans-serif; color: #2563eb; }
        .visual-editor-root p { margin-bottom: 1.5rem; line-height: 1.9; font-size: 1.15rem; }
        .visual-editor-root ul { list-style-type: disc; margin-left: 2.5rem; margin-bottom: 1.75rem; }
        .visual-editor-root ol { list-style-type: decimal; margin-left: 2.5rem; margin-bottom: 1.75rem; }
        .visual-editor-root blockquote { border-left: 4px solid #2563eb; padding-left: 1.5rem; font-style: italic; color: #9ca3af; margin: 2rem 0; background: rgba(37,99,235,0.05); padding: 2rem; font-family: 'Syne', sans-serif; }
        .visual-editor-root img { max-width: 100%; height: auto; border: 1px solid rgba(255,255,255,0.1); margin: 2.5rem auto; display: block; box-shadow: 0 30px 60px rgba(0,0,0,0.5); border-radius: 6px; }
        .visual-editor-root a { color: #2563eb; text-decoration: underline; font-weight: 600; cursor: pointer; }
        .visual-editor-root * { font-family: 'Inter', sans-serif; }
        
        /* Handling Word's Inline Styles and Pasted Content */
        .visual-editor-root span[style*="font-size"], 
        .visual-editor-root font[style*="font-size"] { font-size: inherit; }
        .visual-editor-root [style*="mso-"] { display: initial; } /* Don't hide mso stuff if it affects layout */
        
        /* Font size mapping for document.execCommand */
        .visual-editor-root font[size="1"] { font-size: 0.8rem; }
        .visual-editor-root font[size="2"] { font-size: 0.95rem; }
        .visual-editor-root font[size="3"] { font-size: 1.15rem; }
        .visual-editor-root font[size="4"] { font-size: 1.35rem; }
        .visual-editor-root font[size="5"] { font-size: 1.75rem; }
        .visual-editor-root font[size="6"] { font-size: 2.25rem; }
        .visual-editor-root font[size="7"] { font-size: 3.5rem; }
      `}} />
    </div>
  );
};

export default Admin;
