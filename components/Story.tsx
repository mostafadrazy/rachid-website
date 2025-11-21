import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Story: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const chapters = [
    {
      id: "01",
      title: "The Beginning",
      content: "I was born in a tiny village in the south of Morocco. A place with no tap water, no electricity, and no roads. Nights were guided by candlelight and days by a sense of quiet determination. For years, our village didn’t even appear on Google Maps. Discipline, resilience, and humility were not ideas. They were the way we survived. They were simply life."
    },
    {
      id: "02",
      title: "The Souk & The Street",
      content: "My earliest lessons in business and leadership came from my grandfather. I watched him run our small shop with care, precision, and generosity. I started working at the age of nine. I sold plastic bags in the souk, fruits on the roadside, and anything that could help us move forward. I didn’t know it then, but those moments were my first lessons in business, supply chain, customer experience, and entrepreneurship."
    },
    {
      id: "03",
      title: "The Climb",
      content: "Years later, after crossing continents, changing industries, starting from zero more than once, and choosing the harder path every single time, I now lead Slimstock MEA and advise businesses across the region on their growth strategies. As I grew older, challenge became my compass. I look for mountains, silence, and moments that push me beyond my limits."
    },
    {
      id: "04",
      title: "The Philosophy",
      content: "I also find peace in reading, writing, and learning. They keep me curious. They keep me grounded. They keep me connected to a world much bigger than my own. The journey shaped me. The struggles softened me. The mountains humbled me. And today, I carry all those lessons into the work I do."
    }
  ];

  return (
    <section ref={targetRef} id="story" className="relative bg-[#050505] text-white py-32">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Sticky Sidebar */}
          <div className="lg:w-1/3 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center py-12 lg:py-0">
            <motion.div style={{ opacity }} className="relative">
              <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Biography</span>
              <h2 className="text-6xl md:text-8xl font-bold uppercase font-['Oswald'] leading-none mb-8">
                The <br/> Journey
              </h2>
              <div className="w-20 h-1 bg-blue-600 mb-8"></div>
              <p className="text-gray-400 text-lg">
                A story of resilience, from the Atlas mountains to the forefront of supply chain innovation.
              </p>
            </motion.div>
          </div>

          {/* Scrolling Content */}
          <div className="lg:w-2/3 py-12 lg:py-32 space-y-32">
            {chapters.map((chapter, index) => (
              <motion.div 
                key={chapter.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
                className="group relative pl-8 md:pl-16 border-l border-white/10"
              >
                {/* Active Indicator Line */}
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="absolute left-[-1px] top-0 w-[3px] bg-blue-600"
                />

                <span className="text-8xl font-bold text-white/5 font-['Oswald'] absolute -top-12 left-10 group-hover:text-blue-600/10 transition-colors duration-500 select-none">
                  {chapter.id}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-bold uppercase font-['Oswald'] mb-6 relative z-10">
                  {chapter.title}
                </h3>
                
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light group-hover:text-gray-200 transition-colors duration-500">
                  {chapter.content}
                </p>
              </motion.div>
            ))}

            {/* Quote Block */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative p-12 md:p-20 bg-[#0a0a0a] border border-white/5 overflow-hidden mt-20"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
               <div className="relative z-10 text-center">
                 <p className="font-['Syne'] text-3xl md:text-5xl font-bold leading-tight mb-8">
                   "Growth is always waiting just beyond discomfort."
                 </p>
                 <span className="text-blue-500 uppercase tracking-widest text-xs font-bold">— Rachid</span>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Story;