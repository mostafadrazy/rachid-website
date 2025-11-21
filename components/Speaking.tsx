
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mic, Users, Calendar, ArrowRight, Radio, MonitorPlay } from 'lucide-react';

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
  tags?: string[] 
}> = ({ number, title, description, tags }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-b border-white/10 hover:bg-white/5 transition-colors duration-500 px-4 lg:px-8"
  >
    {/* Number */}
    <div className="lg:col-span-2">
       <span className="text-5xl md:text-6xl font-['Oswald'] font-bold text-transparent text-stroke group-hover:text-blue-600 group-hover:text-stroke-0 transition-all duration-500 opacity-50">
         {number}
       </span>
    </div>

    {/* Content */}
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
    
    {/* Hover Indicator */}
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="speaking" ref={containerRef} className="relative bg-[#050505] text-white min-h-screen pt-32 pb-24 overflow-hidden">
      
      {/* Background Noise/Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-blue-900/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
          >
            From The Trenches To The Stage
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase font-['Oswald'] leading-[0.9] mb-10"
          >
            Lessons From <br /> 
            <span className="text-transparent text-stroke-blue">Discomfort,</span> <br />
            Decision-Making, & <br />
            <span className="text-white">Transformation</span>
          </motion.h1>
        </div>

        {/* Why I Speak - Zig Zag */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] border border-white/10 bg-[#0a0a0a] overflow-hidden group"
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
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold uppercase font-['Oswald']">Why I Speak</h2>
            <div className="w-20 h-1 bg-blue-600"></div>
            <p className="text-xl md:text-2xl font-['Syne'] font-bold text-white leading-normal">
              "Because stories move people. And people move companies."
            </p>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed">
              <p>
                I speak to share the leadership lessons learned from selling, hiking, failing, rising, negotiating, building teams, and digitizing supply chains across MEA.
              </p>
              <p>
                My talks are not theoretical. They come from the trenches: customer meetings, warehouses, mountains, airports, and boardrooms. I bring the dust of the road into the clarity of the stage.
              </p>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 text-blue-500 uppercase tracking-widest font-bold text-sm hover:text-white transition-colors">
              Inquire for your event <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        <ShapeDivider />

        {/* Signature Keynotes */}
        <div className="mb-32">
           <div className="mb-16">
             <h2 className="text-4xl md:text-6xl font-bold uppercase font-['Oswald'] mb-4">Signature Keynotes</h2>
             <p className="text-gray-500 max-w-xl">Tailored for executives, supply chain leaders, and ambitious teams.</p>
           </div>

           <div className="flex flex-col">
              <KeynoteCard 
                number="01"
                title="The Power of Getting Uncomfortable"
                description="This is the story of how pushing myself physically, professionally, and emotionally shaped my philosophy. From the Himalayas to high-stakes sales cycles, discomfort became my greatest mentor. I teach teams how to seek friction to find growth."
                tags={['Leadership', 'Resilience', 'Mindset']}
              />
              <KeynoteCard 
                number="02"
                title="The AI Renaissance in Supply Chain"
                description="How AI will redefine the next decade of planning, WMS, and execution. Real examples. Real frameworks. Real transformation. Moving beyond the buzzwords to the operational reality of machine learning in logistics."
                tags={['Technology', 'Innovation', 'Future of Work']}
              />
              <KeynoteCard 
                number="03"
                title="How to Lead in MEA"
                description="A talk rooted in cultural intelligence. Navigating diversity, expectations, pressure, and ambition in one of the world’s most complex regions. Understanding the nuance between a 'Yes' that means 'Maybe' and a 'No' that means 'Negotiate'."
                tags={['Culture', 'Management', 'Regional Strategy']}
              />
              <KeynoteCard 
                number="04"
                title="Scaling SaaS in Emerging Markets"
                description="What nobody tells you about GTM, partnerships, pricing, politics, and people when building in MEA. A playbook for startups and established tech firms looking to conquer the region."
                tags={['Growth', 'SaaS', 'Go-To-Market']}
              />
           </div>
        </div>

        <ShapeDivider />

        {/* Speaking Formats */}
        <div className="mb-24">
           <h2 className="text-center text-4xl font-bold uppercase font-['Oswald'] mb-16">Speaking Formats</h2>
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
