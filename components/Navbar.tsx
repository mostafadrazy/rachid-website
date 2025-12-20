
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    onNavigate(href);
  };

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Supply Chain', href: '/supply-chain' },
    { name: 'Blog', href: '/blog' },
    { name: 'Speaking', href: '/speaking' },
    { name: 'Podcast', href: '/podcast' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled ? 'bg-[#050505]/90 backdrop-blur-md border-white/5 py-4' : 'bg-transparent border-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="/" onClick={(e) => handleNavClick(e, '/')} className="w-10 h-10 md:w-12 md:h-12 text-white">
             <svg viewBox="0 0 417.51 368.54" fill="currentColor" className="w-full h-full"><path d="M200.89,222.4c31.42,32.21,59.72,71.71,105.7,83.71,26.7-16.21,50.69-36.83,74.32-57.2,10.35-2.03,4.11,5.07,0,8.99-8.18,7.79-19.54,16.29-28.56,23.45-11.64,9.24-23.96,17.63-35.46,27.03,35.72,7.91,72.48-6.33,100.5-27.98,1.94,28.02-21.4,54.44-44.2,67.8-12.45,7.3-49.08,21.43-62.81,20.28-1.37-.11-2.89-.13-3.41-1.69l.87-3.94c41.52-5.75,88.82-24.91,102.04-68.45-8.27,3.76-15.88,8.68-24.32,12.17-19.24,7.96-38.23,11.37-59.16,9.81-4.38-.33-14.61-3.41-17.78-2.83-4.17.75-24.4,15.2-30.71,18.37-49.89,25.04-87.24.36-135.81-7.23-21.74-3.39-42.91-2.25-64.41,2.01-10.64,2.11-24.09,8.11-33.55,9.49-1.48.22-2.9.6-4.31-.22l-.84-4.48c10.4-3.82,21.09-7.01,31.89-9.6,5.12-1.23,19.32-2.56,22.57-4.43,4.35-2.51,14.48-15.58,17.83-20.17,1.58-2.16,13.62-19.86,12.6-20.89-10.03,4.55-19.53,10.46-29.64,14.85-27.27,11.86-84.05,30.11-93.08-12.63-7.73-36.59,24.39-63.67,53.56-78.38-4.62-80.56,56.84-141.75,123.14-176.36,37.52-19.59,106.6-40.42,139.53-3.49,32.15,36.05-1.85,90.27-26.54,120.49-25.45,31.15-57.41,58.13-89.98,81.54ZM123.14,103.62c8.34-3.09,17.38-4.05,26.29-3.27,20.21,1.76,20.59,10.03,41.18-3.74,3.5-2.34,23.34-21.58,20.85-8.18-1.42,7.62-7,20.29-9.82,28.21-9.89,27.78-21.19,55.11-32.63,82.27l27.2,19.34c38.69-28.84,78.61-61.94,105.49-102.54,21.31-32.18,39.99-83.64-6.83-103.8-59.74-25.73-156.82,35.41-194.96,80.01-24.57,28.73-40.68,66.09-39.02,104.47,9.71-3.44,18.84-8.19,28.98-10.51,25.48-5.82,51.06-1.53,74,10.51l38-100c-6.72,4.13-16.5,13.05-24.47,14.02-14.2,1.75-25.93-5.69-40.92-3.92-4.41.52-8.39,3.12-12.95,2.96-1.55-.37-1.75-4.74-.41-5.83ZM160.89,201.39c-24.21-11.33-47.5-15.76-73.76-8.28-3.69,1.05-22.55,7.84-24.24,9.75-2.87,3.23,1.06,10.34,0,14.52l-5.54-.96-1.95-10.04c-24.91,14.67-57.89,40.2-47.45,73.44,7.48,23.82,32.64,21.16,52.38,16.48,25.68-6.09,49.21-19.29,71.63-32.63l28.94-62.28ZM190.89,223.36c.93-1.37-23.38-19.13-24.99-17.98l-23,51,47.99-33.02ZM300.88,310.39c-30.4-7.69-54.32-30.09-75.51-52-4.01-4.15-26.59-31.17-29.81-30.87l-58.58,40.46c-10.44,17.09-19.9,35-34.1,49.39,10.69-1.51,21.67-1.05,32.37.14,47.87,5.29,88.61,33.2,137.32,10.06l28.31-17.18Z"/></svg>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer group ${
                    (currentPath === link.href) ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-blue-600 transform origin-left transition-transform duration-300 ${
                    (currentPath === link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </a>
            ))}
            <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')} className="ml-4 border border-white/20 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
              Reach Out
            </a>
          </div>

          <button className="md:hidden text-white z-50 p-2" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center space-y-8 md:hidden">
            {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-4xl font-bold uppercase font-['Oswald'] text-white hover:text-blue-600 transition-colors">
                  {link.name}
                </a>
            ))}
            <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')} className="text-4xl font-bold uppercase font-['Oswald'] text-blue-500 hover:text-white transition-colors">
              Reach Out
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
