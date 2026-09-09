import { motion } from 'framer-motion';

const timeline = [
  {
    type: 'Internship',
    period: 'Oct 2025',
    title: 'Full Stack Web Developer Intern',
    org: 'Prodigy Infotech',
    points: [
      'Built 4 working Full Stack Projects end-to-end',
      'API testing & RESTful endpoint validation (GET, POST, PUT) via Thunder Client',
      'Version control and code repository management with Git & GitHub',
    ],
  },
  {
    type: 'Hackathon',
    period: '2025',
    title: 'Award of Excellence',
    org: 'Build for Bengaluru — REVA Hackathon',
    points: [
      'Recognised among top tier of 150+ competing teams',
      'Rapid prototyping and deployment of a scalable solution under strict time constraints',
    ],
  },
  {
    type: 'Hackathon',
    period: '2025',
    title: '4th Place — Vision X 2025',
    org: 'MIT Mysore',
    points: [
      'Developed and pitched a functional project iteration at MIT Mysore',
      'Collaborated with team handling both technical implementation and high-level problem solving',
    ],
  },
  {
    type: 'Certificate',
    period: '2024',
    title: 'AWS Cloud Practitioner Essentials',
    org: 'Amazon Web Services',
    points: [
      'Fundamental and foundational understanding of Cloud Computing concepts',
      'Core AWS services, security, architecture, pricing and support',
    ],
  },
  {
    type: 'Certificate',
    period: '2024',
    title: 'Programming in Java',
    org: 'NPTEL — IIT',
    points: [
      'Completed foundational Java programming coursework via the IIT NPTEL platform',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Experience() {
  return (
    <section id="experience" className="w-full py-20 md:py-32 px-6 lg:px-10">
      <motion.p
        className="section-idx mb-12"
        variants={fadeUp} initial="hidden"
        whileInView="visible" viewport={{ once: true, amount: 0.1 }}
      >
        ( 04 — Experience )
      </motion.p>

      <motion.h2
        className="font-display font-bold uppercase text-text-primary mb-14"
        style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', letterSpacing: '-0.03em' }}
        variants={fadeUp} initial="hidden"
        whileInView="visible" viewport={{ once: true }} custom={0.05}
      >
        What I've Done
      </motion.h2>

      {/* Timeline entries */}
      <div className="border-t border-border-hard">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-border-hard group"
            variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true, amount: 0.05 }}
            custom={i * 0.06}
          >
            {/* Left col — meta */}
            <div className="md:col-span-3">
              <span className="inline-block font-label text-[9px] uppercase tracking-[0.3em] text-accent border border-accent px-2 py-1 mb-3">
                {item.type}
              </span>
              <p className="font-label text-[11px] uppercase tracking-[0.2em] text-text-tertiary">
                {item.period}
              </p>
            </div>

            {/* Right col — content */}
            <div className="md:col-span-9">
              <p className="font-display font-bold text-xl md:text-2xl uppercase tracking-tight text-text-primary group-hover:text-accent transition-colors duration-300 mb-1">
                {item.title}
              </p>
              <p className="font-label text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-5">
                {item.org}
              </p>
              <ul className="space-y-2">
                {item.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-accent mt-1 shrink-0">—</span>
                    <span className="font-mono text-xs uppercase tracking-wide leading-[1.8] text-text-secondary">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
