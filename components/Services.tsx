
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Box, Layers, Globe, Mic, Users } from 'lucide-react';

const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  delay?: number;
  image?: string;
}> = ({ title, description, icon, className, delay = 0, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between group hover:border-blue-600/50 transition-colors duration-500 relative overflow-hidden ${className}`}
  >
    {image && (
       <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 grayscale group-hover:grayscale-0"
          />
          {/* Lighter gradients to make image more visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]/60"></div>
       </div>
    )}
    
    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
    
    <div className="mb-6 relative z-10">
      <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 backdrop-blur-sm">
        {icon}
      </div>
      <h3 className="text-2xl font-bold uppercase font-['Oswald'] mb-3 group-hover:text-white transition-colors drop-shadow-lg">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors drop-shadow-md font-medium">{description}</p>
    </div>
    
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-blue-400 transition-colors relative z-10">
      <span>Explore</span> <ArrowUpRight size={14} />
    </div>
  </motion.div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#050505] relative">
      {/* Background Decoration */}
      <div className="absolute left-0 top-1/3 w-[30vw] h-[30vw] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs block mb-4">Expertise</span>
             <h2 className="text-6xl md:text-7xl font-bold uppercase font-['Oswald'] leading-none">
               What I <br/> Build
             </h2>
           </motion.div>
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="max-w-md text-gray-400 text-lg"
           >
             Scalable systems for a complex world. From supply chain optimization to leadership frameworks.
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Large Card with Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 min-h-[500px] relative group rounded-sm overflow-hidden border border-white/10 bg-[#0a0a0a]"
          >
             <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                  alt="Supply Chain Transformation" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent"></div>
             </div>
             
             <div className="absolute bottom-0 left-0 p-10 z-20 max-w-xl">
                <div className="w-16 h-16 bg-blue-600 flex items-center justify-center mb-6 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                   <Layers size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold uppercase font-['Oswald'] text-white mb-4">Supply Chain Transformation</h3>
                <p className="text-gray-200 text-lg mb-8 leading-relaxed font-medium">
                  Helping companies across MEA move from chaos to clarity by designing smarter, more resilient operations.
                </p>
                <button className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-blue-600 hover:text-white transition-all">
                   View Case Studies
                </button>
             </div>
          </motion.div>

          {/* Secondary Cards */}
          <ServiceCard 
            title="Strategic Planning" 
            description="Turning high-level ambition into executable roadmaps for growth and expansion."
            icon={<Box size={24} />}
            delay={0.2}
            image="https://plus.unsplash.com/premium_photo-1661687254326-bcacaa1fa47e?q=80&w=1740&auto=format&fit=crop"
          />
          
          <ServiceCard 
            title="Leadership" 
            description="Building teams that take ownership, embrace discomfort, and deliver results."
            icon={<Users size={24} />}
            delay={0.3}
            image="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGVhZGVyc2hpcHxlbnwwfHwwfHx8MA%3D%3D=crop"
          />

          <ServiceCard 
            title="Ecosystems" 
            description="Connecting partners, vendors, and technologies to create value networks."
            icon={<Globe size={24} />}
            delay={0.4}
            image="https://plus.unsplash.com/premium_photo-1723867236011-6099f308dab0?q=80&w=2070&auto=format&fit=crop"
          />

           <ServiceCard 
            title="Storytelling" 
            description="Sharing insights on AI, leadership, and the future of supply chain."
            icon={<Mic size={24} />}
            delay={0.5}
            image="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
          />

        </div>
      </div>
    </section>
  );
};

export default Services;
