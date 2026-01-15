
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Hero from './components/Hero';
import Story from './components/Story';
import Services from './components/Services';
import Partners from './components/Partners';
import Stats from './components/Stats';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import About from './components/About';
import Speaking from './components/Speaking';
import SupplyChain from './components/SupplyChain';
import Podcast from './components/Podcast';
import Blog from './components/Blog';
import Admin from './components/Admin';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

type ViewType = 'home' | 'about' | 'speaking' | 'supply-chain' | 'podcast' | 'blog' | 'admin' | 'contact' | '404';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewType>('home');

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
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === '/about') setView('about');
      else if (path === '/speaking') setView('speaking');
      else if (path === '/supply-chain') setView('supply-chain');
      else if (path === '/zero-to-n') setView('podcast');
      else if (path === '/blog') setView('blog');
      else if (path === '/admin') setView('admin');
      else if (path === '/contact') setView('contact');
      else if (path === '/') setView('home');
      else setView('404');
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [view]);

  const navigate = (path: string) => {
    let newView: ViewType = 'home';
    if (path === '/about') newView = 'about';
    else if (path === '/speaking') newView = 'speaking';
    else if (path === '/supply-chain') newView = 'supply-chain';
    else if (path === '/zero-to-n') newView = 'podcast';
    else if (path === '/blog') newView = 'blog';
    else if (path === '/admin') newView = 'admin';
    else if (path === '/contact') newView = 'contact';
    else if (path !== '/') newView = '404';

    setView(newView);
    window.history.pushState({}, '', path);
  };

  const getCurrentPath = () => {
    if (view === 'home') return '/';
    if (view === 'podcast') return '/zero-to-n';
    if (view === '404') return window.location.pathname;
    return `/${view}`;
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
              {view === 'blog' && <Blog />}
              {view === 'admin' && <Admin />}
              {view === 'contact' && <Contact />}
              {view === '404' && <NotFound />}
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
