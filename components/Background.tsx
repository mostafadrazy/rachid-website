
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundProps {
  mousePosition: { x: number; y: number };
}

const Background: React.FC<BackgroundProps> = ({ mousePosition }) => {
  return (
    <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none overflow-hidden">
       {/* Dynamic Spotlight that follows mouse */}
       <motion.div 
          className="absolute rounded-full opacity-20 blur-[100px] mix-blend-screen"
          animate={{
            x: mousePosition.x * window.innerWidth - 300, // Center the 600px circle
            y: mousePosition.y * window.innerHeight - 300,
          }}
          transition={{
            type: "spring",
            damping: 50,
            stiffness: 400,
            mass: 0.5
          }}
          style={{
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, rgba(37, 99, 235, 0) 70%)"
          }}
       />

       {/* Subtle top glow - Static Anchor */}
       <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-blue-900/5 to-transparent opacity-40" />
       
       {/* Subtle bottom glow - Static Anchor */}
       <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-blue-900/5 to-transparent" />
    </div>
  );
};

export default Background;
