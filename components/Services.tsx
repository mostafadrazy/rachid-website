
import React from 'react';
import { motion } from 'framer-motion';
import { Box, Layers, Globe, Mic, Users } from 'lucide-react';

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
    className={`group relative h-[400px] md:h-[500px] bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col justify-end p-8 md:p-12 hover:border-blue-600/50 transition-all duration-500 ${className}`}
  >
    {/* Background Image Layer */}
    {image && (
       <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 to-transparent"></div>
       </div>
    )}
    
    {/* Hover Glow Effect */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
    
    {/* Content */}
    <div className="relative z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
      <div className="w-14 h-14 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-black/20">
        {icon}
      </div>
      
      <h3 className="text-3xl md:text-4xl font-bold uppercase font-['Oswald'] mb-4 text-white group-hover:text-blue-100 transition-colors drop-shadow-md">
        {title}
      </h3>
      
      <div className="h-[1px] w-12 bg-blue-600 mb-6 opacity-50 group-hover:w-full group-hover:opacity-100 transition-all duration-500"></div>
      
      <p className="text-gray-300 text-lg leading-relaxed font-light opacity-80 group-hover:opacity-100 transition-opacity duration-500 max-w-sm">
        {description}
      </p>
    </div>
  </motion.div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#050505] relative">
      {/* Background Decoration */}
      <div className="absolute right-0 top-1/4 w-[30vw] h-[30vw] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/10 pb-12">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs block mb-4">Expertise</span>
             <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase font-['Oswald'] leading-none">
               What I <br/> Build
             </h2>
           </motion.div>
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="max-w-md text-gray-400 text-lg md:text-xl font-light text-right md:text-left"
           >
             Scalable systems for a complex world. Optimising supply chains. Elevating leadership. Transforming the way businesses grow.
           </motion.div>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          <ServiceCard 
            title="Strategic Planning" 
            description="Turning high-level ambition into executable roadmaps for growth and expansion."
            icon={<Box size={28} />}
            delay={0.1}
            image="https://plus.unsplash.com/premium_photo-1661687254326-bcacaa1fa47e?q=80&w=1740&auto=format&fit=crop"
          />
          
          <ServiceCard 
            title="Leadership" 
            description="Building teams that take ownership, embrace discomfort, and deliver results."
            icon={<Users size={28} />}
            delay={0.2}
            image="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGVhZGVyc2hpcHxlbnwwfHwwfHx8MA%3D%3D=crop"
          />

          <ServiceCard 
            title="Ecosystems" 
            description="Connecting partners, vendors, and technologies to create value networks."
            icon={<Globe size={28} />}
            delay={0.3}
            image="https://plus.unsplash.com/premium_photo-1723867236011-6099f308dab0?q=80&w=2070&auto=format&fit=crop"
          />

           <ServiceCard 
            title="Storytelling" 
            description="Sharing insights on AI, leadership, and the future of supply chain."
            icon={<Mic size={28} />}
            delay={0.4}
            image="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
          />

        </div>
      </div>
    </section>
  );
};

export default Services;
