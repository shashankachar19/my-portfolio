import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TechSticker from './TechSticker';

function useLiveClock() {
  const [t, setT] = useState('--:--');
  useEffect(() => {
    const tick = () =>
      setT(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useMouseCoords() {
  const [coords, setCoords] = useState({ x: '0000', y: '0000' });
  useEffect(() => {
    const handler = (e) =>
      setCoords({
        x: String(e.clientX).padStart(4, '0'),
        y: String(e.clientY).padStart(4, '0'),
      });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return coords;
}

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
});

const nameReveal = {
  hidden: { y: '120%' },
  visible: { y: '0%', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const time = useLiveClock();
  const coords = useMouseCoords();

  return (
    <section
      id="intro"
      className="relative w-full h-screen grid grid-cols-12 grid-rows-[auto_1fr] px-6 lg:px-10 pt-24 pb-8"
    >
      {/* ── TOP ROW: Info blocks in 12-col grid ── */}
      <div className="relative z-10 col-span-12 grid grid-cols-12 gap-4 font-mono text-sm mt-4">
        <motion.div className="col-span-12 lg:col-span-3 p-2" {...fadeIn(0.3)}>
          <p className="font-display font-medium text-xl md:text-2xl leading-tight text-text-primary uppercase">
            Design &<br />Engineering
          </p>
        </motion.div>

        <motion.div className="hidden lg:block col-span-3 col-start-4 p-2" {...fadeIn(0.5)}>
          <p className="font-mono text-xs uppercase tracking-wider leading-relaxed text-text-secondary">
            Building systems.<br />Shipping products.
          </p>
        </motion.div>

        <motion.div className="col-span-12 lg:col-span-4 lg:col-start-9 p-2" {...fadeIn(0.7)}>
          <p className="font-mono text-xs uppercase tracking-wider leading-relaxed text-text-secondary">
            I'm Shashank S, a 4th year ISE student at MIT Mysore. Full-stack developer,
            hackathon builder, and cloud enthusiast shipping real-world systems.
          </p>
        </motion.div>
      </div>

      {/* ── BOTTOM: Statement text (Massive Overlapping Typography like haoqi.design) ── */}
      <div className="relative z-10 col-span-12 self-center lg:self-end flex flex-col items-center lg:items-start px-2 pb-12 mix-blend-difference">
        <div className="overflow-hidden -mb-4 lg:-mb-10 w-full text-center lg:text-left">
          <motion.span
            className="block font-display font-bold uppercase leading-[0.75] tracking-tighter text-text-primary whitespace-nowrap"
            style={{ fontSize: 'clamp(4rem, 16vw, 16rem)' }}
            variants={nameReveal}
            initial="hidden"
            animate="visible"
          >
            SHASHANK
          </motion.span>
        </div>
        <div className="overflow-hidden -mb-4 lg:-mb-10 w-full text-center lg:text-left pl-0 lg:pl-12">
          <motion.span
            className="block font-display font-bold uppercase leading-[0.75] tracking-tighter text-accent whitespace-nowrap"
            style={{ fontSize: 'clamp(4rem, 16vw, 16rem)' }}
            variants={nameReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.05 }}
          >
            SUDHEER
          </motion.span>
        </div>
        <div className="overflow-hidden w-full text-center lg:text-left pl-0 lg:pl-24">
          <motion.span
            className="block font-display font-bold uppercase leading-[0.75] tracking-tighter text-text-primary whitespace-nowrap opacity-60 mix-blend-overlay"
            style={{ fontSize: 'clamp(3rem, 12vw, 12rem)' }}
            variants={nameReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            FULLSTACK
          </motion.span>
        </div>
      </div>

      {/* ── DRAGGABLE TECH STICKERS ── */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <TechSticker
          label="React.js"
          x="15%"
          y="40%"
          rotate={-12}
        />
        <TechSticker
          label="AWS Cloud"
          x="75%"
          y="30%"
          rotate={8}
        />
        <TechSticker
          label="Node.js"
          x="80%"
          y="65%"
          rotate={-6}
        />
        <TechSticker
          label="MongoDB"
          x="20%"
          y="70%"
          rotate={15}
        />
      </div>

      {/* ── FOOTER STRIP (time left, coords center, links right) ── */}
      <div className="absolute bottom-4 left-6 right-6 lg:left-10 lg:right-10 z-10 flex justify-between items-center">
        <motion.span
          className="font-label text-[10px] uppercase tracking-[0.2em] text-text-tertiary"
          {...fadeIn(1)}
        >
          IST {time} · Mysore, IN
        </motion.span>

        <motion.span
          className="hidden lg:inline font-label text-[10px] uppercase tracking-[0.2em] text-text-tertiary tabular-nums"
          {...fadeIn(1)}
        >
          {coords.x} X {coords.y} Y
        </motion.span>

        <motion.div className="flex items-center gap-6" {...fadeIn(1)}>
          <a href="https://github.com/shashankachar19" target="_blank" rel="noreferrer" className="link-brutal">
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com/in/shashank-s-50506b312" target="_blank" rel="noreferrer" className="link-brutal">
            LinkedIn ↗
          </a>
          <a href="mailto:shashankachar1981@gmail.com" className="link-brutal">
            Email ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
