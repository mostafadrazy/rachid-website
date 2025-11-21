
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote, MapPin, Award, Sparkles, Box, ArrowUpRight } from 'lucide-react';

const ShapeDivider: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <div className="flex items-center justify-center py-24 opacity-50">
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-blue-600/50"></div>
    <div className="mx-4 text-blue-600 animate-pulse">
      {icon}
    </div>
    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-blue-600/50"></div>
  </div>
);

const ValueCard: React.FC<{ title: string; description: string; index: number }> = ({ title, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="group relative p-10 border border-white/5 bg-[#0a0a0a] hover:border-blue-600/50 transition-all duration-500 hover:-translate-y-2"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <span className="absolute top-6 right-6 text-xs font-mono text-blue-600/50 group-hover:text-blue-500 transition-colors">0{index + 1}</span>
    
    <div className="relative z-10">
        <h3 className="text-2xl font-bold uppercase font-['Oswald'] mb-4 group-hover:text-blue-400 transition-colors">{title}</h3>
        <div className="w-8 h-[2px] bg-white/10 mb-6 group-hover:w-16 group-hover:bg-blue-600 transition-all duration-500"></div>
        <p className="text-gray-400 font-light leading-relaxed text-sm">
        {description}
        </p>
    </div>
  </motion.div>
);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="about" ref={containerRef} className="relative bg-[#050505] text-white py-32 overflow-hidden min-h-screen">
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center relative"
        >
          <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">The Narrative</span>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase font-['Oswald'] leading-[0.85] tracking-tight mb-8">
            The Making <br/> 
            <span className="text-transparent text-stroke hover:text-white transition-colors duration-700">Of A Builder</span>
          </h2>
          <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto"></div>
        </motion.div>

        {/* Section 1: Editorial Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
           
           {/* Image Column */}
           <div className="lg:col-span-5 relative group order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#0a0a0a]"
              >
                 {/* Image Overlay Gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-40"></div>
                 
                 <img 
                   src="https://res.cloudinary.com/dmnqlruhl/image/upload/v1763748377/WhatsApp_Image_2025-11-21_at_18.31.14_f81efaf6_yz1fna.jpg" 
                   alt="Rachid Profile" 
                   className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                 />
                 
                 {/* Floating Tag */}
                 <div className="absolute bottom-8 left-8 z-20">
                    <div className="glass px-6 py-4 border-l-4 border-blue-600 backdrop-blur-xl bg-black/40">
                        <p className="font-['Oswald'] uppercase text-2xl font-bold leading-none mb-1">Rachid</p>
                        <p className="text-[10px] text-blue-400 tracking-[0.2em] uppercase font-bold">Supply Chain Leader</p>
                    </div>
                 </div>
              </motion.div>
              
              {/* Decorative Frame Offset */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-blue-600/20 -z-10 hidden lg:block transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
           </div>

           {/* Text Content Column */}
           <div className="lg:col-span-7 lg:pl-12 pt-4 order-1 lg:order-2">
              <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.2 }}
              >
                 <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase font-['Oswald'] mb-8 leading-[1.1]">
                    I did not become who I am in a <span className="text-blue-600 underline decoration-blue-600/30 underline-offset-8 decoration-2">straight line.</span>
                 </h3>
                 
                 <div className="space-y-8 text-lg text-gray-300 font-light leading-relaxed">
                    <p>
                      I became who I am through persistence, discomfort, and endless reinvention. I grew up in Morocco in a home filled with love, simplicity, and quiet strength. I watched my family work hard with limited means but limitless dignity.
                    </p>
                    <p>
                      When I opened a shop as a child, my grandmother stood beside me. She taught me that business is not about selling. It’s about serving. <span className="text-white font-medium">Those moments shaped my leadership far more than any boardroom ever could.</span>
                    </p>
                    
                    {/* Quote Block */}
                    <div className="relative mt-12 p-8 md:p-10 bg-white/5 border border-white/5 overflow-hidden group">
                        <div className="absolute top-0 right-0 p-16 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-colors duration-700"></div>
                        <Quote className="absolute top-6 left-6 text-blue-600/20 w-8 h-8 transform -scale-x-100" />
                        
                        <p className="relative z-10 text-xl md:text-2xl text-white font-['Syne'] font-bold leading-tight text-center px-4">
                          "Growth is rarely found in comfort. It is found on the steep paths, the long nights, and the decisions that scare you."
                        </p>
                        <div className="mt-6 text-center">
                           <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">— My Philosophy</span>
                        </div>
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>

        <ShapeDivider icon={<Sparkles size={24} />} />

        {/* Section 2: Leadership & Impact (Zig Zag Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
           
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="space-y-8 order-2 lg:order-1"
           >
              <div className="flex items-center gap-4 mb-4">
                  <span className="p-2 bg-blue-600/10 rounded-full text-blue-500"><MapPin size={20} /></span>
                  <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">From Atlas To Global</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold uppercase font-['Oswald'] leading-tight">
               Leading The <br/> <span className="text-blue-600">Next Generation</span>
             </h3>
             
             <div className="text-lg text-gray-300 font-light leading-relaxed space-y-6">
                <p>
                  I left home to build a career that could match my ambition. My journey has taken me across diverse industries and continents, and each experience has shaped my global perspective.
                </p>
                <p>
                  Later, <strong className="text-white">Slimstock</strong> became the chapter where skills met purpose. Today, as CEO of Slimstock MEA, I lead teams that operate across the Middle East and Africa, building one of the fastest-growing regions in the company.
                </p>
                <p>
                  Leadership is not a title. It is responsibility. It is clarity under pressure. It is the courage to speak truth when it matters.
                </p>
             </div>
             
             <div className="flex gap-4 pt-4">
                <div className="px-4 py-2 border border-white/10 rounded text-xs font-mono text-gray-400 uppercase">Strategy</div>
                <div className="px-4 py-2 border border-white/10 rounded text-xs font-mono text-gray-400 uppercase">Execution</div>
                <div className="px-4 py-2 border border-white/10 rounded text-xs font-mono text-gray-400 uppercase">People</div>
             </div>
           </motion.div>

           {/* Image 2: Visual Storytelling (Zig Zag Position) */}
           <div className="relative w-full group order-1 lg:order-2">
              <motion.div style={{ y: yParallax }} className="relative z-10 aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#0a0a0a]">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-40"></div>
                 <img 
                   src="https://res.cloudinary.com/dmnqlruhl/image/upload/v1763748387/WhatsApp_Image_2025-11-21_at_18.28.57_0bc26e09_km0xji.jpg" 
                   alt="Global Leadership Journey" 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                 />
                 
                  {/* Integrated Stats Overlay */}
                  <div className="absolute bottom-8 right-8 text-right z-20">
                      <div className="glass p-6 backdrop-blur-lg border border-white/10 bg-black/20 hover:bg-blue-900/20 transition-colors duration-300">
                        <div className="flex flex-col items-end">
                            <Award className="text-blue-600 w-8 h-8 mb-2" />
                            <h4 className="text-5xl md:text-6xl font-bold font-['Oswald'] text-white mb-1 leading-none">10+</h4>
                            <p className="text-blue-400 uppercase tracking-widest text-[10px] font-bold">Countries Deployed</p>
                        </div>
                      </div>
                  </div>
              </motion.div>
              
              {/* Decorative Frame Offset */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-blue-600/20 -z-10 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 hidden md:block"></div>
           </div>
        </div>

        <ShapeDivider icon={<Box size={24} />} />

        {/* Section 3: Core Values */}
        <div className="mt-12">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h3 className="text-5xl md:text-7xl font-bold uppercase font-['Oswald'] mb-6">What Drives Me</h3>
            <p className="text-gray-400 text-lg font-light">
                The core principles that guide my decisions, my training, and my leadership style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <ValueCard 
               index={0}
               title="Growth"
               description="I believe a man should reinvent himself many times. Stagnation is the enemy of potential."
             />
             <ValueCard 
               index={1}
               title="Discipline"
               description="I run, hike, build, and lead with consistency. Motivation is fleeting; discipline is permanent."
             />
             <ValueCard 
               index={2}
               title="Resilience"
               description="Life tested me early. That became an advantage. Every setback is merely data for the next attempt."
             />
             <ValueCard 
               index={3}
               title="Spirituality"
               description="The calm behind the ambition. It provides the grounding needed to weather high-stakes storms."
             />
             <ValueCard 
               index={4}
               title="Legacy"
               description="Leaving a positive impact in the world behind me. Building things that outlast my own tenure."
             />
             {/* Interactive Filler Card */}
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="hidden lg:flex flex-col items-center justify-center border border-white/5 bg-[#050505] p-10 group cursor-pointer hover:border-blue-600/30 transition-colors duration-300"
             >
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-600 transition-all duration-500">
                    <ArrowUpRight className="text-gray-500 group-hover:text-blue-500 transition-colors" size={24} />
                </div>
                <span className="mt-4 text-xs uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors">Explore More</span>
             </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
