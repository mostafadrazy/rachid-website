
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Calendar, ChevronRight, Share2, Database, ExternalLink } from 'lucide-react';
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

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setConfigError(true);
      setLoading(false);
      return;
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Supabase Error:", error);
        setConfigError(true);
      } else if (data) {
        setPosts(data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setConfigError(true);
    }
    setLoading(false);
  };

  if (configError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32">
        <div className="max-w-2xl w-full glass p-12 border border-blue-500/20 text-center">
          <Database size={48} className="text-blue-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold font-['Oswald'] uppercase mb-4 text-white">Database Link Required</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            The archive system is ready, but it needs a valid Supabase connection. 
            Please update your credentials in <code className="text-blue-400">components/supabaseClient.ts</code>.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="https://supabase.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Open Supabase <ExternalLink size={14} />
            </a>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all"
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
        className="min-h-screen bg-black pt-32 pb-20"
      >
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-blue-500 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Archive</span>
          </button>

          <div className="relative aspect-video w-full mb-12 rounded-sm overflow-hidden border border-white/10">
            <img src={selectedPost.image_url} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>

          <div className="flex items-center gap-6 mb-8 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2 text-blue-500"><Tag size={12}/> {selectedPost.category}</span>
            <span className="flex items-center gap-2"><Calendar size={12}/> {new Date(selectedPost.created_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><Clock size={12}/> {selectedPost.read_time}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-['Oswald'] uppercase leading-none mb-12 text-white">
            {selectedPost.title}
          </h1>

          <div className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed space-y-6 font-light">
             {selectedPost.content.split('\n').map((para, i) => (
               <p key={i}>{para}</p>
             ))}
          </div>
          
          <div className="mt-20 pt-12 border-t border-white/10 flex justify-between items-center">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">R</div>
                <div>
                   <p className="text-xs font-bold uppercase tracking-widest">Rachid</p>
                   <p className="text-[10px] text-gray-500">Supply Chain Leader</p>
                </div>
             </div>
             <button className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <Share2 size={16} />
             </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 overflow-hidden relative">
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
                onClick={() => setSelectedPost(post)}
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
