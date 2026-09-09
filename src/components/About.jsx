import { motion } from 'framer-motion';

const capabilities = [
  { label: 'Languages', value: 'Java, Python, JavaScript, C, SQL' },
  { label: 'Frontend', value: 'React.js, HTML5, CSS3' },
  { label: 'Backend', value: 'Node.js, Express.js' },
  { label: 'Cloud', value: 'AWS (Practitioner)' },
  { label: 'Databases', value: 'MongoDB, MySQL' },
  { label: 'Tools', value: 'Git, GitHub, VS Code, Thunder Client' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <section id="about" className="w-full py-20 md:py-32 px-6 lg:px-10">
      {/* Section label */}
      <motion.p
        className="section-idx mb-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        custom={0}
      >
        ( 02 — About )
      </motion.p>

      {/* ── Top: Heading + Bio ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-16 items-start">
        {/* Big heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={0.05}
        >
          <h2
            className="font-display font-bold uppercase text-text-primary leading-[0.88]"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 7rem)',
              letterSpacing: '-0.03em',
            }}
          >
            Building
            <br />
            <span className="text-accent">Real</span> Things
          </h2>

          {/* Education block */}
          <div className="mt-10 border-t border-border-hard pt-6">
            <p className="section-idx mb-3">Education</p>
            <p className="font-mono text-sm uppercase tracking-wider text-text-primary">
              4th Year — B.E. in Information Science
            </p>
            <p className="font-label text-xs uppercase tracking-wider text-text-secondary mt-1">
              Maharaja Institute of Technology Mysore
            </p>
            <p className="font-label text-xs uppercase tracking-wider text-text-tertiary mt-1">
              CGPA: 8.4 // 2021–2025
            </p>
          </div>
        </motion.div>

        {/* Bio text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={0.1}
        >
          <p className="font-mono text-sm uppercase tracking-[0.06em] leading-[2] text-text-secondary">
            I'm a 4th year ISE student at MIT Mysore who loves building
            full-stack applications from the ground up. I've competed in
            hackathons, shipped real projects, and I'm constantly exploring
            cloud computing, backend architecture, and how systems work
            under the hood.
          </p>
          <p className="font-mono text-sm uppercase tracking-[0.06em] leading-[2] text-text-secondary mt-4">
            When I'm not writing code, I'm breaking apart systems to
            understand how they think. Currently exploring AWS infrastructure
            and leveraging AI pair programming for rapid prototyping.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-px mt-10 border border-border-hard">
            {[
              { num: '4+', label: 'Projects Shipped' },
              { num: '2', label: 'Hackathon Wins' },
              { num: '8.4', label: 'CGPA' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-bg-elevated p-5 text-center"
              >
                <p className="font-display text-2xl md:text-3xl font-bold text-accent">
                  {stat.num}
                </p>
                <p className="font-label text-[9px] uppercase tracking-[0.25em] text-text-tertiary mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom: Capabilities ── */}
      <motion.div
        className="border-t border-border-hard pt-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        custom={0.15}
      >
        <h3 className="section-idx mb-8">Capabilities</h3>
        <ul className="space-y-4 max-w-3xl">
          {capabilities.map((cap, i) => (
            <li
              key={i}
              className="flex items-baseline font-mono text-xs uppercase tracking-[0.1em]"
            >
              <span className="text-text-primary whitespace-nowrap w-28 md:w-36 shrink-0">
                {cap.label}
              </span>
              <span className="dot-leader" />
              <span className="text-text-secondary whitespace-nowrap">
                {cap.value}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
