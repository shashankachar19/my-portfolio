import { motion } from 'framer-motion';

// Draggable Framer Motion stickers like haoqi.design
export default function TechSticker({ label, iconUrl, x, y, rotate }) {

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileHover={{ scale: 1.1, cursor: 'grab' }}
      whileDrag={{ scale: 1.15, cursor: 'grabbing', zIndex: 50 }}
      className="absolute pointer-events-auto flex items-center justify-center bg-bg-elevated border border-border-hard p-4 shadow-xl z-20 mix-blend-difference"
      style={{
        left: x,
        top: y,
        rotate: rotate,
        borderRadius: '24px', // slight pill shape for tags
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
    >
      {iconUrl && (
        <img
          src={iconUrl}
          alt={label}
          className="w-8 h-8 mr-3 filter invert dark:invert-0 pointer-events-none"
        />
      )}
      <span className="font-mono text-sm uppercase tracking-widest text-text-primary whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </motion.div>
  );
}
