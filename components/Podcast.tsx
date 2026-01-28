
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mic, Globe, ArrowRight, Headphones, Target, Layers, Play, Share2, Linkedin, ExternalLink } from 'lucide-react';

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.6 1.44.539.3.719.96.418 1.5-.299.48-.96.66-1.439.36z"/>
  </svg>
);

const AppleIcon = () => (
   <svg viewBox="0 0 22.773 22.773" fill="currentColor" className="w-5 h-5">
     <g>
        <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"/>
        <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464c0.471,0.181,1.06,0.502,1.619,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"/>
     </g>
   </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Podcast: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const videoId = "W2-mdR3ZbaY";
  const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section id="podcast" ref={containerRef} className="relative bg-[#050505] text-white min-h-screen overflow-hidden">
      
      {/* Immersive Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-900/10 rounded-full blur-[180px] mix-blend-screen opacity-60"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] mix-blend-screen opacity-40"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-32 pb-24">
        
        {/* --- CINEMATIC HERO SECTION --- */}
        <div className="flex flex-col items-center justify-center min-h-[85vh] mb-32 relative">
           
           {/* Floating Status Badge */}
           <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="mb-10"
           >
             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(37,99,235,0.25)] hover:bg-blue-500/20 transition-all">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-300">Season 1 • Coming 2025</span>
             </div>
           </motion.div>

           {/* Hero Logo */}
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="mb-12 relative z-10"
           >
              <img 
                src="https://res.cloudinary.com/dmnqlruhl/image/upload/v1767971895/Asset_1_zryrdv.png" 
                alt="0toN Logo" 
                className="w-56 md:w-80 h-auto object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:drop-shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all duration-700"
              />
           </motion.div>

           {/* THE VIDEO FRAME - CENTERPIECE */}
           <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-6xl mx-auto group z-20"
           >
              {/* Glow Effect Behind */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-blue-400/10 to-blue-600/20 rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
              
              {/* Glass Container */}
              <div className="relative rounded-xl border border-white/10 bg-[#0a0a0a] ring-1 ring-white/5 overflow-hidden shadow-2xl">
                 {/* Top Bar (Browser/Player like) */}
                 <div className="h-10 bg-[#111]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-2">
                    <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-red-500/80 transition-colors duration-300"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-yellow-500/80 transition-colors duration-300"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-green-500/80 transition-colors duration-300"></div>
                    </div>
                    <div className="mx-auto text-[9px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                         <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                         Official_Teaser_Trailer.mp4
                    </div>
                    <div className="w-12"></div> {/* Spacer balance */}
                 </div>

                 {/* Video Facade (Click to Load) */}
                 <div className="aspect-video w-full bg-black relative group overflow-hidden">
                    {!isPlaying ? (
                       <button 
                         onClick={() => setIsPlaying(true)}
                         className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none z-30"
                         aria-label="Play Trailer"
                       >
                         <img 
                           src={thumbnail} 
                           alt="Trailer Thumbnail" 
                           className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                           loading="eager"
                         />
                         
                         <div className="absolute inset-0 flex items-center justify-center z-20">
                             {/* Play Button with Pulse */}
                             <div className="relative">
                                 <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20"></div>
                                 <div className="relative w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 shadow-2xl">
                                     <Play size={32} fill="currentColor" className="ml-1 text-white" />
                                 </div>
                             </div>
                         </div>
                         
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                         
                         <div className="absolute bottom-6 left-6 z-20 pointer-events-none text-left">
                             <p className="text-white font-['Oswald'] uppercase text-xl font-bold mb-1">Watch The Trailer</p>
                             <p className="text-gray-400 text-xs tracking-widest flex items-center gap-2">
                                Click to Play
                             </p>
                         </div>
                       </button>
                    ) : (
                       <iframe 
                         src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                         className="absolute inset-0 w-full h-full"
                         frameBorder="0" 
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                         allowFullScreen
                         title="Zero to N Podcast Trailer"
                       ></iframe>
                    )}
                 </div>
              </div>

              {/* Decorative elements around frame */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-blue-600/40 to-transparent hidden xl:block"></div>
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-blue-600/40 to-transparent hidden xl:block"></div>
           </motion.div>


           {/* Description & Links (Below Video) */}
           <div className="mt-20 flex flex-col items-center text-center max-w-3xl mx-auto relative z-10">
              
              {/* Fallback Link for Errors */}
              <a 
                 href={videoLink}
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="mb-8 text-[10px] text-gray-500 uppercase tracking-widest hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                 Having trouble? Watch on YouTube <ExternalLink size={10} />
              </a>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-3xl font-light font-['Syne'] text-gray-300 leading-relaxed mb-10"
              >
                The unfiltered voice of MEA’s operational leaders. <br/>
                <strong className="text-white">Strategic. Human. Future-Ready.</strong>
              </motion.p>

              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8 }}
                 className="flex flex-wrap justify-center gap-4"
              >
                  {[
                    { icon: <SpotifyIcon />, label: "Spotify", href: "https://open.spotify.com/show/7ojBlNz4QzU9hby09R7ibZ" },
                    { icon: <AppleIcon />, label: "Apple", href: "https://podcasts.apple.com/ae/podcast/zero-to-n/id1872102771" },
                    { icon: <YouTubeIcon />, label: "YouTube", href: "https://www.youtube.com/@0toNpodcast" },
                    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/company/zero-to-n-podcast" },
                    { icon: <TikTokIcon />, label: "TikTok", href: "https://www.tiktok.com/@zerotonpodcast" },
                  ].map((platform, idx) => (
                    <a 
                      key={idx}
                      href={platform.href}
                      target={platform.href !== '#' ? "_blank" : undefined}
                      rel={platform.href !== '#' ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all duration-300 group backdrop-blur-sm"
                    >
                      <span className="text-gray-400 group-hover:text-white transition-colors w-5 h-5">{platform.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 group-hover:text-white">{platform.label}</span>
                    </a>
                  ))}
              </motion.div>
           </div>

        </div>


        {/* --- SEASON 1: BUILDERS OF THE MEA FUTURE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-48">
           <div className="order-2 lg:order-1 relative">
              <motion.div 
                style={{ y: yParallax }}
                className="relative z-10 aspect-[4/5] rounded-sm overflow-hidden border border-white/10 bg-[#0a0a0a] group"
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                 <img 
                    src="https://res.cloudinary.com/dmnqlruhl/image/upload/v1766746478/IMG_0178_loq4p6.jpg" 
                    alt="Podcast Host" 
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
              <div className="absolute -top-6 -left-6 w-full h-full border border-blue-600/20 -z-10"></div>
           </div>

           <div className="order-1 lg:order-2 space-y-10">
              <div className="inline-block px-4 py-1 border border-blue-600/30 rounded-full text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Season 1</div>
              <h2 className="text-4xl md:text-6xl font-bold uppercase font-['Oswald'] leading-[0.9]">
                Builders of the <br/> <span className="text-transparent text-stroke hover:text-white transition-colors duration-500 relative">MEA Future</span>
              </h2>
              
              <div className="space-y-8">
                <p className="text-2xl text-white font-['Syne'] font-bold leading-tight">
                  A storytelling podcast decoding how real operators build, break, and rebuild — from zero to N.
                </p>

                <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                   <p className="text-gray-300 font-light leading-relaxed">
                      Hosted by <strong className="text-white">Rachid Labrik</strong>, operator CEO scaling businesses across the Middle East & Africa.
                   </p>
                </div>

                <div className="flex flex-col gap-3">
                   <div className="flex items-center gap-3 text-sm text-gray-400 font-mono uppercase tracking-wider">
                      <Mic size={16} className="text-blue-500" />
                      <span>New episodes every other week</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm text-gray-400 font-mono uppercase tracking-wider">
                      <Headphones size={16} className="text-blue-500" />
                      <span>Listen on Spotify · Apple Podcasts · YouTube</span>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                   <a 
                     href="https://open.spotify.com/show/7ojBlNz4QzU9hby09R7ibZ"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="px-8 py-4 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                   >
                      <Play size={12} fill="currentColor" /> Listen to Latest Episode
                   </a>
                   <a 
                     href="/about"
                     onClick={(e) => handleNavigate(e, '/about')}
                     className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                   >
                      Explore the Journey <ArrowRight size={14} />
                   </a>
                </div>
              </div>
           </div>
        </div>


        {/* --- CORE FREQUENCIES --- */}
        <div className="mb-48">
           <div className="text-center mb-20">
              <h2 className="text-5xl font-bold uppercase font-['Oswald'] mb-6">Core Frequencies</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div key={i} className="h-full p-10 bg-[#0a0a0a] border border-white/10 hover:border-blue-600/50 transition-colors group flex flex-col relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-24 bg-blue-600/5 blur-3xl rounded-full group-hover:bg-blue-600/10 transition-all"></div>
                   
                   <div className="mb-8 p-4 bg-white/5 w-fit rounded-xl text-blue-500 group-hover:text-white group-hover:bg-blue-600 transition-all">
                     {card.icon}
                   </div>
                   
                   <h3 className="text-3xl font-bold uppercase font-['Oswald'] mb-4 text-white group-hover:text-blue-200 transition-colors">{card.title}</h3>
                   <p className="text-gray-400 leading-relaxed text-sm font-light group-hover:text-gray-300">{card.desc}</p>
                   
                   <div className="mt-auto pt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-all">
                     Explore <ArrowRight size={12} />
                   </div>
                </div>
              ))}
           </div>
        </div>


        {/* --- EPISODE ANATOMY (The 0toN Story Arc) --- */}
        <div className="mb-48 relative">
           <div className="mb-20">
              <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">The Blueprint</span>
              <h2 className="text-5xl md:text-7xl font-bold uppercase font-['Oswald']">The 0toN Story Arc</h2>
              <p className="text-xl text-gray-400 font-light mt-6 max-w-2xl leading-relaxed">Every episode follows the same human structure:</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-5 mb-16">
              {[
                { step: "01", label: "The Origin", desc: "What shaped their discipline and worldview." },
                { step: "02", label: "The Turning Point", desc: "The moment that changed everything." },
                { step: "03", label: "The Transformation", desc: "How they rebuilt, adapted, or innovated under pressure." },
                { step: "04", label: "The Horizon", desc: "What they see coming next: AI, markets, leadership shifts." },
                { step: "05", label: "The Code", desc: "The lesson they paid for — and would never trade." },
              ].map((item, i) => (
                <div key={i} className="group relative border-t border-b border-r border-white/10 first:border-l p-10 h-[400px] flex flex-col justify-between hover:bg-[#0a0a0a] transition-all duration-500">
                   <div className="flex flex-col gap-2">
                      <span className="text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-all">Step</span>
                      <span className="text-6xl font-['Oswald'] font-bold text-white/10 group-hover:text-white transition-colors duration-500">{item.step}</span>
                   </div>

                   <div className="relative z-10">
                      <div className="w-12 h-1 bg-blue-600/30 mb-8 group-hover:w-full group-hover:bg-blue-600 transition-all duration-500"></div>
                      <h4 className="text-2xl font-bold uppercase font-['Oswald'] text-white mb-3">{item.label}</h4>
                      <p className="text-sm text-gray-500 font-light group-hover:text-gray-300 transition-colors leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="text-center border-t border-white/10 pt-16">
              <p className="text-2xl md:text-4xl font-['Syne'] font-bold text-white uppercase leading-tight tracking-tight">
                "This is not an interview.<br/> It’s a documented transformation."
              </p>
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
              <h2 className="text-5xl md:text-7xl font-bold uppercase font-['Oswald'] mb-8 leading-[0.85]">
                 Ready To <br/> <span className="text-transparent text-stroke hover:text-white transition-colors duration-500">Tune In?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto font-light">
                 Join the waitlist. Be the first to hear the stories that are shaping the future of MEA supply chain.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                 <a 
                   href="/contact"
                   onClick={(e) => handleNavigate(e, '/contact')}
                   className="px-10 py-5 bg-blue-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 inline-block"
                 >
                    Subscribe to Alerts
                 </a>
                 <a 
                   href="/contact"
                   onClick={(e) => handleNavigate(e, '/contact')}
                   className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all flex items-center gap-2 inline-block"
                 >
                    Nominate a Guest <Share2 size={16} />
                 </a>
              </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Podcast;
