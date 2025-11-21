import React from 'react';
import { Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#050505] text-white pt-32 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
           <div>
             <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs block mb-6">Get In Touch</span>
             <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase font-['Oswald'] leading-[0.9] mb-10">
               Ready To <br/> <span className="text-transparent text-stroke hover:text-white transition-colors duration-500">Transform?</span>
             </h2>
             <a href="mailto:contact@example.com" className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-bold font-['Syne'] border-b-2 border-white/20 pb-4 hover:border-blue-600 hover:text-blue-600 transition-all">
               Book a 1-on-1 <ArrowUpRight className="w-8 h-8 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
             </a>
           </div>
           
           <div className="flex flex-col justify-end items-start lg:items-end space-y-8">
             <p className="text-gray-400 max-w-xs text-left lg:text-right mb-4 text-lg leading-relaxed">
               Based in MEA. Working globally. <br/>
               Specializing in Supply Chain, Leadership, and Growth.
             </p>
             <div className="flex gap-6">
                {[
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 group"
                  >
                    <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
             </div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-600 text-xs uppercase tracking-[0.2em] font-bold">
          <p>© {new Date().getFullYear()} Rachid Portfolio.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;