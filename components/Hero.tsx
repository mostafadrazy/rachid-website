
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, Variants, useSpring, useVelocity } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

// --- Kinetic Text Component ---
const KineticText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  // Skew based on velocity
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);

  return (
    <motion.div style={{ skewX }} className={className}>
      {children}
    </motion.div>
  );
};

// --- Magnetic Button Component ---
const MagneticButton: React.FC<{ 
  children: React.ReactNode; 
  href: string; 
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ children, href, className, onClick }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    // Calculate distance from center
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Move button slightly towards cursor (magnetic effect)
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};


const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

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
            {/* Main Headline with Kinetic Typography */}
            <KineticText className="mb-6 md:mb-8">
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold font-['Oswald'] text-white leading-[0.9] tracking-tight drop-shadow-2xl uppercase">
                I Build <span className="text-transparent text-stroke-blue hover:text-white transition-colors duration-500">Systems</span>,<br />
                Stories, and <br/>
                <span className="text-blue-600 relative inline-block">
                  Teams That Last
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-600/30 blur-sm"></span>
                </span>
              </motion.h1>
            </KineticText>

            {/* Subheadline */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium max-w-3xl md:max-w-4xl mb-8 md:mb-12 leading-relaxed px-4">
              From a small village on the south of Morocco to leading transformations across continents, my mission is simple: <span className="font-bold text-blue-600">Build, Elevate, and Inspire.</span>
            </motion.p>

            {/* Magnetic Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto justify-center items-center">
                
                <MagneticButton href="#story" className="group relative px-8 py-4 md:px-10 md:py-5 bg-white text-black font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-blue-600 hover:text-white transition-all duration-300 overflow-hidden min-w-[200px] md:min-w-[240px] flex justify-center items-center shadow-[0_0_30px_rgba(255,255,255,0.15)] rounded-sm">
                    <span className="relative z-10 flex items-center gap-2">
                        Explore My Journey 
                    </span>
                </MagneticButton>
                
                <MagneticButton 
                  href="/contact" 
                  onClick={(e) => handleNavigate(e, '/contact')}
                  className="group px-8 py-4 md:px-10 md:py-5 border-2 border-white/20 text-white font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-white/10 backdrop-blur-sm hover:border-blue-500 transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px] md:min-w-[240px] rounded-sm"
                >
                    Reach Out <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[3px]" />
                </MagneticButton>

            </motion.div>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 mix-blend-difference"
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
