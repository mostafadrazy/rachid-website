
import React from 'react';
import { Linkedin, Instagram, ArrowUpRight, Youtube } from 'lucide-react';

// Custom Icons for X (Twitter) and TikTok
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer: React.FC = () => {
  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <footer id="contact" className="bg-[#050505] text-white pt-32 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:justify-between lg:items-end mb-32">
           
           {/* Left Side: Headline */}
           <div className="text-center lg:text-left max-w-4xl">
             <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs block mb-6">Get In Touch</span>
             <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase font-['Oswald'] leading-[0.9]">
               Ready To <br/> <span className="text-transparent text-stroke hover:text-white transition-colors duration-500">Transform?</span>
             </h2>
           </div>
           
           {/* Right Side: CTA & Info */}
           <div className="flex flex-col items-center lg:items-end gap-10 lg:pb-2">
             
             {/* CTA Button */}
             <a 
              href="/contact" 
              onClick={(e) => handleNavigate(e, '/contact')}
              className="group flex items-center gap-4 text-2xl md:text-3xl font-bold font-['Syne'] bg-white text-black px-8 py-4 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-blue-900/50"
             >
               Reach Out <ArrowUpRight className="w-8 h-8 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
             </a>

             <div className="flex flex-col items-center lg:items-end gap-6">
                <p className="text-gray-400 text-center lg:text-right text-base md:text-lg leading-relaxed max-w-xs">
                  Based in MEA. Working globally. <br/>
                  Specializing in Supply Chain, Leadership, and Growth.
                </p>
                
                <div className="flex gap-4">
                    {[
                      { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/rachidlabrik/" },
                      { icon: <XIcon />, href: "#" },
                      { icon: <Youtube className="w-5 h-5" />, href: "#" },
                      { icon: <Instagram className="w-5 h-5" />, href: "#" },
                      { icon: <TikTokIcon />, href: "#" }
                    ].map((social, i) => (
                      <a 
                        key={i}
                        href={social.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 group"
                      >
                        <div className="group-hover:scale-110 transition-transform">
                            {social.icon}
                        </div>
                      </a>
                    ))}
                </div>
             </div>
           </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-600 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
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
