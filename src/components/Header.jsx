import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 transition-all duration-300"
        style={{
          borderBottom: scrolled ? '1px solid #1E1E1E' : '1px solid transparent',
          backgroundColor: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-bold text-base md:text-lg uppercase tracking-[0.08em] text-text-primary hover:text-accent transition-colors duration-300"
          >
            SS<span className="text-accent">.</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="link-brutal"
              >
                {link.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="font-label text-[11px] uppercase tracking-[0.2em] text-bg-primary bg-accent px-4 py-2 hover:bg-text-primary transition-colors duration-300"
            >
              Résumé ↗
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden font-label text-[11px] uppercase tracking-[0.25em] text-text-secondary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-bg-primary flex flex-col items-start justify-center px-8 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {NAV_LINKS.map((link, i) => (
            <motion.button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-display text-[10vw] font-bold uppercase text-text-primary hover:text-accent transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              {link.label}
            </motion.button>
          ))}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-4 font-label text-[11px] uppercase tracking-[0.25em] text-accent border border-accent px-5 py-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Download Résumé ↗
          </motion.a>
        </motion.div>
      )}
    </>
  );
}
