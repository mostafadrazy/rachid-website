
import React, { useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { TrendingUp, Database, Users, Globe, Mic, ArrowUpRight, Box, Layers } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// --- Spotlight Card Component ---
const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
}> = ({ children, className, bgImage }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={itemVariants}
      className={`relative overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a] transition-all duration-300 ${className}`}
    >
      {/* Spotlight Gradient Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(37,99,235,0.15), transparent 40%)`,
        }}
      />
      
      {/* Border Spotlight Layer */}
      <div
         className="pointer-events-none absolute inset-0 transition duration-300"
         style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(37,99,235,0.4), transparent 40%)`,
            maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
            maskClip: "content-box, padding-box",
            maskComposite: "exclude",
            padding: "1px",
            borderRadius: "inherit"
         }}
      />

      {bgImage && (
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
          <img src={bgImage} alt="" className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};


const ServiceCard: React.FC<{ 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  className?: string;
  bgImage?: string;
}> = ({ title, description, icon, className, bgImage }) => (
  <SpotlightCard className={`p-8 flex flex-col justify-between group ${className}`} bgImage={bgImage}>
    
    <div className="relative z-10 flex justify-between items-start mb-8">
      <div className="p-4 bg-white/5 rounded-sm text-white group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-white/5">
        {icon}
      </div>
      <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all stroke-[3px]" />
    </div>
    
    <div className="relative z-10 mt-auto">
      <h3 className="text-2xl font-bold uppercase font-['Oswald'] mb-4 group-hover:text-blue-400 transition-colors leading-none">{title}</h3>
      <p className="text-gray-400 text-sm font-medium leading-relaxed group-hover:text-gray-200 transition-colors">
        {description}
      </p>
    </div>
  </SpotlightCard>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute right-0 top-1/3 w-[40vw] h-[40vw] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs block mb-4">Expertise</span>
             <h2 className="text-5xl md:text-7xl font-bold uppercase font-['Oswald'] leading-none">
               What I <br/> <span className="text-transparent text-stroke-blue">Build</span>
             </h2>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="md:max-w-md text-right"
          >
             <p className="text-gray-400 leading-relaxed font-medium">
               I don't just advise. I build scalable engines for growth. My approach blends data-driven discipline with the art of leadership.
             </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(300px,auto)]"
        >
          
          {/* Main Feature - Supply Chain (Large) */}
          <SpotlightCard className="md:col-span-2 md:row-span-2 p-8 md:p-12 flex flex-col justify-end group bg-blue-950/10">
             <div className="absolute top-0 right-0 p-32 bg-blue-600/20 blur-[80px] rounded-full group-hover:bg-blue-600/30 transition-colors duration-700"></div>
             <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center grayscale mix-blend-overlay"></div>
             </div>

             <div className="relative z-10 mb-auto pt-4">
                <div className="bg-blue-600 w-16 h-16 flex items-center justify-center rounded-sm mb-6 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                  <Layers size={32} />
                </div>
             </div>

             <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold uppercase font-['Oswald'] mb-6 text-white leading-[0.9]">
                  Supply Chain <br/> Transformation
                </h3>
                <p className="text-gray-300 font-medium leading-relaxed mb-8 max-w-md">
                  Helping companies across MEA move from chaos to clarity by designing smarter, more resilient, and technology-driven operations.
                </p>
                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-400 group-hover:text-white transition-colors">
                  View Case Studies <ArrowUpRight size={16} className="stroke-[3px]" />
                </button>
             </div>
          </SpotlightCard>

          <ServiceCard 
            title="Best-in-Class Solutions" 
            description="From planning to execution, enabling retailers, distributors, and manufacturers to scale with confidence and precision."
            icon={<Box size={24} />}
            className="md:col-span-1 md:row-span-1"
          />

          <ServiceCard 
            title="Leadership for MEA" 
            description="Empowering teams to grow through discipline, empathy, and strategic clarity while building the next generation of supply chain leaders."
            icon={<Users size={24} />}
            className="md:col-span-1 md:row-span-1"
          />

          <ServiceCard 
            title="Networking & Ecosystems" 
            description="Connecting people, ideas, and opportunities across MEA to accelerate growth, spark partnerships, and create long-term value."
            icon={<Globe size={24} />}
            className="md:col-span-2 md:row-span-1"
            bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          />

          <ServiceCard 
            title="Content & Storytelling" 
            description="Sharing frameworks, insights, and real stories about AI, supply chain, leadership, and growth to inspire transformation across the region."
            icon={<Mic size={24} />}
            className="md:col-span-4 md:row-span-1 bg-[#0a0a0a]"
          />

        </motion.div>
      </div>
    </section>
  );
};

export default Services;
