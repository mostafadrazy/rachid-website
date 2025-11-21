
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const AnimatedNumber: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} />;
};

const Stats: React.FC = () => {
  const stats = [
    {
      value: 100,
      suffix: "M+",
      label: "Regional ARR Growth",
      sub: "Driving consistent revenue"
    },
    {
      value: 10,
      suffix: "+",
      label: "Countries Deployed",
      sub: "Across MEA Region"
    },
    {
      value: 3,
      suffix: "",
      label: "Major Summits",
      sub: "Kilimanjaro, Toubkal, Blanc"
    }
  ];

  return (
    <section id="stats" className="py-32 bg-[#050505] text-white relative overflow-hidden border-t border-white/5">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          <div className="lg:w-1/3 sticky top-32">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
               <h2 className="text-7xl md:text-8xl font-bold uppercase leading-[0.85] mb-8 font-['Oswald'] tracking-tighter">
                 Impact <br/> By The <br/> <span className="text-blue-600">Numbers</span>
               </h2>
               <p className="text-lg text-gray-400 font-medium leading-relaxed border-l-4 border-blue-600 pl-6 mb-10">
                 Real impact isn't just about the destination. It's about the growth, reach, and resilience built along the way.
               </p>
               <a href="#contact" className="inline-block border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-blue-600 hover:border-blue-600 transition-all">
                 Let's Work Together
               </a>
             </motion.div>
          </div>

          <div className="lg:w-2/3 flex flex-col w-full">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group border-b border-white/10 py-16 hover:bg-white/5 transition-colors px-4 md:px-8 relative"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-10">
                  <span className="text-7xl md:text-9xl font-bold font-['Oswald'] text-white tracking-tighter group-hover:text-blue-500 transition-colors">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </span>
                  <div className="text-right md:text-left">
                    <span className="block text-xl font-bold uppercase tracking-wider text-white mb-1">{stat.label}</span>
                    <span className="block text-sm text-gray-500 font-mono">{stat.sub}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;
