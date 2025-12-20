
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Globe, Zap, Handshake } from 'lucide-react';

const partners = [
  {
    id: 1,
    title: "Strategic Signing",
    category: "Global Alliance",
    image: "https://res.cloudinary.com/dmnqlruhl/image/upload/v1766255837/41326EAE-13A4-47A7-B32D-DB083FBCC632_xiepcf.jpg",
    icon: <Handshake size={20} />,
    position: "object-center"
  },
  {
    id: 2,
    title: "Expansion Agreement",
    category: "Joint Venture",
    image: "https://res.cloudinary.com/dmnqlruhl/image/upload/v1766255831/9953B469-4CCB-435C-8459-60B862E731E0_i6vlgo.jpg",
    icon: <Globe size={20} />,
    position: "object-[15%_center]" // Shifted slightly from far left to better frame the handshake
  },
  {
    id: 3,
    title: "Leadership Summit",
    category: "Strategic",
    image: "https://res.cloudinary.com/dmnqlruhl/image/upload/v1766255826/1256683E-55B3-4583-9CCA-C8F4750C8A52_1_o65ou2.jpg",
    icon: <ShieldCheck size={20} />,
    position: "object-center"
  }
];

// Double the partners array multiple times for a seamless, dense looping marquee
const extendedPartners = [...partners, ...partners, ...partners, ...partners];

const PartnerCard: React.FC<{ partner: typeof partners[0] }> = ({ partner }) => {
  return (
    <div className="relative h-[450px] w-[320px] md:w-[400px] shrink-0 group overflow-hidden border border-white/5 bg-[#0a0a0a] rounded-sm">
      {/* Image Layer */}
      <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110">
        <img 
          src={partner.image} 
          alt={partner.title} 
          className={`w-full h-full object-cover ${partner.position || 'object-center'} grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-700`}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-90"></div>
        <div className="absolute inset-0 border-r border-white/5"></div>
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                {partner.icon}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ArrowUpRight className="text-white/40" size={24} />
            </div>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-2 block">
                {partner.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold uppercase font-['Oswald'] text-white leading-none drop-shadow-2xl">
              {partner.title}
            </h3>
            <div className="mt-4 h-[1px] w-0 bg-blue-600 group-hover:w-full transition-all duration-700"></div>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

const Partners: React.FC = () => {
  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="partners" className="bg-[#050505] py-32 relative overflow-hidden">
      {/* Background Decor: Scanning Light Beam */}
      <motion.div 
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-0 w-1/3 h-[500px] bg-blue-600/5 blur-[120px] -translate-y-1/2 pointer-events-none rotate-12"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] block mb-4">Strategic Alliances</span>
             <h2 className="text-5xl md:text-8xl font-bold uppercase font-['Oswald'] leading-[0.85] tracking-tighter">
               Partnerships <br/> <span className="text-transparent text-stroke-blue">Built on Trust</span>
             </h2>
           </motion.div>
           
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="hidden lg:block max-w-xs text-right"
           >
             <p className="text-gray-500 text-sm font-light leading-relaxed">
               Collaborating with the world's most innovative organizations to redefine the future of supply chain excellence through high-stakes commitment.
             </p>
           </motion.div>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden flex py-10">
        {/* Left/Right Fades for immersion */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>

        <motion.div 
          className="flex gap-6 md:gap-8"
          animate={{ x: [0, -1 * (partners.length * 408)] }} 
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          // Pause on hover
          whileHover={{ animationPlayState: 'paused' }}
        >
          {extendedPartners.map((partner, index) => (
            <PartnerCard key={`${partner.id}-${index}`} partner={partner} />
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-20 relative z-10 flex justify-center">
         <motion.a 
           whileHover={{ scale: 1.05 }}
           href="/contact" 
           onClick={(e) => handleNavigate(e, '/contact')}
           className="group flex items-center gap-6 px-8 py-4 bg-white/5 border border-white/10 hover:border-blue-500/50 backdrop-blur-md transition-all duration-300"
         >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 group-hover:text-white transition-colors">
                Initiate a Partnership
            </span>
            <div className="w-8 h-[1px] bg-blue-600 group-hover:w-12 transition-all"></div>
            <ArrowUpRight size={18} className="text-blue-500" />
         </motion.a>
      </div>
    </section>
  );
};

export default Partners;
