
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mic, Users, Calendar, ArrowRight, Radio, MonitorPlay, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const ShapeDivider: React.FC = () => (
  <div className="flex items-center justify-center py-24 opacity-30">
    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-blue-600"></div>
    <div className="mx-4 w-2 h-2 bg-blue-600 rotate-45"></div>
    <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-blue-600"></div>
  </div>
);

const KeynoteCard: React.FC<{ 
  number: string; 
  title: string; 
  description: string; 
  tags?: string[];
  onClick?: (e: React.MouseEvent) => void;
}> = ({ number, title, description, tags, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    onClick={onClick}
    className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-b border-white/10 hover:bg-white/5 transition-colors duration-500 px-4 lg:px-8 cursor-pointer"
  >
    <div className="lg:col-span-2">
       <span className="text-5xl md:text-6xl font-['Oswald'] font-bold text-transparent text-stroke group-hover:text-blue-600 group-hover:text-stroke-0 transition-all duration-500 opacity-50">
         {number}
       </span>
    </div>

    <div className="lg:col-span-10 space-y-4">
      <h3 className="text-3xl md:text-4xl font-bold uppercase font-['Oswald'] text-white group-hover:text-blue-100 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-lg font-light leading-relaxed max-w-3xl group-hover:text-gray-200 transition-colors">
        {description}
      </p>
      {tags && (
         <div className="flex flex-wrap gap-3 pt-2">
           {tags.map(tag => (
             <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 text-gray-500 rounded group-hover:border-blue-600/30 group-hover:text-blue-400 transition-all">
               {tag}
             </span>
           ))}
         </div>
      )}
    </div>
    
    <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">
       <ArrowRight className="text-blue-600 w-8 h-8" />
    </div>
  </motion.div>
);

const FormatCard: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-8 flex flex-col items-center justify-center gap-6 text-center group border border-white/5 hover:border-blue-600/50 transition-all duration-300"
  >
    <div className="p-4 rounded-full bg-white/5 text-white group-hover:bg-blue-600 transition-colors duration-300">
      {icon}
    </div>
    <span className="text-sm font-bold uppercase tracking-widest text-gray-300 group-hover:text-white">{label}</span>
  </motion.div>
);

const Speaking: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dynamicThemes, setDynamicThemes] = useState<any[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  useEffect(() => {
    async function fetchLatestBlogs() {
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data, error } = await supabase
            .from('blogs')
            .select('id, title, excerpt, category')
            .order('created_at', { ascending: false })
            .limit(4);
          
          if (data && data.length > 0) {
            setDynamicThemes(data);
          }
        } catch (e) {
          console.error("Failed to sync latest insights for themes section", e);
        }
      }
    }
    fetchLatestBlogs();
  }, []);

  const handleNavigate = (e: React.MouseEvent, path: string) => {
    if (e && e.preventDefault) e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const defaultThemes = [
    {
      title: "The Power of Getting Uncomfortable",
      description: "How seeking friction and discomfort shapes professional philosophy. Lessons from high-altitude climbs to high-stakes sales cycles.",
      category: "Leadership"
    },
    {
      title: "The AI Renaissance in Supply Chain",
      description: "Moving beyond the buzzwords to the operational reality of machine learning in logistics and global trade.",
      category: "Technology"
    },
    {
      title: "How to Lead in MEA",
      description: "Navigating cultural intelligence, diversity, and ambition in one of the world's most complex operational regions.",
      category: "Management"
    },
    {
      title: "Scaling SaaS in Emerging Markets",
      description: "A documented transformation of GTM, partnerships, and people when building in MEA's hyper-growth markets.",
      category: "Growth"
    }
  ];

  const displayThemes = dynamicThemes.length > 0 ? dynamicThemes : defaultThemes;

  return (
    <section id="speaking" ref={containerRef} className="relative bg-[#050505] text-white min-h-screen pt-20 pb-24 overflow-hidden">
      
      {/* --- CINEMATIC HERO --- */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yImage, opacity: opacityHero }} className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dmnqlruhl/image/upload/v1763748388/WhatsApp_Image_2025-11-21_at_18.28.58_4a51f166_jwqpmm.jpg" 
            alt="Speaking Background" 
            className="w-full h-full object-cover grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <motion.div style={{ opacity: opacityHero, scale: scaleHero }} className="container mx-auto px-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-blue-600/30 bg-blue-600/5 backdrop-blur-md mb-10 shadow-[0_0_40px_rgba(37,99,235,0.15)] group hover:border-blue-500 transition-all">
               <Sparkles size={14} className="text-blue-500" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400">Global Keynote Speaker</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase font-['Oswald'] font-bold leading-[0.9] tracking-tighter text-white drop-shadow-2xl max-w-6xl mx-auto">
              <span className="block mb-2">Lessons From</span>
              <span className="text-transparent text-stroke-blue hover:text-white transition-all duration-700 block mb-2">Discomfort,</span>
              <span className="block mb-2">Decision-Making &</span>
              <span className="text-blue-600 relative inline-block">
                Transformation
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute -bottom-4 left-0 h-1 md:h-2 bg-blue-600/30 blur-sm rounded-full"
                />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mt-12 mb-16">
              Unfiltered insights on resilience, technology, and leadership from the front lines of MEA operations.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
               <a 
                 href="/contact" 
                 onClick={(e) => handleNavigate(e, '/contact')}
                 className="group relative px-10 py-5 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] rounded-sm hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-xl"
               >
                 Book for 2026 <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={14} />
               </a>
               <div className="flex flex-col items-start justify-center border-l border-white/10 pl-8">
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Priority Inquiries</span>
                  <span className="text-[9px] text-blue-500 uppercase tracking-widest font-bold">Processed Daily</span>
               </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/10">
           <div className="w-[1px] h-20 bg-gradient-to-b from-blue-600 to-transparent"></div>
           <span className="text-[7px] uppercase tracking-[0.6em] font-bold rotate-90 origin-left mt-10">Archive</span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-48 pt-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] border border-white/10 bg-[#0a0a0a] overflow-hidden group rounded-sm"
          >
             <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-10"></div>
             <motion.img 
               style={{ y: yParallax }}
               src="https://res.cloudinary.com/dmnqlruhl/image/upload/v1763748377/WhatsApp_Image_2025-11-21_at_18.28.58_df4c4473_nt2j2s.jpg" 
               alt="Speaking on Stage" 
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110" 
             />
             <div className="absolute bottom-0 left-0 p-8 z-20">
                <div className="glass backdrop-blur-md px-6 py-3 border-l-4 border-blue-600">
                  <p className="font-['Oswald'] text-2xl uppercase font-bold">Real Stories</p>
                  <p className="text-[10px] tracking-widest uppercase">No Theory. Only Experience.</p>
                </div>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs block">Mission</span>
              <h2 className="text-5xl md:text-7xl font-bold uppercase font-['Oswald'] leading-none">Why I <br/> Speak</h2>
            </div>
            <p className="text-2xl md:text-3xl font-['Syne'] font-bold text-white leading-tight">
              "Because stories move people. And people move companies."
            </p>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
              <p>
                I speak to share the leadership lessons learned from selling, hiking, failing, rising, negotiating, building teams, and digitizing supply chains across MEA.
              </p>
              <p>
                My talks are not theoretical. They come from the trenches: customer meetings, warehouses, mountains, airports, and boardrooms. I bring the dust of the road into the clarity of the stage.
              </p>
            </div>
            <a 
              href="/contact" 
              onClick={(e) => handleNavigate(e, '/contact')}
              className="group inline-flex items-center gap-4 text-blue-500 uppercase tracking-[0.4em] font-bold text-[10px] hover:text-white transition-all"
            >
              Inquire for your event <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </div>

        <ShapeDivider />

        {/* Dynamic Signature Themes populated from Blog Archive */}
        <div className="mb-48">
           <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
             <div>
               <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs block mb-4">Latest Insights</span>
               <h2 className="text-5xl md:text-8xl font-bold uppercase font-['Oswald'] leading-none text-white">Signature <br/> Themes</h2>
             </div>
             <p className="text-gray-500 max-w-sm text-sm font-light leading-relaxed">
               Strategic narratives and operational blueprints from the most recent archive entries.
             </p>
           </div>

           <div className="flex flex-col">
              {displayThemes.map((theme, idx) => (
                <KeynoteCard 
                  key={theme.id || idx}
                  number={`0${idx + 1}`}
                  title={theme.title}
                  description={theme.excerpt || theme.description}
                  tags={theme.category ? [theme.category] : [theme.category || "Strategic"]}
                  onClick={(e) => {
                    const path = theme.id ? `/blog?id=${theme.id}` : '/blog';
                    handleNavigate(e, path);
                  }}
                />
              ))}
           </div>
        </div>

        <ShapeDivider />

        <div className="mb-32">
           <div className="text-center mb-24">
              <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs block mb-4">Availability</span>
              <h2 className="text-5xl md:text-7xl font-bold uppercase font-['Oswald']">Formats</h2>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <FormatCard icon={<Mic size={24} />} label="Keynotes" />
              <FormatCard icon={<Users size={24} />} label="Panels" />
              <FormatCard icon={<MonitorPlay size={24} />} label="Workshops" />
              <FormatCard icon={<Calendar size={24} />} label="Corporate Events" />
              <FormatCard icon={<Radio size={24} />} label="Podcasts" />
           </div>
        </div>
      </div>
    </section>
  );
};

export default Speaking;
