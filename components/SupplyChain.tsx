
import React from 'react';
import { motion } from 'framer-motion';
import { ChartBar, ArrowRight, Factory, ShoppingBag, Truck, Pill, Car, Activity } from 'lucide-react';

const StepCard: React.FC<{ number: string; title: string; delay: number; isLast?: boolean }> = ({ number, title, delay, isLast }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="relative flex flex-col items-center text-center group"
  >
     <div className="w-16 h-16 rounded-full border border-blue-600/30 flex items-center justify-center bg-[#0a0a0a] group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500 z-10 mb-6">
        <span className="text-xl font-bold font-['Oswald'] text-blue-500 group-hover:text-white transition-colors">{number}</span>
     </div>
     <h3 className="text-xl font-bold uppercase tracking-wider font-['Oswald']">{title}</h3>
     
     {/* Connector Line - Only show if not the last item */}
     {!isLast && (
       <div className="absolute top-8 left-1/2 w-full h-[1px] bg-blue-600/20 z-0 hidden md:block"></div>
     )}
  </motion.div>
);

const MetricCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group hover:bg-white/10">
    <h4 className="text-4xl md:text-5xl font-bold font-['Oswald'] text-white mb-2 group-hover:text-blue-400 transition-colors">{value}</h4>
    <p className="text-gray-400 text-sm uppercase tracking-widest">{label}</p>
  </div>
);

const IndustryCard: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-6 p-6 border border-white/10 bg-[#0a0a0a] hover:bg-blue-900/10 transition-colors duration-300"
  >
    <div className="text-blue-600">{icon}</div>
    <span className="text-lg font-bold uppercase font-['Oswald']">{label}</span>
  </motion.div>
);

const SupplyChain: React.FC = () => {
  return (
    <section id="supply-chain" className="relative bg-[#050505] text-white min-h-screen flex flex-col">
      
      {/* HERO SECTION */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/10">
          {/* Background Image with Parallax-like effect */}
          <div className="absolute inset-0 z-0">
              <img 
                  src="https://res.cloudinary.com/dmnqlruhl/image/upload/v1763748388/WhatsApp_Image_2025-11-21_at_18.28.58_4a51f166_jwqpmm.jpg" 
                  alt="Supply Chain Partnership" 
                  className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[1.5s] scale-105"
              />
              {/* Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/40"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center mt-20">
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="text-5xl md:text-7xl lg:text-9xl font-bold uppercase font-['Oswald'] leading-[0.9] mb-8 tracking-tight drop-shadow-2xl"
             >
               The Art & Science <br/>
               <span className="text-blue-600">Of Availability</span>
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed"
             >
               Walking through warehouses with no systems. Boardrooms with too much noise. Transformation is not about software. It is about clarity.
             </motion.p>
          </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 py-32">

        {/* Why Supply Chain? - Redesigned Spatial Section */}
        <div className="relative mb-48 pt-20">
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              
              {/* LEFT: Typography & Message */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative z-20"
              >
                 <h2 className="text-7xl md:text-9xl font-bold uppercase font-['Oswald'] leading-[0.8] tracking-tighter mb-12 text-white mix-blend-difference">
                    Why <br/>
                    <span className="text-transparent text-stroke-blue">Supply</span><br/>
                    <span className="text-blue-600">Chain?</span>
                 </h2>

                 <div className="glass p-10 border-l-4 border-blue-600 relative overflow-hidden group backdrop-blur-xl bg-white/5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
                    
                    <p className="text-2xl md:text-3xl font-['Oswald'] text-white uppercase mb-6 leading-tight relative z-10">
                       "Because without it, ambition is just hallucination."
                    </p>
                    <p className="text-gray-400 text-lg font-light leading-relaxed relative z-10">
                       I don't just fix operations. I build the <span className="text-white font-bold">invisible architecture</span> that allows businesses to keep their promises at scale. Moving from <span className="line-through decoration-blue-600 decoration-2 text-gray-500">reactive chaos</span> to <span className="text-blue-400 font-bold">predictable growth</span>.
                    </p>
                 </div>
              </motion.div>

              {/* RIGHT: Immersive 3D Visual */}
              <div className="relative h-[600px] w-full perspective-1000 flex items-center justify-center">
                 
                 {/* Back Layer - Chaos (Noise) */}
                 <motion.div 
                    initial={{ rotateY: 10, z: -100, opacity: 0 }}
                    whileInView={{ rotateY: -5, z: 0, opacity: 0.4 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-[#0a0a0a] border border-white/5 p-8 transform scale-90 translate-x-10 translate-y-10 grayscale"
                 >
                    <div className="text-9xl font-['Oswald'] font-bold text-white/5 absolute top-0 right-0 leading-none select-none">ERR</div>
                    <div className="absolute bottom-8 left-8 font-mono text-xs text-red-500 uppercase tracking-widest border border-red-900/30 px-4 py-2 bg-red-900/10">System: Unstable</div>
                 </motion.div>

                 {/* Middle Layer - Transition (Glass) */}
                 <motion.div 
                    initial={{ rotateY: 10, z: -50, opacity: 0 }}
                    whileInView={{ rotateY: -5, z: 50, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute inset-4 bg-blue-900/5 backdrop-blur-sm border border-blue-500/10 p-8 transform translate-x-5 translate-y-5 rounded-xl"
                 >
                 </motion.div>

                 {/* Front Layer - Clarity (The Hero Card) */}
                 <motion.div 
                    initial={{ rotateY: 10, z: 0, opacity: 0 }}
                    whileInView={{ rotateY: 0, z: 100, opacity: 1 }}
                    whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="absolute inset-10 bg-[#050505]/80 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-blue-600/20 p-10 flex flex-col justify-between overflow-hidden rounded-xl group"
                 >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full group-hover:bg-blue-600/30 transition-all duration-500"></div>

                    <div className="relative z-10">
                       <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/40 mb-8">
                          <Activity size={28} />
                       </div>
                       <h3 className="text-4xl md:text-5xl font-bold uppercase font-['Oswald'] text-white leading-[0.9] mb-2">
                          The <br/> Synchronized <br/> Engine
                       </h3>
                       <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-2">Precision Engineered</p>
                    </div>

                    <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
                       <div className="bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors">
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Status</div>
                          <div className="text-xl font-bold text-blue-400">Optimized</div>
                       </div>
                       <div className="bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors">
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Performance</div>
                          <div className="text-xl font-bold text-white">Peak</div>
                       </div>
                    </div>
                 </motion.div>
              </div>

           </div>
        </div>

        {/* The Approach - Timeline */}
        <div className="mb-32">
           <h2 className="text-center text-4xl md:text-5xl font-bold uppercase font-['Oswald'] mb-16">My Approach</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {/* Horizontal Line for Desktop Container */}
              <div className="absolute top-[2rem] left-0 w-full h-[2px] bg-white/10 -z-10 hidden md:block"></div>
              
              <StepCard number="01" title="Listen" delay={0.1} />
              <StepCard number="02" title="Diagnose" delay={0.2} />
              <StepCard number="03" title="Simplify" delay={0.3} />
              <StepCard number="04" title="Execute" delay={0.4} />
              <StepCard number="05" title="Reinforce" delay={0.5} isLast={true} />
           </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
           <MetricCard value="98%" label="Availability" />
           <MetricCard value="15-30%" label="Stock Reduction" />
           <MetricCard value="100%" label="Team Alignment" />
           <MetricCard value="24/7" label="Smarter Decisions" />
        </div>

        {/* Industries */}
        <div className="border-t border-white/10 pt-24">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
             <div>
               <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-2 block">Sectors</span>
               <h2 className="text-5xl font-bold uppercase font-['Oswald']">Industries I Support</h2>
             </div>
             <a href="#contact" className="px-8 py-4 border border-white/20 hover:bg-white hover:text-black transition-all uppercase font-bold text-sm flex items-center gap-2">
               Start Transformation <ArrowRight size={16} />
             </a>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <IndustryCard icon={<ShoppingBag />} label="Retail" />
              <IndustryCard icon={<Truck />} label="Distribution & Wholesale" />
              <IndustryCard icon={<Factory />} label="Manufacturing" />
              <IndustryCard icon={<ShoppingBag />} label="FMCG & Foodservice" />
              <IndustryCard icon={<Pill />} label="Pharmaceutical" />
              <IndustryCard icon={<Car />} label="Automotive & Aftermarket" />
           </div>
        </div>

      </div>
    </section>
  );
};

export default SupplyChain;
