
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

  const scrollToElement = (href: string) => {
    const targetId = href.includes('#') ? href.split('#')[1] : '';
    
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        // Add a small offset for the fixed header
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string, isRoute: boolean) => {
    e.preventDefault();
    setIsMobileOpen(false);

    if (isRoute) {
      // Always navigate for pages like /about
      onNavigate(href);
    } else {
      // It's a section link (like #story)
      if (currentPath !== '/') {
        // If we are on a subpage, go Home first
        onNavigate('/');
        // Wait for Home component to mount then scroll
        setTimeout(() => {
          scrollToElement(href);
        }, 200); 
      } else {
        // Already on Home, just scroll
        scrollToElement(href);
      }
    }
  };

  const navLinks = [
    { name: 'Journey', href: '/#story', isRoute: false },
    { name: 'About', href: '/about', isRoute: true },
    { name: 'Supply Chain', href: '/supply-chain', isRoute: true },
    { name: 'Speaking', href: '/speaking', isRoute: true },
    { name: 'Podcast', href: '/podcast', isRoute: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled ? 'bg-[#050505]/90 backdrop-blur-md border-white/5 py-4' : 'bg-transparent border-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="/" 
            onClick={(e) => handleNavClick(e, '/', false)}
            className="text-xl md:text-2xl font-bold tracking-tighter uppercase font-['Oswald'] text-white z-50 relative"
          >
            Rachid<span className="text-blue-600">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isRoute)}
                  className={`relative px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer group ${
                    (link.isRoute && currentPath === link.href) ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Hover Line Effect */}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-blue-600 transform origin-left transition-transform duration-300 ${
                    (link.isRoute && currentPath === link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', false)}
              className="ml-4 border border-white/20 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
            >
              Book a 1-on-1
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white z-50 p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isRoute)}
                  className="text-4xl font-bold uppercase font-['Oswald'] text-white hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', false)}
              className="mt-8 text-lg font-bold uppercase tracking-widest text-blue-500 border border-blue-500 px-10 py-4 hover:bg-blue-500 hover:text-white transition-colors"
            >
              Book a 1-on-1
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
