
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Loader: React.FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
  const [index, setIndex] = useState(0);
  const words = ["Supply Chain", "Leadership", "Growth"];

  useEffect(() => {
    // Faster pacing for a more energetic feel
    const interval = 1200;

    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev === words.length - 1) {
          clearInterval(timer);
          // Allow the last word to sit for a moment before lifting the curtain
          setTimeout(onLoadingComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  // Text Animation: Slide up with a slight rotation/skew for momentum
  const textVariants: Variants = {
    initial: { y: "110%", opacity: 0, rotateX: 20 },
    animate: { 
      y: "0%", 
      opacity: 1, 
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      y: "-110%", 
      opacity: 0, 
      rotateX: -20,
      transition: { duration: 0.4, ease: "easeIn" } 
    }
  };

  return (
    <motion.div
      // The curtain pull effect
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
    >
      <div className="relative overflow-hidden px-4 md:px-12 py-4 flex justify-center items-center w-full">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase font-['Oswald'] text-white tracking-tighter leading-none text-center"
          >
            {words[index]}
            <span className="text-blue-600 inline-block ml-1">.</span>
          </motion.h1>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Loader;
