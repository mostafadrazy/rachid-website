
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
  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="supply-chain" className="relative bg-[#050505] text-white min-h-screen flex flex-col">
      
      {/* HERO SECTION */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 z-0">
              <img 
                  src="https://res.cloudinary.com/dmnqlruhl/image/upload/v1763748388/WhatsApp_Image_2025-11-21_at_18.28.58_4a51f166_jwqpmm.jpg" 
                  alt="Supply Chain Partnership" 
                  className="w-full h-full object-cover opacity-50 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/40"></div>
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

        {/* Why Supply Chain? */}
        <div className="relative mb-48 pt-20">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative z-20"
              >
                 <h2 className="text-7xl md:text-9xl font-bold uppercase font-['Oswald'] leading-[0.8] tracking-tighter mb-12 text-white text-wrap">
                    WHY <br/>
                    <span className="text-transparent text-stroke-blue">SUPPLY</span><br/>
                    <span className="text-blue-600">CHAIN?</span>
                 </h2>

                 <div className="glass p-10 border-l-4 border-blue-600 relative overflow-hidden group backdrop-blur-xl bg-white/5">
                    <p className="text-2xl md:text-3xl font-['Oswald'] text-white uppercase mb-6 leading-tight relative z-10">
                       “Because without it, strategy never scales.”
                    </p>
                    <div className="text-gray-400 text-lg font-light leading-relaxed relative z-10 space-y-4">
                       <p>Building on proven best practices and real transformation experience. I help businesses align demand, inventory, and execution so they deliver reliably at scale.</p>
                       <p>Moving from operational friction to sustained competitive advantage, with change management and adoption as a priority.</p>
                    </div>
                 </div>
              </motion.div>

              <div className="relative h-[600px] w-full flex items-center justify-center">
                 <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-[#050505]/80 backdrop-blur-2xl border border-white/20 shadow-2xl p-10 flex flex-col justify-between overflow-hidden rounded-xl group w-full max-w-lg h-[500px]"
                 >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
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
                       <div className="bg-white/5 border border-white/10 p-4">
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Status</div>
                          <div className="text-xl font-bold text-blue-400">Optimized</div>
                       </div>
                       <div className="bg-white/5 border border-white/10 p-4">
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Performance</div>
                          <div className="text-xl font-bold text-white">Peak</div>
                       </div>
                    </div>
                 </motion.div>
              </div>
           </div>
        </div>

        {/* The Approach */}
        <div className="mb-32">
           <h2 className="text-center text-4xl md:text-5xl font-bold uppercase font-['Oswald'] mb-16">My Approach</h2>
           <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              <div className="absolute top-[2rem] left-0 w-full h-[2px] bg-white/10 -z-10 hidden md:block"></div>
              <StepCard number="01" title="Listen" delay={0.1} />
              <StepCard number="02" title="Diagnose" delay={0.2} />
              <StepCard number="03" title="Simplify" delay={0.3} />
              <StepCard number="04" title="Execute" delay={0.4} />
              <StepCard number="05" title="Reinforce" delay={0.5} isLast={true} />
           </div>
        </div>

        {/* Expertise/Industries */}
        <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IndustryCard icon={<Factory size={24} />} label="Manufacturing" />
            <IndustryCard icon={<ShoppingBag size={24} />} label="Retail & E-commerce" />
            <IndustryCard icon={<Truck size={24} />} label="Logistics & Distribution" />
            <IndustryCard icon={<Pill size={24} />} label="Pharmaceuticals" />
            <IndustryCard icon={<Car size={24} />} label="Automotive" />
            <IndustryCard icon={<ChartBar size={24} />} label="FMCG" />
          </div>
        </div>

        {/* Metrics/CTA */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-32">
          <MetricCard value="25%+" label="Inventory Reduction" />
          <MetricCard value="99%" label="Service Level" />
          <MetricCard value="15%+" label="Cost Savings" />
          <MetricCard value="30%+" label="Efficiency Gain" />
        </div>

        <div className="text-center">
           <a 
            href="/contact" 
            onClick={(e) => handleNavigate(e, '/contact')}
            className="inline-flex items-center gap-4 px-12 py-6 bg-blue-600 text-white font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white hover:text-black transition-all shadow-2xl shadow-blue-600/20"
           >
             Optimize Your Operations <ArrowRight size={16} />
           </a>
        </div>

      </div>
    </section>
  );
};

export default SupplyChain;
