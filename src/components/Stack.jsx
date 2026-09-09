import { motion } from 'framer-motion';

const stack = [
  {
    category: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'C', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frameworks',
    items: ['React.js', 'Node.js', 'Express.js'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'MySQL'],
  },
  {
    category: 'Cloud & Tools',
    items: ['AWS', 'Git', 'GitHub', 'VS Code', 'Thunder Client', 'Ubuntu', 'Vite'],
  },
  {
    category: 'Exploring',
    items: ['Docker', 'Three.js', 'Cybersecurity', 'REST APIs', 'Gemini API'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Stack() {
  return (
    <section id="stack" className="w-full py-20 md:py-32 px-6 lg:px-10 border-t border-border-hard">
      <motion.p
        className="section-idx mb-12"
        variants={fadeUp} initial="hidden"
        whileInView="visible" viewport={{ once: true, amount: 0.1 }}
      >
        ( 05 — Stack )
      </motion.p>

      <motion.h2
        className="font-display font-bold uppercase text-text-primary mb-14"
        style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', letterSpacing: '-0.03em' }}
        variants={fadeUp} initial="hidden"
        whileInView="visible" viewport={{ once: true }} custom={0.05}
      >
        Tech I Use
      </motion.h2>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-hard border border-border-hard">
        {stack.map((cat, i) => (
          <motion.div
            key={cat.category}
            className="bg-bg-primary p-6 md:p-8 group hover:bg-bg-elevated transition-colors duration-300"
            variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true, amount: 0.05 }}
            custom={i * 0.07}
          >
            <h3 className="font-label text-[10px] uppercase tracking-[0.3em] text-accent mb-5 border-b border-border-hard pb-3">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs uppercase tracking-[0.1em] text-text-secondary border border-border-hard px-3 py-1.5 group-hover:border-border-accent transition-colors duration-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
