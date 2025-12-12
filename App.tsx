
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Hero from './components/Hero';
import Story from './components/Story';
import About from './components/About';
import Services from './components/Services';
import Partners from './components/Partners';
import Stats from './components/Stats';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Speaking from './components/Speaking';
import SupplyChain from './components/SupplyChain';
import Podcast from './components/Podcast';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  // Explicit view state for more robust routing
  const [view, setView] = useState<'home' | 'about' | 'speaking' | 'supply-chain' | 'podcast'>('home');

  // Initialize Smooth Scrolling (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Store globally for navigation resetting
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  // Handle initial load and browser back/forward
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/about')) {
        setView('about');
      } else if (path.startsWith('/podcast')) {
        setView('podcast');
      } else if (path.startsWith('/speaking')) {
        setView('speaking');
      } else if (path.startsWith('/supply-chain')) {
        setView('supply-chain');
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

  // SCROLL TO TOP when view changes
  useEffect(() => {
    // Native Reset
    window.scrollTo(0, 0);
    
    // Lenis Reset (Instant)
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [view]);

  const navigate = (path: string) => {
    let newView: 'home' | 'about' | 'speaking' | 'supply-chain' | 'podcast' = 'home';
    
    if (path.startsWith('/about')) newView = 'about';
    else if (path.startsWith('/podcast')) newView = 'podcast';
    else if (path.startsWith('/speaking')) newView = 'speaking';
    else if (path.startsWith('/supply-chain')) newView = 'supply-chain';

    setView(newView);
    window.history.pushState({}, '', path);
  };

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
          <Background />
          
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
                  <Partners />
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
