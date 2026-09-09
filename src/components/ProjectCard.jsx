import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Code } from 'lucide-react';

export default function ProjectCard({ title, idx, tags, description, github, live }) {
  const cardRef = useRef(null);

  /* Scroll-linked parallax on the title */
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const titleY = useSpring(rawY, { stiffness: 60, damping: 20 });

  /* Clip reveal line */
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ['0%', '100%']);

  return (
    <motion.article
      ref={cardRef}
      className="w-full py-16 md:py-24 px-6 lg:px-12 border-b border-border group relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hover accent backdrop */}
      <motion.div
        className="absolute inset-0 bg-accent/[0.03] pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Top row */}
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <motion.span
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            IDX: {idx}
          </motion.span>
          <div className="flex items-center gap-6">
            {github && (
              <a
                href={github} target="_blank" rel="noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary hover:text-accent transition-colors duration-300 flex items-center gap-2"
              >
                <Code className="w-3.5 h-3.5" />Source
              </a>
            )}
            {live && (
              <a
                href={live} target="_blank" rel="noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary hover:text-accent transition-colors duration-300 flex items-center gap-2"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />Live
              </a>
            )}
          </div>
        </div>

        {/* Tags */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.7 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/70">
            {tags.join(' • ')}
          </p>
        </motion.div>

        {/* Project title — scroll parallax */}
        <div className="overflow-hidden mb-8 md:mb-12">
          <motion.h3
            style={{ y: titleY }}
            className="font-display text-[12vw] md:text-[8vw] lg:text-[7vw] uppercase tracking-tight leading-[0.85] text-text-primary font-bold group-hover:text-accent transition-colors duration-500 origin-left"
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {title}
          </motion.h3>
        </div>

        {/* Description */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <div className="lg:col-start-1 lg:col-span-8">
            <p className="font-mono text-sm uppercase tracking-wide leading-[1.8] text-[#999999] max-w-2xl">
              {description}
            </p>
          </div>
        </motion.div>

        {/* Accent progress line — scroll linked */}
        <div className="mt-12 md:mt-16 h-px bg-border relative overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 bg-accent" style={{ width: lineWidth }} />
        </div>
      </div>
    </motion.article>
  );
}
