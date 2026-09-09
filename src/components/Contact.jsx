import { motion } from 'framer-motion';

const words = ["LET'S", 'BUILD', 'TOGETHER'];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/shashankachar19' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shashank-s-50506b312' },
  { label: 'Email', href: 'mailto:shashankachar1981@gmail.com' },
  { label: 'Resume', href: '/resume.pdf' },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full min-h-screen flex flex-col justify-between px-6 lg:px-10 py-16 md:py-24 border-t border-border-hard"
    >
      {/* Section label */}
      <motion.p
        className="section-idx mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        ( 06 — Contact )
      </motion.p>

      {/* Massive CTA text */}
      <div className="flex-1 flex flex-col justify-center py-12">
        {words.map((word, i) => (
          <motion.div
            key={word}
            className="overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{
              duration: 0.9,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              className="block font-display uppercase tracking-tight leading-[0.85] font-bold text-text-primary"
              style={{ fontSize: 'clamp(3rem, 14vw, 14rem)' }}
            >
              {word}
              {i === words.length - 1 && (
                <span className="text-accent">.</span>
              )}
            </span>
          </motion.div>
        ))}

        {/* Subtitle */}
        <motion.p
          className="font-mono text-sm uppercase tracking-[0.1em] text-text-secondary mt-8 max-w-lg leading-[1.8]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Whether it's an internship opportunity, a hackathon team, or a
          collaboration on a full-stack project — I'm always ready to build.
        </motion.p>

        {/* Email — prominent */}
        <motion.a
          href="mailto:shashankachar1981@gmail.com"
          className="mt-10 inline-block font-display text-xl md:text-2xl uppercase tracking-[0.05em] text-accent hover:text-text-primary transition-colors duration-300 border-b-2 border-accent pb-1 w-fit"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          shashankachar1981@gmail.com
        </motion.a>
      </div>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-8 border-t border-border-hard">
        {/* Social links */}
        <div className="flex flex-wrap gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="link-brutal"
            >
              {link.label} ↗
            </a>
          ))}
        </div>

        {/* Right side info */}
        <div className="font-label text-[10px] uppercase tracking-[0.25em] text-text-tertiary text-right">
          <p>© 2026 — Shashank S</p>
          <p className="mt-1">+91 90198 48049</p>
          <p className="mt-1">Built with React + Vite</p>
        </div>
      </footer>
    </section>
  );
}
