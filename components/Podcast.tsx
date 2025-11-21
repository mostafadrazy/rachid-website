
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Mic, Globe, Heart, Radio, Users, CirclePlay, ArrowRight, Activity, Headphones, Target, Layers, Rss, Cast, Play, Share2 } from 'lucide-react';

// --- Brand Icons ---
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.6 1.44.539.3.719.96.418 1.5-.299.48-.96.66-1.439.36z"/>
  </svg>
);

const AppleIcon = () => (
   <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.9 3.8-.75c.52.01 3.75.23 5.09 2.62-4.31 2.36-3.46 8.86 1.28 10.58-.65 1.4-1.45 2.65-2.49 3.78-.9.98-2.03 1.94-2.76 1.94v.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
   </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// --- 3D Tilt Card Component ---
const Tilt3DCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left - width / 2) / 25);
    y.set((clientY - top - height / 2) / 25);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX: mouseY,
        rotateY: mouseX,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Visual Components ---

const AudioWaveParams: React.FC = () => (
    <div className="absolute inset-0 flex items-end justify-center gap-2 opacity-20 pointer-events-none mask-image-gradient-to-t">
        {[...Array(20)].map((_, i) => (
            <motion.div 
                key={i}
                className="w-2 md:w-4 bg-blue-600 rounded-t-lg"
                animate={{ height: ["10%", `${Math.random() * 60 + 20}%`, "10%"] }}
                transition={{
                    duration: Math.random() * 1.5 + 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.05
                }}
            />
        ))}
    </div>
);

const SignalLine: React.FC<{ vertical?: boolean }> = ({ vertical }) => (
    <div className={`absolute bg-blue-900/30 ${vertical ? 'w-[1px] h-full left-6' : 'h-[1px] w-full top-1/2'}`}>
        <div className={`absolute bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] ${vertical ? 'w-full h-12 top-0 animate-scan-vertical' : 'h-full w-12 left-0 animate-scan-horizontal'}`}></div>
    </div>
);

const Podcast: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="podcast" ref={containerRef} className="relative bg-[#050505] text-white min-h-screen pt-32 pb-24 overflow-hidden perspective-1000">
      
      {/* Deep Space Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#050505] pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[150px]"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="relative h-[70vh] flex flex-col justify-center items-center text-center mb-24">
           <AudioWaveParams />
           
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="relative z-10"
           >
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Coming 2025</span>
             </div>

             <h1 className="text-7xl md:text-9xl font-bold uppercase font-['Oswald'] tracking-tighter leading-[0.85] mb-6 drop-shadow-2xl">
               Supply Chain <br/>
               <span className="text-transparent text-stroke-blue relative">Innovators</span>
             </h1>
             
             <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-12">
               The unfiltered voice of MEA’s operational leaders. <br/>
               <span className="text-white font-medium">Strategic. Human. Future-Ready.</span>
             </p>

             {/* Floating Glass Dock */}
             <motion.div 
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.4, duration: 0.8 }}
               className="inline-flex flex-wrap justify-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
             >
                {[
                  { icon: <SpotifyIcon />, label: "Spotify" },
                  { icon: <AppleIcon />, label: "Apple" },
                  { icon: <YouTubeIcon />, label: "YouTube" },
                  { icon: <Rss size={18} />, label: "RSS" },
                ].map((platform, idx) => (
                  <a 
                    key={idx}
                    href="#"
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-black/40 border border-white/5 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all duration-300 group"
                  >
                    <span className="text-gray-400 group-hover:text-white transition-colors">{platform.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-300 group-hover:text-white">{platform.label}</span>
                  </a>
                ))}
             </motion.div>
           </motion.div>
        </div>


        {/* --- THE MISSION (Spatial Split) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-48">
           <div className="order-2 lg:order-1 relative">
              <motion.div 
                style={{ y: yParallax }}
                className="relative z-10 aspect-[4/5] rounded-sm overflow-hidden border border-white/10 bg-[#0a0a0a] group"
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                    alt="Studio Mic" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-110"
                 />
                 
                 <div className="absolute bottom-8 left-8 right-8 z-20">
                    <div className="p-6 backdrop-blur-xl bg-white/5 border-l-2 border-blue-600">
                       <p className="text-lg font-['Syne'] italic leading-relaxed text-gray-200">
                         "Conversations that go beyond the spreadsheet. We explore the pressure, the politics, and the people behind the logistics."
                       </p>
                    </div>
                 </div>
              </motion.div>
              {/* Decorative backplate */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-blue-600/20 -z-10"></div>
           </div>

           <div className="order-1 lg:order-2 space-y-10">
              <div className="inline-block px-4 py-1 border border-blue-600/30 rounded-full text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">The Mission</div>
              <h2 className="text-5xl md:text-7xl font-bold uppercase font-['Oswald'] leading-[0.9]">
                Amplifying <br/> The <span className="text-transparent text-stroke">Builders</span>
              </h2>
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                Supply chains are the unseen engines of the world. But the leaders who run them often operate in the shadows. 
              </p>
              <div className="space-y-6">
                 {[
                   { title: "Operator First", desc: "No consultants. Just real practitioners." },
                   { title: "MEA Centric", desc: "Nuanced conversations about our region." },
                   { title: "Future Focused", desc: "AI, automation, and the next decade." }
                 ].map((item, i) => (
                   <div key={i} className="flex items-start gap-4 group">
                      <div className="mt-1 w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform"></div>
                      <div>
                        <h4 className="text-lg font-bold uppercase font-['Oswald'] text-white">{item.title}</h4>
                        <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>


        {/* --- 3D PRINCIPLES --- */}
        <div className="mb-48">
           <div className="text-center mb-20">
              <h2 className="text-5xl font-bold uppercase font-['Oswald'] mb-6">Core Frequencies</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
              {[
                { 
                  icon: <Target size={32} />, 
                  title: "Raw Reality", 
                  desc: "We skip the PR-approved scripts. We talk about the failures, the near-misses, and the hard truths of execution." 
                },
                { 
                  icon: <Globe size={32} />, 
                  title: "Regional Depth", 
                  desc: "From Casablanca to Cape Town, Dubai to Riyadh. Understanding the cultural and operational fabric of MEA." 
                },
                { 
                  icon: <Layers size={32} />, 
                  title: "Systems Thinking", 
                  desc: "Connecting the dots between technology, people, and process. How to build engines that last." 
                }
              ].map((card, i) => (
                <Tilt3DCard key={i} className="h-full">
                   <div className="h-full p-10 bg-[#0a0a0a] border border-white/10 hover:border-blue-600/50 transition-colors group flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-24 bg-blue-600/5 blur-3xl rounded-full group-hover:bg-blue-600/10 transition-all"></div>
                      
                      <div className="mb-8 p-4 bg-white/5 w-fit rounded-xl text-blue-500 group-hover:text-white group-hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/20">
                        {card.icon}
                      </div>
                      
                      <h3 className="text-3xl font-bold uppercase font-['Oswald'] mb-4 text-white group-hover:text-blue-200 transition-colors">{card.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm font-light group-hover:text-gray-300">{card.desc}</p>
                      
                      <div className="mt-auto pt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        Explore <ArrowRight size={12} />
                      </div>
                   </div>
                </Tilt3DCard>
              ))}
           </div>
        </div>


        {/* --- EPISODE BLUEPRINT (Signal Chain) --- */}
        <div className="relative mb-48 bg-[#080808] border border-white/5 p-12 md:p-24 rounded-3xl overflow-hidden">
           {/* Circuit Background */}
           <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-600/20 to-transparent"></div>

           <div className="relative z-10 text-center mb-20">
              <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs">The Blueprint</span>
              <h2 className="text-5xl md:text-6xl font-bold uppercase font-['Oswald'] mt-4">Episode Anatomy</h2>
           </div>

           <div className="relative max-w-4xl mx-auto space-y-4">
              {[
                { step: "01", label: "Origin", desc: "The personal backstory." },
                { step: "02", label: "Conflict", desc: "The moment of crisis." },
                { step: "03", label: "Action", desc: "The strategic pivot." },
                { step: "04", label: "Result", desc: "The transformation." },
                { step: "05", label: "Future", desc: "The vision ahead." },
              ].map((item, i, arr) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 md:gap-12 group"
                >
                   {/* Left Side (Time/Index) */}
                   <div className="flex-1 text-right hidden md:block">
                      <span className="text-4xl font-['Oswald'] font-bold text-white/10 group-hover:text-blue-600/50 transition-colors">{item.step}</span>
                   </div>

                   {/* Center Node */}
                   <div className="relative flex-shrink-0">
                      <div className="w-4 h-4 bg-[#050505] border-2 border-white/20 rounded-full z-10 relative group-hover:border-blue-500 group-hover:scale-125 transition-all duration-300"></div>
                      {i !== arr.length - 1 && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-white/5 group-hover:bg-blue-600/30 transition-colors"></div>
                      )}
                   </div>

                   {/* Right Side (Content) */}
                   <div className="flex-1 p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-sm rounded-xl hover:border-blue-500/30 transition-all duration-300 w-full">
                      <h4 className="text-xl font-bold uppercase font-['Oswald'] text-white mb-1 group-hover:text-blue-400 transition-colors">{item.label}</h4>
                      <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>


        {/* --- CTA FOOTER --- */}
        <div className="relative text-center py-32">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
           
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             className="relative z-10"
           >
              <h2 className="text-6xl md:text-8xl font-bold uppercase font-['Oswald'] mb-8 leading-[0.85]">
                 Ready To <br/> <span className="text-transparent text-stroke hover:text-white transition-colors duration-500">Tune In?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto font-light">
                 Join the waitlist. Be the first to hear the stories that are shaping the future of MEA supply chain.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                 <button className="px-10 py-5 bg-blue-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25">
                    Subscribe to Alerts
                 </button>
                 <button className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all flex items-center gap-2">
                    Nominate a Guest <Share2 size={16} />
                 </button>
              </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Podcast;
