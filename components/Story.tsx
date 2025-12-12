
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
      title: "The Story Begins",
      content: "I was born in a small village in the south of Morocco, a place with no tap water, no electricity, and no roads. Nights were lit by candles; days were driven by quiet determination. For years, our village didn’t even exist on Google Maps. Discipline, resilience, and humility weren’t concepts to learn. They were simply how we lived."
    },
    {
      id: "02",
      title: "Lessons in Humanity",
      content: "My first lessons in business & leadership began in my grandfather’s small shop, where I watched him run a business with precision, generosity, and quiet dignity. By the age of nine, I was selling plastic bags in the souk and fruits by the roadside unaware that these small hustles were teaching me the foundations of business, customer experience, and resilience. Those early days didn’t just shape my work ethic. They shaped my understanding of people. They were my first real lessons in humanity."
    },
    {
      id: "03",
      title: "Leading MEA",
      content: "After crossing continents, shifting industries, rebuilding from zero more than once, and consistently choosing the harder road, I now lead Slimstock MEA and advise businesses across the region on strategic growth."
    },
    {
      id: "04",
      title: "The Climb",
      content: "Challenge became my compass as I grew older. When I’m not working, I seek mountains, silence, and moments that test my limits. I’ve stood on the summits of Kilimanjaro, Mount Toubkal, and Mont Blanc, and walked the long route to Everest Base Camp. Every climb teaches the same truth: Growth lives just beyond discomfort. And clarity arrives when the noise finally falls away."
    },
    {
      id: "05",
      title: "The Journey Today",
      content: "The journey shaped me. The struggles softened me. The mountains humbled me. Today, I carry those lessons into my work, helping others build, grow, and lead with clarity and purpose. Because no matter where we begin, every journey has the power to inspire the next."
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
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase font-['Oswald'] leading-none mb-8">
                A Journey of <br/> Growth
              </h2>
              <div className="w-20 h-1 bg-blue-600 mb-8"></div>
              <p className="text-gray-400 text-lg font-medium">
                "No matter where we begin, every journey holds the power to inspire the next one."
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

                <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-white/5 font-['Oswald'] absolute -top-12 left-10 group-hover:text-blue-600/10 transition-colors duration-500 select-none">
                  {chapter.id}
                </span>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase font-['Oswald'] mb-6 relative z-10 text-white group-hover:text-blue-500 transition-colors">
                  {chapter.title}
                </h3>
                
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium group-hover:text-white transition-colors duration-500 whitespace-pre-line">
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
                 <p className="font-['Syne'] text-3xl md:text-5xl font-bold leading-tight mb-8 text-white">
                   "Growth is always waiting just beyond discomfort."
                 </p>
                 <span className="text-blue-500 uppercase tracking-widest text-sm font-bold">— Rachid</span>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Story;
