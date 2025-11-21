import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center">
      
      {/* Video Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-50 grayscale-[30%]"
          >
            <source src="https://res.cloudinary.com/dmnqlruhl/video/upload/v1763739146/Video_Project_12_r9tavj.webm" type="video/webm" />
          </video>
          
          {/* Cinematic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-[#050505] z-10"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-center items-center">
        
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-6xl mx-auto"
        >
            {/* Main Headline */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold font-['Oswald'] text-white leading-[0.95] tracking-tight mb-8 drop-shadow-2xl">
              I BUILD <span className="text-transparent text-stroke hover:text-white transition-colors duration-500">SYSTEMS</span>,<br />
              STORIES, & <span className="text-blue-600 relative inline-block">
                TEAMS
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-600/30 blur-sm"></span>
              </span><br />
              THAT LAST.
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mb-12 leading-relaxed">
              From the mountains of Morocco to leading supply chain transformation across MEA, my mission is simple: <span className="text-white font-medium border-b border-blue-500/50">build, elevate, and inspire.</span>
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 w-full md:w-auto justify-center">
                <a href="#story" className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-blue-600 hover:text-white transition-all duration-300 overflow-hidden min-w-[200px] flex justify-center items-center">
                    <span className="relative z-10 flex items-center gap-2">
                        Explore My Journey 
                    </span>
                </a>
                
                <a href="#contact" className="group px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-white/5 backdrop-blur-sm hover:border-blue-500 transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px]">
                    Book a Session <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
            </motion.div>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 mix-blend-difference"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;