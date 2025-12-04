
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#000000] pointer-events-none overflow-hidden">
       {/* Subtle top glow - Static Anchor */}
       <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-blue-900/5 to-transparent opacity-40" />
       
       {/* Subtle bottom glow - Static Anchor */}
       <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-blue-900/5 to-transparent" />
    </div>
  );
};

export default Background;