import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import Loader from './components/Loader';
import Header from './components/Header';
import HeroCanvas from './components/HeroCanvas';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Stack from './components/Stack';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('portfolio:loader-played') === '1') {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [loaded]);

  return (
    <>
      {/* Subtle noise overlay */}
      <div className="noise-overlay" />

      {/* Loader */}
      <Loader onComplete={handleLoaderComplete} />

      {loaded && (
        <>
          <CustomCursor />
          {/* 3D Canvas — fixed background behind everything (like haoqi.design) */}
          <HeroCanvas />

          <Header />
          <main className="relative z-10">
            <Hero />

            <div className="hard-rule" />
            <About />

            <div className="hard-rule" />
            <Projects />

            <div className="hard-rule" />
            <Experience />

            <Stack />

            <Contact />
          </main>
        </>
      )}
    </>
  );
}

export default App;
