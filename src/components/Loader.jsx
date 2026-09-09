import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('portfolio:loader-played') === '1') {
      setVisible(false);
      onComplete?.();
      return;
    }

    const duration = 2400;
    const steps = 100;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setCount(current);

      if (current >= 100) {
        clearInterval(timer);
        sessionStorage.setItem('portfolio:loader-played', '1');
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary grid-bg"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Top-left corner mark */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10">
            <p className="font-label text-[10px] uppercase tracking-[0.35em] text-text-tertiary">
              Loading Portfolio
            </p>
          </div>

          {/* Counter — massive, fills screen */}
          <motion.div
            className="font-display text-[28vw] md:text-[22vw] font-bold text-text-primary tabular-nums leading-none tracking-tighter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {String(count).padStart(3, '0')}
          </motion.div>

          {/* Progress bar — brutalist hard line */}
          <div className="absolute bottom-20 left-6 right-6 md:left-10 md:right-10">
            <div className="h-[2px] bg-border-hard w-full">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${count}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-8 left-6 right-6 md:left-10 md:right-10 flex justify-between">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
              Shashank S
            </span>
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
              © 2026
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
