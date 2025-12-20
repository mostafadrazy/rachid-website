
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const handleBackHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-900/10 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <span className="text-blue-600 font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">System Alert // 404</span>
        <h1 className="text-8xl md:text-[12rem] font-bold font-['Oswald'] uppercase leading-none tracking-tighter mb-4 text-white">
          Void<span className="text-blue-600">.</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl font-light max-w-md mx-auto mb-12 uppercase tracking-[0.2em] leading-relaxed">
          The requested operational node does not exist in this sector.
        </p>
        
        <a 
          href="/" 
          onClick={handleBackHome}
          className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-blue-600 hover:text-white transition-all rounded-sm shadow-2xl active:scale-95"
        >
          <ArrowLeft size={16} /> Return to Home
        </a>
      </motion.div>

      {/* Ghosting element */}
      <div className="absolute bottom-10 left-10 text-[8px] text-white/10 font-mono uppercase tracking-[1em] select-none">
        Location_Unknown_Ref_Null
      </div>
    </div>
  );
};

export default NotFound;
