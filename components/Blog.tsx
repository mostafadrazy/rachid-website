
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Calendar, ChevronRight, Share2, Database, ExternalLink, Check } from 'lucide-react';
import { supabase, isSupabaseConfigured } from './supabaseClient';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url: string;
  category: string;
  read_time: string;
  created_at: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setConfigError(true);
      setLoading(false);
      return;
    }
    
    const initializeBlog = async () => {
      const fetchedPosts = await fetchPosts();
      
      // Check for 'id' parameter in URL to deep-link to a specific post
      const params = new URLSearchParams(window.location.search);
      const postId = params.get('id');
      
      if (postId && fetchedPosts) {
        const post = fetchedPosts.find(p => p.id === postId);
        if (post) {
          setSelectedPost(post);
        }
      }
    };
    
    initializeBlog();
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const postId = params.get('id');
      
      if (!postId) {
        setSelectedPost(null);
      } else if (posts.length > 0) {
        const post = posts.find(p => p.id === postId);
        if (post) {
          setSelectedPost(post);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [posts]);

  const fetchPosts = async (): Promise<BlogPost[] | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Supabase Error:", error);
        setConfigError(true);
        return null;
      } else if (data) {
        setPosts(data);
        setLoading(false);
        return data as BlogPost[];
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setConfigError(true);
    }
    setLoading(false);
    return null;
  };

  const handleBackToArchive = () => {
    setSelectedPost(null);
    window.history.pushState({}, '', '/blog');
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.history.pushState({}, '', `/blog?id=${post.id}`);
    window.scrollTo(0, 0);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (configError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32 text-white">
        <div className="max-w-2xl w-full glass p-12 border border-blue-500/20 text-center">
          <Database size={48} className="text-blue-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold font-['Oswald'] uppercase mb-4">Database Link Required</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            The archive system is ready, but it needs a valid Supabase connection. 
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Retry Sync
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black pt-32 pb-20 text-white"
      >
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <button 
            onClick={handleBackToArchive}
            className="flex items-center gap-2 text-blue-500 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Archive</span>
          </button>

          <div className="relative aspect-video w-full mb-12 rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            <img src={selectedPost.image_url} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>

          <div className="flex items-center gap-6 mb-8 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2 text-blue-500 bg-blue-600/10 px-3 py-1 border border-blue-600/20"><Tag size={12}/> {selectedPost.category}</span>
            <span className="flex items-center gap-2"><Calendar size={12}/> {new Date(selectedPost.created_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><Clock size={12}/> {selectedPost.read_time}</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-['Oswald'] uppercase leading-[0.9] tracking-tighter mb-12 text-white">
            {selectedPost.title}
          </h1>

          <div 
            className="prose-container prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed font-light"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />
          
          <div className="mt-24 pt-12 border-t border-white/10 flex justify-between items-center">
             <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full border border-blue-600 p-1">
                  <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">R</div>
                </div>
                <div>
                   <p className="text-sm font-bold uppercase tracking-widest">Rachid</p>
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Global Supply Chain Leader</p>
                </div>
             </div>
             <button 
               onClick={handleShare}
               className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group relative"
               title="Copy Link"
             >
                {copied ? <Check size={16} /> : <Share2 size={16} className="group-hover:scale-110 transition-transform" />}
             </button>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .prose-container h1, .prose-container h2, .prose-container h3 { font-family: 'Oswald', sans-serif; text-transform: uppercase; margin-top: 3rem; margin-bottom: 1.5rem; color: #fff; }
          .prose-container h1 { font-size: 3rem; border-bottom: 1px solid rgba(37,99,235,0.2); padding-bottom: 1rem; }
          .prose-container h2 { font-size: 2rem; color: #2563eb; }
          .prose-container h3 { font-size: 1.5rem; }
          .prose-container p { margin-bottom: 1.75rem; line-height: 1.9; }
          .prose-container ul, .prose-container ol { margin-bottom: 2rem; margin-left: 1.5rem; }
          .prose-container li { margin-bottom: 0.75rem; }
          .prose-container img { margin: 3rem auto; border: 1px solid rgba(255,255,255,0.05); shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
          .prose-container a { color: #2563eb; font-weight: 600; transition: opacity 0.3s; }
          .prose-container a:hover { opacity: 0.8; }
          .prose-container blockquote { border-left: 4px solid #2563eb; padding-left: 2rem; margin: 3rem 0; font-family: 'Syne', sans-serif; font-size: 1.5rem; font-style: italic; color: #e5e7eb; }
        `}} />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 overflow-hidden relative text-white">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <header className="mb-20">
          <span className="text-blue-600 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Archive & Insights</span>
          <h2 className="text-6xl md:text-9xl font-bold uppercase font-['Oswald'] leading-[0.8] tracking-tighter text-white">
            Strategic <br/> <span className="text-transparent text-stroke-blue">Perspective</span>
          </h2>
        </header>

        {loading ? (
          <div className="flex justify-center py-40">
            <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ y: -10 }}
                onClick={() => handlePostClick(post)}
                className="group relative h-[500px] bg-[#0a0a0a] border border-white/10 overflow-hidden cursor-pointer rounded-sm"
              >
                <div className="absolute inset-0 z-0">
                  <img src={post.image_url} className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-4 mb-4 text-[9px] font-bold uppercase tracking-widest text-blue-400">
                    <span className="bg-blue-600/20 px-2 py-1 border border-blue-500/20">{post.category}</span>
                    <span>{post.read_time}</span>
                  </div>
                  <h3 className="text-3xl font-bold font-['Oswald'] uppercase text-white leading-none mb-4 group-hover:text-blue-100 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold uppercase text-[9px] tracking-[0.3em]">
                    Read Analysis <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-700"></div>
              </motion.div>
            ))}
            {posts.length === 0 && !loading && (
              <div className="col-span-full py-24 text-center border border-dashed border-white/10 text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold">
                Archive currently empty. Check back for future transmissions.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
