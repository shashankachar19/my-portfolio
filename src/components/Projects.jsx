import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const projects = [
  {
    idx: '001',
    title: 'Amazon Clone',
    tags: ['MERN Stack', 'Auth', 'Test Suite', 'Modern UI'],
    description:
      'A full-featured clone of Amazon showcasing a modern UI, robust authentication, and comprehensive test suite.',
    github: 'https://github.com/shashankachar19/Amazon-replica',
    live: null,
  },
  {
    idx: '002',
    title: 'SkillSwap',
    tags: ['MERN Platform', 'Real-time Video', 'Chat'],
    description:
      'A platform built on the MERN stack facilitating real-time video and chat for users to exchange skills dynamically.',
    github: 'https://github.com/shashankachar19/SkillSwap',
    live: null,
  },
  {
    idx: '003',
    title: 'Pacha Cover',
    tags: ['Python', 'Node.js', 'AI', 'Satellite Data'],
    description:
      "Uses satellite data, AI, and citizen science to identify urban heat islands across Bengaluru's 198 BBMP wards. Mobilises residents to restore the city's tree canopy.",
    github: 'https://github.com/shashankachar19',
    live: null,
  },
];

function ProjectCard({ title, idx, tags, description, github, live }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const titleY = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <motion.article
      ref={cardRef}
      className="w-full py-14 md:py-20 px-6 lg:px-10 border-b border-border-hard group relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hover accent strip — left edge */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        style={{ originY: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex justify-between items-center mb-8">
          <span className="section-idx">IDX: {idx}</span>
          <div className="flex items-center gap-6">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="link-brutal">
                Source ↗
              </a>
            )}
            {live && (
              <a href={live} target="_blank" rel="noreferrer" className="link-brutal">
                Live ↗
              </a>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((t) => (
            <span key={t} className="tag-chip">{t}</span>
          ))}
        </div>

        {/* Title — scroll parallax */}
        <div className="overflow-hidden mb-8">
          <motion.h3
            style={{
              y: titleY,
              fontSize: 'clamp(2.5rem, 8vw, 8rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.88,
            }}
            className="font-display font-bold uppercase text-text-primary group-hover:text-accent transition-colors duration-500"
          >
            {title}
          </motion.h3>
        </div>

        {/* Description */}
        <p className="font-mono text-sm uppercase tracking-wide leading-[1.9] text-text-secondary max-w-2xl">
          {description}
        </p>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="w-full">
      <div className="px-6 lg:px-10 pt-20 pb-10">
        <motion.p
          className="section-idx mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ( 03 — Selected Work )
        </motion.p>
        <motion.h2
          className="font-display font-bold uppercase text-text-primary"
          style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', letterSpacing: '-0.03em' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          What I've Built
        </motion.h2>
      </div>

      <div className="border-t border-border-hard">
        {projects.filter(p => p.title).map((p) => (
          <ProjectCard key={p.idx} {...p} />
        ))}
      </div>
    </section>
  );
}
