import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';

function useLiveClock() {
  const [t, setT] = useState('--:--');
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useLiquidFreq() {
  const [freq, setFreq] = useState('0.012 0.008');
  useEffect(() => {
    let t = 0, raf;
    const tick = () => {
      t += 0.003;
      setFreq(`${(0.012 + Math.sin(t) * 0.004).toFixed(4)} ${(0.008 + Math.cos(t * 0.7) * 0.003).toFixed(4)}`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return freq;
}

export default function HeroSection() {
  const time  = useLiveClock();
  const freq  = useLiquidFreq();

  return (
    <section id="intro" className="relative w-full h-screen overflow-hidden bg-bg-primary">

      {/* ── Liquid SVG filter ── */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="liq" x="-4%" y="-20%" width="108%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ── 3D canvas ── */}
      <HeroCanvas />

      {/* ── Overlay ── */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between px-6 lg:px-10">

        {/* ── TOP STRIP ── */}
        <div className="flex justify-between items-end pt-24 pb-6 border-b border-border/20">
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-text-tertiary">
              ( 01 — Intro )
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-text-secondary mt-1">
              Systems &amp; Backend Engineer
            </p>
          </motion.div>

          {/* availability pill */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            <span className="block w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-text-secondary">
              Open to opportunities
            </span>
          </motion.div>

          <motion.div
            className="text-right"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-text-secondary">
              4th Year · ISE · CGPA 8.48
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-text-tertiary mt-1">
              MIT Mysore · Mysore, IN
            </p>
          </motion.div>
        </div>

        {/* ── CENTRE — MASSIVE NAME ── */}
        <div className="flex-1 flex flex-col justify-center">

          {/* THE NAME — 17vw fills ~90% width on any screen */}
          <div className="overflow-hidden">
            <motion.h1
              style={{
                fontSize: '17vw',
                letterSpacing: '-0.038em',
                lineHeight: 0.87,
                whiteSpace: 'nowrap',
                filter: 'url(#liq)',
                willChange: 'filter',
              }}
              className="font-display font-black uppercase"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ delay: 0.05, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-text-primary">SHASHANK </span>
              <span className="text-accent">S</span>
            </motion.h1>
          </div>

          {/* Statement line — large and readable */}
          <motion.p
            className="font-display font-bold uppercase text-text-secondary mt-4"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            I build systems that scale.
          </motion.p>

          {/* Skills chips */}
          <motion.div
            className="flex flex-wrap gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {['Java', 'Python', 'Node.js', 'AWS', 'MySQL', 'Docker', 'React', 'Three.js'].map((s) => (
              <span key={s}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-tertiary border border-border/60 px-3 py-1">
                {s}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <div className="flex justify-between items-center pb-6 pt-4 border-t border-border/20">

          {/* Left — CTA links */}
          <motion.div
            className="flex items-center gap-6 pointer-events-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <a href="https://github.com/shashankachar19" target="_blank" rel="noreferrer"
              className="font-mono text-xs uppercase tracking-[0.28em] text-text-secondary hover:text-accent transition-colors duration-300">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/shashank-s-50506b312" target="_blank" rel="noreferrer"
              className="font-mono text-xs uppercase tracking-[0.28em] text-text-secondary hover:text-accent transition-colors duration-300">
              LinkedIn ↗
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer"
              className="pointer-events-auto font-mono text-xs uppercase tracking-[0.28em] text-accent border border-accent/40 px-3 py-1.5 hover:bg-accent hover:text-bg-primary transition-all duration-300">
              Résumé ↗
            </a>
          </motion.div>

          {/* Right — live status */}
          <motion.div
            className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span>IST {time}</span>
            <span className="opacity-30">·</span>
            <span>Backend Architecture</span>
            <span className="opacity-30">·</span>
            <span>Zero-Trust Security</span>
          </motion.div>
        </div>

      </div>

      {/* Scroll line */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-text-tertiary"
          style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <motion.div className="w-px bg-text-tertiary/30" style={{ height: 52, originY: 0 }}
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ delay: 2, duration: 1 }} />
      </motion.div>

    </section>
  );
}
