import React from 'react';

interface BackgroundProps {
  mousePosition: { x: number; y: number };
}

const Background: React.FC<BackgroundProps> = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none">
       {/* Subtle top glow */}
       <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-blue-900/10 to-transparent opacity-50" />
       
       {/* Subtle bottom glow */}
       <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-blue-900/5 to-transparent" />
    </div>
  );
};

export default Background;