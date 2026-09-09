import { motion } from 'framer-motion';

const capabilities = [
  { label: 'Backend',  value: 'Java, Python, Node.js' },
  { label: 'Cloud',    value: 'AWS Infrastructure' },
  { label: 'Database', value: 'MySQL, MongoDB' },
  { label: 'Security', value: 'Zero-Trust Models' },
  { label: 'Frontend', value: 'React, Three.js' },
  { label: 'Tools',    value: 'Docker, Git, Linux' },
];

const experiences = [
  { type: 'Hackathon',  year: '2025',     title: 'Award of Excellence',   org: 'Build for Bengaluru — REVA' },
  { type: 'Hackathon',  year: '2025',     title: '4th Place — Vision X',  org: 'MIT Mysore' },
  { type: 'Internship', year: 'Oct 2025', title: 'Full Stack Intern',      org: 'Prodigy Infotech' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Profile() {
  return (
    <section id="profile" className="w-full py-24 md:py-32 px-6 lg:px-10">

      {/* ── Section label ── */}
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary mb-10"
        variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} custom={0}
      >
        ( 02 — Profile )
      </motion.p>

      {/* ── Top row: big heading LEFT + bio RIGHT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 items-start">

        {/* Heading — constrained to left column */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} custom={0.05}
        >
          <h2
            className="font-display font-black uppercase text-text-primary leading-[0.88]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)', letterSpacing: '-0.03em' }}
          >
            Engineering<br />Intelligence
          </h2>

          {/* Education — below heading in same column */}
          <div className="mt-10 border-t border-border pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary mb-3">
              Education
            </p>
            <p className="font-mono text-sm uppercase tracking-wider text-text-primary">
              4th Year — B.E. in ISE
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-text-secondary mt-1">
              MIT Mysore // CGPA: 8.48 // 2023–2027
            </p>
          </div>
        </motion.div>

        {/* Bio — right column */}
        <motion.p
          className="font-mono text-sm uppercase tracking-[0.08em] leading-[2] text-text-secondary"
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} custom={0.1}
        >
          I build things that scale. Third-year ISE student at MIT Mysore
          obsessed with backend architecture, cloud systems, and the
          infrastructure nobody sees but everyone relies on. When I'm not
          writing code, I'm breaking apart systems to understand how they think.
        </motion.p>
      </div>

      {/* ── Bottom row: capabilities LEFT + honors RIGHT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 border-t border-border pt-12">

        {/* Capabilities */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} custom={0.15}
        >
          <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary mb-8">
            Capabilities
          </h3>
          <ul className="space-y-5">
            {capabilities.map((cap, i) => (
              <li key={i} className="flex items-baseline font-mono text-xs uppercase tracking-[0.12em]">
                <span className="text-text-primary whitespace-nowrap w-28 shrink-0">{cap.label}</span>
                <span className="flex-1 border-b border-dotted border-border-accent mx-4 mb-1" />
                <span className="text-text-secondary whitespace-nowrap">{cap.value}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Honors & Experience */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} custom={0.2}
        >
          <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary mb-8">
            Honors &amp; Experience
          </h3>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className="border-l-2 border-accent/40 pl-5 py-0.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-tertiary mb-1.5">
                  {exp.type} / {exp.year}
                </p>
                <p className="font-mono text-sm uppercase tracking-wider text-text-primary">
                  {exp.title}
                </p>
                <p className="font-mono text-xs uppercase tracking-wider text-text-secondary mt-0.5">
                  {exp.org}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
