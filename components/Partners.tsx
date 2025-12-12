
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MoveHorizontal } from 'lucide-react';

const partners = [
  {
    id: 1,
    title: "Strategic Signing Ceremony",
    category: "Global Alliance",
    image: "https://res.cloudinary.com/dmnqlruhl/image/upload/v1763748388/WhatsApp_Image_2025-11-21_at_18.28.58_4a51f166_jwqpmm.jpg",
    description: "Formalizing a new chapter in regional supply chain excellence."
  },
  {
    id: 2,
    title: "Expansion Agreement",
    category: "Joint Venture",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop",
    description: "Expanding our operational footprint across emerging markets."
  },
  {
    id: 3,
    title: "Technology Partnership",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    description: "Integrating next-gen AI capabilities into our core systems."
  },
  {
    id: 4,
    title: "Leadership Summit",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    description: "Building relationships that drive sustainable growth."
  }
];

const PartnerCard: React.FC<{ partner: typeof partners[0] }> = ({ partner }) => {
  return (
    <motion.div
      className="relative h-[500px] min-w-[85vw] md:min-w-[60vw] lg:min-w-[35vw] overflow-hidden border border-white/10 bg-[#0a0a0a] group shrink-0 select-none"
    >
      {/* Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={partner.image} 
          alt={partner.title} 
          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12">
        
        {/* Top Tag */}
        <div className="absolute top-8 right-8 translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
           <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-[0_0_15px_rgba(37,99,235,0.4)]">
             {partner.category}
           </span>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-3xl md:text-4xl font-bold uppercase font-['Oswald'] text-white mb-4 leading-none drop-shadow-lg">
              {partner.title}
            </h3>
            <div className="h-[2px] w-12 bg-blue-600 mb-6 group-hover:w-full transition-all duration-500 opacity-70 group-hover:opacity-100"></div>
            <p className="text-gray-300 text-lg font-light max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
              {partner.description}
            </p>
        </div>
      </div>
    </motion.div>
  );
};

const Partners: React.FC = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const innerCarousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
        if (carousel.current && innerCarousel.current) {
            setWidth(innerCarousel.current.scrollWidth - carousel.current.offsetWidth);
        }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <section id="partners" className="bg-[#050505] py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-900/30 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-blue-900/5 blur-[150px] pointer-events-none rounded-t-full" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs block mb-4">Alliances</span>
             <h2 className="text-5xl md:text-7xl font-bold uppercase font-['Oswald'] leading-none">
               Strategic <br/> <span className="text-transparent text-stroke hover:text-white transition-colors duration-500">Partnerships</span>
             </h2>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="max-w-md text-right flex flex-col items-end"
           >
             <p className="text-gray-400 text-lg font-light mb-6">
               Forging powerful connections with industry leaders.
             </p>
             <div className="flex items-center gap-4 text-blue-500 text-sm font-bold uppercase tracking-widest animate-pulse">
                <MoveHorizontal /> Drag to Explore
             </div>
           </motion.div>
        </div>

        {/* Carousel Slider */}
        <motion.div 
            ref={carousel} 
            className="cursor-grab active:cursor-grabbing overflow-hidden -mx-6 md:-mx-12 px-6 md:px-12"
        >
             <motion.div 
                ref={innerCarousel}
                drag="x" 
                dragConstraints={{ right: 0, left: -width }} 
                whileTap={{ cursor: "grabbing" }}
                className="flex gap-6 md:gap-8"
             >
                {partners.map((partner, index) => (
                    <PartnerCard key={partner.id} partner={partner} />
                ))}
             </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
             <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-blue-500 transition-colors border-b border-white/20 pb-1 hover:border-blue-500">
               Become a Partner <ArrowUpRight size={16} />
             </a>
        </div>

      </div>
    </section>
  );
};

export default Partners;
