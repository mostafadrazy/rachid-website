
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Story from './components/Story';
import About from './components/About';
import Services from './components/Services';
import Stats from './components/Stats';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Speaking from './components/Speaking';
import SupplyChain from './components/SupplyChain';
import Podcast from './components/Podcast';

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  
  // Explicit view state for more robust routing
  const [view, setView] = useState<'home' | 'about' | 'speaking' | 'supply-chain' | 'podcast'>('home');

  // Handle initial load and browser back/forward
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.includes('/about')) {
        setView('about');
      } else if (path.includes('/speaking')) {
        setView('speaking');
      } else if (path.includes('/supply-chain')) {
        setView('supply-chain');
      } else if (path.includes('/podcast')) {
        setView('podcast');
      } else {
        setView('home');
      }
    };

    // Check on mount
    handleLocationChange();

    // Check on popstate (browser back/forward)
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    let newView: 'home' | 'about' | 'speaking' | 'supply-chain' | 'podcast' = 'home';
    
    if (path === '/about') newView = 'about';
    else if (path === '/speaking') newView = 'speaking';
    else if (path === '/supply-chain') newView = 'supply-chain';
    else if (path === '/podcast') newView = 'podcast';

    setView(newView);
    window.history.pushState({}, '', path);
    window.scrollTo(0, 0);
  };

  // Subtle parallax effect based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Derive currentPath for Navbar active states
  const getCurrentPath = () => {
    switch (view) {
      case 'about': return '/about';
      case 'speaking': return '/speaking';
      case 'supply-chain': return '/supply-chain';
      case 'podcast': return '/podcast';
      default: return '/';
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen w-full text-white selection:bg-blue-600 selection:text-white">
          <CustomCursor />
          <Background mousePosition={mousePosition} />
          
          <div className="relative z-10 flex flex-col">
            <Navbar currentPath={getCurrentPath()} onNavigate={navigate} />
            
            <main className="flex-grow">
              {view === 'about' && <About />}
              {view === 'speaking' && <Speaking />}
              {view === 'supply-chain' && <SupplyChain />}
              {view === 'podcast' && <Podcast />}
              {view === 'home' && (
                <>
                  <Hero />
                  <Story />
                  <Services />
                  <Stats />
                </>
              )}
            </main>

            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
